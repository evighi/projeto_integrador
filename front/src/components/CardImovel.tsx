"use client";
import { ImovelItf } from "@/utils/types/ImovelItf";
import { useState } from "react";
import AgendarVisitaModal from "./AgendarVisitaModal";
import { useClienteStore } from "@/context/ClienteContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CardImovel({ data }: { data: ImovelItf }) {
  const [modalAberto, setModalAberto] = useState(false);
  const { cliente } = useClienteStore();          // ← estado global
  const router = useRouter();

  const primeiraImagem = data.imagens?.[0]?.url || "/sem-imagem.png";

  /** Clique no botão */
  function handleAgendar() {
    if (!cliente) {
      toast.info("Faça login ou cadastro para agendar uma visita.");
      router.push("/login");                      // ou "/cadastro"
      return;
    }
    setModalAberto(true);                         // usuário logado → abre modal
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg w-full h-60 object-cover"
        src={primeiraImagem}
        alt="Imagem do imóvel"
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.titulo}
        </h5>

        <p className="mb-3 font-extrabold text-gray-700 dark:text-gray-400">
          Preço do aluguel R$:{" "}
          {Number(data.valorAluguel).toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })}
        </p>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.descricao}
        </p>

        <button
          onClick={handleAgendar}                  // ← usa a função
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
        >
          Agendar Visita
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>

      {modalAberto && (
        <AgendarVisitaModal imovel={data} onClose={() => setModalAberto(false)} />
      )}
    </div>
  );
}
