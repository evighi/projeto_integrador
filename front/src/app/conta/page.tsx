// src/app/conta/page.tsx
"use client";
import { useClienteStore } from "@/context/ClienteContext";

export default function MinhaConta() {
  const { cliente } = useClienteStore();

  if (!cliente) {
    return (
      <p className="p-8 text-center">
        Você precisa estar logado. <a href="/login" className="text-blue-600 underline">Entrar</a>
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Minha conta</h1>

      <section className="bg-white rounded shadow p-4 dark:bg-gray-800 dark:text-white">
        <h2 className="font-semibold mb-2">Dados do cliente</h2>
        <p><strong>Nome:</strong> {cliente.nome}</p>
        <p><strong>E-mail:</strong> {cliente.email}</p>
      </section>
    </div>
  );
}
