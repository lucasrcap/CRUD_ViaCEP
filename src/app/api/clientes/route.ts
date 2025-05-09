import { NextRequest, NextResponse } from 'next/server';
import { Cliente } from '../../models/Cliente';
import fs from 'fs';
import path from 'path';

const CLIENTES_FILE_PATH = path.resolve('clientes.json');

const getClientesFromFile = (): Cliente[] => {
  if (fs.existsSync(CLIENTES_FILE_PATH)) {
    const fileData = fs.readFileSync(CLIENTES_FILE_PATH, 'utf-8');
    return JSON.parse(fileData);
  }
  return [];
};

const saveClientesToFile = (clientes: Cliente[]) => {
  fs.writeFileSync(CLIENTES_FILE_PATH, JSON.stringify(clientes, null, 2), 'utf-8');
};

export async function GET() {
  const clientes = getClientesFromFile();
  return NextResponse.json(clientes);
}

export async function POST(req: NextRequest) {
  const newCliente: Cliente = await req.json();
  const clientes = getClientesFromFile();

  const novoId = clientes.length === 0 ? 1 : Math.max(...clientes.map((c) => c.id)) + 1;
  newCliente.id = novoId;

  clientes.push(newCliente);
  saveClientesToFile(clientes);

  return NextResponse.json(newCliente, { status: 201 });
}
