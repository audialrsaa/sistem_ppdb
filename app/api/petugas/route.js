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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) { // buat tambah petugas
  try {
    const { nama, email, password, no_telp } = await req.json();

    if (!nama || !email || !password || !no_telp) { //validasi field
      return NextResponse.json(
        { error: "Nama, email, password dan no telp wajib diisi" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10); //hash pass seblm disimpan ke db

    const conn = await connection();
    await conn.execute(
      "INSERT INTO petugas (nama, email, password, no_telp, role) VALUES (?, ?, ?, ?, 'petugas')",
      [nama, email, hashed, no_telp]
    ); //jalanin query buat insert data

    return NextResponse.json({ message: "Petugas berhasil ditambahkan!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
