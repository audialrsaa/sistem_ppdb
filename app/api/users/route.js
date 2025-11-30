import { NextResponse } from "next/server";
import connection from "@/app/lib/db";

export async function GET() {
  try {
    const conn = await connection();
    const [rows] = await conn.execute(`
      SELECT 
        id, 
        nama, 
        email, 
        nisn,
        jenis_kelamin,
        asal_sekolah
      FROM users
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    return NextResponse.json({ error: "Gagal mengambil data users" }, { status: 500 });
  }
}
