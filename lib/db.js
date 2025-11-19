import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "FAZRIL081108",
    database: "db_perpustakaan",
    waitForConnections: true,
    connectionLimit: 10,
  })
  ;

  