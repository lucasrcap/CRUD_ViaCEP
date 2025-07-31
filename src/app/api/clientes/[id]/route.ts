import { NextRequest, NextResponse } from 'next/server';
import { Cliente } from '../../../models/Cliente';
import fs from 'fs';
import path from 'path';

const CLIENTES_FILE_PATH = path.resolve('clientes.json');

// Função para ler os clientes do arquivo JSON
const getClientesFromFile = (): Cliente[] => {
  if (fs.existsSync(CLIENTES_FILE_PATH)) {
    const fileData = fs.readFileSync(CLIENTES_FILE_PATH, 'utf-8');
    return JSON.parse(fileData);
  }
  return [];
};

// Função para salvar os clientes no arquivo JSON
const saveClientesToFile = (clientes: Cliente[]) => {
  fs.writeFileSync(CLIENTES_FILE_PATH, JSON.stringify(clientes, null, 2), 'utf-8');
};

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id); // Captura o ID a partir da URL
  console.log('Tentando excluir cliente com ID:', id);

  const clientes = getClientesFromFile();
  const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);

  if (clienteIndex === -1) {
    return NextResponse.json(
      { message: 'Cliente não encontrado' },
      { status: 404 }
    );
  }

  // Exclui o cliente
  clientes.splice(clienteIndex, 1);
  saveClientesToFile(clientes); // Salva os clientes atualizados

  return NextResponse.json({ message: 'Cliente excluído com sucesso' });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const updatedCliente: Cliente = await req.json();

  const clientes = getClientesFromFile();
  const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);

  if (clienteIndex === -1) {
    return NextResponse.json({ message: 'Cliente não encontrado' }, { status: 404 });
  }

  // Substitui os dados do cliente
  clientes[clienteIndex] = { ...updatedCliente, id };
  saveClientesToFile(clientes);

  return NextResponse.json({ message: 'Cliente atualizado com sucesso', cliente: clientes[clienteIndex] });
}
