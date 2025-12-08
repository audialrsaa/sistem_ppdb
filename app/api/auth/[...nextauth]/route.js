import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connection from "@/app/lib/db";

async function getUserByEmail(email) {
  const conn = await connection();

  const [user] = await conn.query(
    `SELECT id AS id, nama, email, password, role FROM users WHERE email = ?`,
    [email]
  ); //cari user di table users by email 
  if (user.length) {
    await conn.end();
    return user[0];
  } // kalau ketemu koneksi database ditutup terus return sesuai data yg ada

  // kalau gaada, cek di table petugas
  const [staff] = await conn.query(
    `SELECT id_petugas AS id, nama, email, password, role FROM petugas WHERE email = ?`,
    [email]
  );
  if (staff.length) {
    await conn.end();
    return staff[0];
  } // kalau ketemu return data petugasnya

  await conn.end();
  return null; //kalau g ktmu tutup koneksi dan return null
}


export const authOptions = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  }, // session disimpen ke jwt

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      }, //field di form login

      async authorize(credentials) {
        const { email, password } = credentials; // ambil email password yg dikirim login page

        if (!email || !password) return null; // kalau ada yg kosong gagal login

        const user = await getUserByEmail(email);
        if (!user) return null; //→ klau g ada user/email g terdaftar gagal login

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.nama,
          role: user.role, // admin | petugas | calon_siswa
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
