import mysql from "mysql2/promise";

export default async function connection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "db_ppdb",
  });
}
