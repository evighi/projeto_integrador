"use client";
import { useEffect, useState } from "react";
import { ImovelItf } from "@/utils/types/ImovelItf";

const [imoveis, setImoveis] = useState<ImovelItf[]>([]);


export default function ListaImoveis() {
  const [imoveis, setImoveis] = useState<ImovelItf[]>([]);
  const [valorMaximo, setValorMaximo] = useState("");

  const buscarImoveis = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/imoveis/preco?max=${valorMaximo}`
      );
      const data = await response.json();
      setImoveis(data);
    } catch (error) {
      console.error("Erro ao buscar imóveis", error);
    }
  };

  useEffect(() => {
    if (valorMaximo) buscarImoveis();
  }, [valorMaximo]);

  return (
    <section className="p-6">
      <h1 className="text-xl font-bold mb-4">Filtrar por valor de aluguel</h1>

      <input
        type="number"
        placeholder="Digite o valor máximo"
        className="p-2 border rounded mb-4"
        value={valorMaximo}
        onChange={(e) => setValorMaximo(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imoveis.map((imovel) => (
          <div key={imovel.id} className="border rounded p-4 shadow">
            <h2 className="text-lg font-semibold">{imovel.titulo}</h2>
            <p>{imovel.descricao}</p>
            <p className="font-bold text-green-700">
              Aluguel: R$ {Number(imovel.valorAluguel).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
