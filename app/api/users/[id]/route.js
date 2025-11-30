import { NextResponse } from "next/server";
import connection from "@/app/lib/db";

export async function DELETE(req, context) {
  try {
    const params = await context.params; // FIX PALING PENTING
    const { id } = params;

    const conn = await connection();
    await conn.execute("DELETE FROM users WHERE id = ?", [id]);

    return NextResponse.json({ message: "User berhasil dihapus!" });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    return NextResponse.json({ error: "Gagal menghapus user" }, { status: 500 });
  }
}
