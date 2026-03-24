import { mysqlTable, int, varchar, decimal, timestamp } from "drizzle-orm/mysql-core";

export const produtos = mysqlTable("produtos", {
  id: int("id").primaryKey().autoincrement(), 
  nome: varchar("nome", { length: 255 }).notNull(),
  preco: decimal("preco", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});