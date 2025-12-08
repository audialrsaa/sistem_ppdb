import { NextResponse } from "next/server";
import connection from "@/app/lib/db";

export async function GET(req, context) {
  try {
    const { id } = await context.params;

    const conn = await connection();

    const [rows] = await conn.execute(
      `SELECT
        users.id,
        users.nama,
        users.email,
        users.nisn,
        users.jenis_kelamin,
        users.asal_sekolah,
        ppdb.status_verifikasi
      FROM users
      LEFT JOIN ppdb ON users.id = ppdb.user_id
      WHERE users.id = ?
      LIMIT 1`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("GET USER ERROR:", error);
    return NextResponse.json({ error: "Gagal mengambil data user" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    const conn = await connection();

    // hapus data di tabel ppdb dulu
    await conn.execute("DELETE FROM ppdb WHERE user_id = ?", [id]);

    // baru hapus user
    await conn.execute("DELETE FROM users WHERE id = ?", [id]);

    return NextResponse.json({ message: "User berhasil dihapus!" });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    return NextResponse.json(
      { error: "Gagal menghapus user" },
      { status: 500 }
    );
  }
}
