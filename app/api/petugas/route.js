import { NextResponse } from "next/server";
import connection from "@/app/lib/db";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const conn = await connection();
    const [rows] = await conn.execute(
      "SELECT id_petugas, nama, email, no_telp, role FROM petugas WHERE role = 'petugas'"
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET PETUGAS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { nama, email, password, no_telp } = await req.json();

    if (!nama || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const conn = await connection();
    await conn.execute(
      "INSERT INTO petugas (nama, email, password, no_telp, role) VALUES (?, ?, ?, ?, 'petugas')",
      [nama, email, hashed, no_telp]
    );

    return NextResponse.json({ message: "Petugas berhasil ditambahkan!" });
  } catch (error) {
    console.error("POST PETUGAS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
