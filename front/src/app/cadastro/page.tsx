"use client"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Inputs = {
  nome: string
  email: string
  numeroTelefone: string
  senha: string
}

export default function Cadastro() {
  const { register, handleSubmit } = useForm<Inputs>()
  const router = useRouter()

  async function cadastraCliente(data: Inputs) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.status === 201) {
      toast.success("Cadastro realizado! Faça login.")
      router.push("/login")
    } else {
      const erro = await res.json()
      toast.error(erro?.erro ?? "Erro ao cadastrar")
    }
  }

  return (
    <section style={{ backgroundColor: "rgba(36, 36, 40, 1)" }} className="min-h-screen flex items-center justify-center">
      <div className="w-full rounded-lg sm:max-w-md p-8">
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            <img src="/goodticket.png" alt="Logo" className="h-10" />
          </div>
          <h1 style={{ color: "rgba(20, 200, 113, 1)" }} className="text-xl font-bold">
            Crie sua conta!
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(cadastraCliente)}>
            {/* Nome */}
            <div>
              <label htmlFor="nome" style={{ color: "rgba(20, 200, 113, 1)" }} className="block mb-1 text-sm">Nome completo</label>
              <input id="nome"
                className="border border-gray-700 text-white rounded-lg block w-full p-2.5 placeholder-gray-300"
                style={{ backgroundColor: "rgba(20, 200, 113, 0.1)" }}
                placeholder="Digite seu nome"
                {...register("nome")} required />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" style={{ color: "rgba(20, 200, 113, 1)" }} className="block mb-1 text-sm">E-mail</label>
              <input type="email" id="email"
                className="border border-gray-700 text-white rounded-lg block w-full p-2.5 placeholder-gray-300"
                style={{ backgroundColor: "rgba(20, 200, 113, 0.1)" }}
                placeholder="Digite seu e-mail"
                {...register("email")} required />
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="numeroTelefone" style={{ color: "rgba(20, 200, 113, 1)" }} className="block mb-1 text-sm">Telefone</label>
              <input id="numeroTelefone"
                className="border border-gray-700 text-white rounded-lg block w-full p-2.5 placeholder-gray-300"
                style={{ backgroundColor: "rgba(20, 200, 113, 0.1)" }}
                placeholder="Digite seu telefone"
                {...register("numeroTelefone")} required />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" style={{ color: "rgba(20, 200, 113, 1)" }} className="block mb-1 text-sm">Senha</label>
              <input type="password" id="senha"
                className="border border-gray-700 text-white rounded-lg block w-full p-2.5 placeholder-gray-300"
                style={{ backgroundColor: "rgba(20, 200, 113, 0.1)" }}
                placeholder="Crie uma senha"
                {...register("senha")} required />
            </div>

            {/* Botão */}
            <button type="submit"
              style={{ backgroundColor: "rgba(20, 200, 113, 1)" }}
              className="w-full text-white rounded-full py-2 hover:brightness-110 transition">
              Cadastrar
            </button>

            {/* Link para login */}
            <p className="text-sm text-center text-gray-400">
              Já tem uma conta?{" "}
              <Link href="/login" style={{ color: "rgba(20, 200, 113, 1)" }} className="hover:underline">Faça login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
