// src/app/api/clientes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Cliente } from '../../models/Cliente';

let clientes: Cliente[] = [
  
];

export async function GET() {
  return NextResponse.json(clientes);
}

export async function POST(req: NextRequest) {
  const newCliente: Cliente = await req.json();
  const { cep } = newCliente.endereco;

  if (!cep || cep.length !== 9) {
    return NextResponse.json(
      { message: 'CEP inválido' },
      { status: 400 }
    );
  }

  try {

    newCliente.id = clientes.length ? Math.max(...clientes.map((c) => c.id)) + 1 : 1;

    clientes.push(newCliente);

    return NextResponse.json(newCliente, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Erro ao buscar o endereço', error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 400 }
    );
  }
}
