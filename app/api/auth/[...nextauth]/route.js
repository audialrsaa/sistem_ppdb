import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connection from "@/app/lib/db";

// ===============================
// GET USER BY EMAIL (FINAL FIXED)
// ===============================
async function getUserByEmail(email) {
  const conn = await connection();

  const [rows] = await conn.query(
    `
      SELECT 
        id AS id,
        nama,
        email,
        password,
        role
      FROM users 
      WHERE email = ?

      UNION

      SELECT 
        id_petugas AS id,
        nama,
        email,
        password,
        role
      FROM petugas
      WHERE email = ?
    `,
    [email, email]
  );

  await conn.end();
  return rows.length ? rows[0] : null;
}

// ==========================
//        NEXTAUTH CONFIG
// ==========================
export const authOptions = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) return null;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        // RETURN DATA YANG DIKELOLA DI SESSION
        return {
          id: user.id,
          email: user.email,
          name: user.nama,
          role: user.role, // admin | petugas | calon_siswa
        };
      },
    }),
  ],

  // ======================================
  // JWT CALLBACK → simpan role ke token
  // ======================================
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

    // ======================================
    // SESSION CALLBACK → token → session
    // ======================================
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
