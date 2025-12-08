  import { writeFile, mkdir } from "fs/promises"; // buat bikin dn simpen folder
  import { existsSync } from "fs"; // cek folder ada atau ga
  import path from "path"; // bentuk path folder
  import connection from "@/app/lib/db";
  import { NextResponse } from "next/server";
  import { getServerSession } from "next-auth";
  import { authOptions } from "@/app/api/auth/[...nextauth]/route";

  export async function POST(req) {
    try {
      const formData = await req.formData(); // ambil form data 

      //ambil seluruh field teks
      const nama_lengkap = formData.get("nama_lengkap");
      const nisn = formData.get("nisn");
      const tanggal_lahir = formData.get("tanggal_lahir");
      const jurusan_id = formData.get("jurusan_id");

      // cek dh login lom
      const session = await getServerSession(authOptions);
      if (!session || !session.user) {
        return NextResponse.json(
          { message: "Harus login dulu" },
          { status: 401 }
        );
      }

      const user_id = session.user.id; // tentuin user id berdasarkan session
      const gelombang = 1; // buat gelombang 

      // folder upload
      const uploadDir = path.join(process.cwd(), "public/uploads"); // file yang di up bakal ditaro sini
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true }); // klw blm ada otomatis bikin forlder baru 
      }

      async function saveFile(name) {
        const file = formData.get(name); // ambil file berdasarkan nama field nya 
        if (!file) return null; // klw gd null

        const bytes = await file.arrayBuffer(); // ubah file jd data mentah
        const buffer = Buffer.from(bytes); // ubah ke buffer biar bs disimpien di file system

        const filename = Date.now() + "-" + file.name; // bikin nama file unik pake timestamp sm nama file
        const filePath = path.join(uploadDir, filename); //nentuin lokasi nyimpen fileny

        await writeFile(filePath, buffer); // simpen ke server

        return "/uploads/" + filename; // return url yg disimpen
      }

      // Save semua file upload
      const ijazah = await saveFile("ijazah");
      const akta = await saveFile("akta");
      const kk = await saveFile("kk");
      const foto = await saveFile("foto");
      const rapor = await saveFile("rapor");
      const skl = await saveFile("skl");
      const bukti_pembayaran = await saveFile("bukti_pembayaran");

      const status_verifikasi = "pending"; //status awal pendaftar pending 
      const conn = await connection();

      // Generate ID pendaftar
      const [countRows] = await conn.execute("SELECT COUNT(*) AS total FROM ppdb"); //itung total pendaftar buat ambl nomor urut baru
      const idPendaftar = String(countRows[0].total + 1).padStart(3, "0"); //ubah nomor urut jd format 3 digit 

      const year = new Date().getFullYear(); //ambil tahun sekarang
      const short1 = String(year).slice(2); //ambil 2 digit belakang tahun 
      const short2 = String(year + 1).slice(2); //ambil 2 digit belakang tahun depan
      const tahunAjaran = short1 + short2; //format tahun ajaran figabung
      const nomor_pendaftaran = `PPD-${tahunAjaran}-${idPendaftar}`; //bentuk nomor pendaftaran final, contoh: PPD-2425-001

      await conn.execute(
        `INSERT INTO ppdb 
        (nomor_pendaftaran, nama_lengkap, nisn, tanggal_lahir, jurusan_id, user_id,
        ijazah, akta, kk, foto, rapor, skl, bukti_pembayaran,
        status_verifikasi, tanggal_upload)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          nomor_pendaftaran,
          nama_lengkap,
          nisn,
          tanggal_lahir,
          jurusan_id,
          user_id,
          ijazah,
          akta,
          kk,
          foto,
          rapor,
          skl,
          bukti_pembayaran,
          status_verifikasi,
        ]
      );

      await conn.end();

      return NextResponse.json({
        status: true,
        message: "Pendaftaran berhasil!",
        nomor_pendaftaran,
        status_verifikasi,
      });

    } catch (err) {
      console.error("ERROR PPDB:", err);  
      return NextResponse.json(
        { message: "Gagal mendaftar", error: err.message },
        { status: 500 }
      );
    }
  }


  export async function GET() {
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user) {
        return NextResponse.json(
          { message: "Harus login dulu" },
          { status: 401 }
        );
      }

      const user_id = session.user.id;

      const conn = await connection();
      const [rows] = await conn.execute(
        `SELECT 
          nomor_pendaftaran,
          nama_lengkap,
          nisn,
          tanggal_lahir,
          jurusan_id,
          ijazah,
          akta,
          kk,
          foto,
          rapor,
          skl,
          bukti_pembayaran,
          status_verifikasi,
          tanggal_upload
        FROM ppdb
        WHERE user_id = ?`,
        [user_id]
      );

      await conn.end();

      if (!rows.length) {
        return NextResponse.json(null, { status: 200 });
      }

      return NextResponse.json(rows[0]);

    } catch (error) {
      console.error("GET PPDB ERROR:", error);
      return NextResponse.json(
        {
          status: false,
          message: "Gagal mengambil data",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }
