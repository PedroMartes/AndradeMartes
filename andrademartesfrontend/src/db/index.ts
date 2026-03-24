import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// Criamos um pool de conexões (mais eficiente para o Next.js)
const connection = mysql.createPool(process.env.DATABASE_URL!);

export const db = drizzle(connection);