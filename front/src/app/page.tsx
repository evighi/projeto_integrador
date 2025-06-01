"use client";
import { CardImovel } from "@/components/CardImovel";
import { InputPesquisa } from "@/components/InputPesquisa";
import { ImovelItf } from "@/utils/types/ImovelItf";
import { useEffect, useState } from "react";

export default function Home() {
  const [imoveis, setImoveis] = useState<ImovelItf[]>([])

  // useEffect (efeito colateral): executa algo quando o componente
  // é renderizado (no caso, quando [])
  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/imoveis`)
      const dados = await response.json()
      // console.log(dados)
      setImoveis(dados)
    }
    buscaDados()
  }, [])

  const listaImoveis = imoveis.map(imovel => (
    <CardImovel data={imovel} key={imovel.id} />
  ))

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <img
          src="/banner.png"
          alt="Banner promocional"
          className="w-full max-h-96 object-cover"
        />
      </div>
      <InputPesquisa setImoveis={setImoveis} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Imoveis <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600"></span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaImoveis}
        </div>
      </div>
    </>
  );
}
