import { NextResponse } from 'next/server';
import { db } from '../../../db'; 
import { produtos } from '../../../db/schema';

// GET: Lista todos os produtos do MySQL
export async function GET() {
  try {
    // Select * From produtos
    const listaProdutos = await db.select().from(produtos);
    
    return NextResponse.json(listaProdutos);
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json({ error: 'Falha ao buscar produtos' }, { status: 500 });
  }
}

// POST: Cria um novo produto no CRM
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação simples (podemos melhorar com Zod depois)
    if (!body.nome || !body.preco) {
      return NextResponse.json({ error: 'Nome e preço são obrigatórios' }, { status: 400 });
    }

    // Insert Into produtos ...
    await db.insert(produtos).values({
      nome: body.nome,
      preco: body.preco.toString(), // MySQL Decimal prefere string para evitar erro de precisão
    });

    return NextResponse.json({ message: 'Produto cadastrado com sucesso!' }, { status: 201 });
  } catch (error) {
    console.error("Erro no POST:", error);
    return NextResponse.json({ error: 'Erro ao salvar o produto' }, { status: 500 });
  }
}