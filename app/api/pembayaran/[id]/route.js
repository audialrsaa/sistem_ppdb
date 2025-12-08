import connection from "@/app/lib/db";

export async function PUT(req, context) {
  try {
    const { id } = await context.params; //ambil param id dari url
    const { status_verifikasi } = await req.json(); //ambil req json dri fe 

    const allowed = ["pending", "verifikasi", "tolak"]; //status yg diizinin  
    if (!allowed.includes(status_verifikasi)) { // kalau yg dikirim bkn slh stu dri tadi lgsg tolak
      return Response.json({ message: "Status tidak valid!" }, { status: 400 });
    }

    const conn = await connection();
    await conn.execute(
      `UPDATE ppdb SET status_verifikasi = ? WHERE id = ?`,
      [status_verifikasi, id]
    );

    return Response.json({ message: "Status berhasil diupdate" }); //kalau berhasil tampilin pesan
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return Response.json({ error: "Gagal update" }, { status: 500 }); // kalau gagal sm
  }
}
