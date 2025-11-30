import { NextResponse } from "next/server";
import connection from "@/app/lib/db";

export async function DELETE(req, context) {
  try {
    // FIX TERPENTING
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "ID petugas tidak ditemukan" },
        { status: 400 }
      );
    }

    const conn = await connection();
    await conn.execute("DELETE FROM petugas WHERE id_petugas = ?", [id]);

    return NextResponse.json({ message: "Petugas berhasil dihapus!" });
  } catch (error) {
    console.error("DELETE PETUGAS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
