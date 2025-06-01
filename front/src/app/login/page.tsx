"use client"
import Link from "next/link";
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useClienteStore } from "@/context/ClienteContext"
import { useRouter } from "next/navigation"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()
    const { logaCliente } = useClienteStore()
    const router = useRouter()

    async function verificaLogin(data: Inputs) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ email: data.email, senha: data.senha })
        })

        if (response.status == 200) {
            const dados = await response.json()
            logaCliente(dados);

            if (data.manter) {
                localStorage.setItem("clienteKey", dados.id);
                localStorage.setItem("token", dados.token);
            } else {
                localStorage.removeItem("clienteKey");
                localStorage.removeItem("token");
            }

            router.push("/")
        } else {
            toast.error("Erro... Login ou senha incorretos")
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
                        Realize seu login!
                    </h1>
                    <form className="space-y-4" onSubmit={handleSubmit(verificaLogin)}>
                        <div>
                            <label htmlFor="email" style={{ color: "rgba(20, 200, 113, 1)" }} className="block mb-1 text-sm">Digite seu email</label>
                            <input type="email" id="email"
                                className="border border-gray-700 text-white rounded-lg block w-full p-2.5 placeholder-gray-300"
                                style={{
                                    backgroundColor: "rgba(20, 200, 113, 0.1)",
                                }}
                                placeholder="Digite seu email"
                                {...register("email")} required />
                        </div>
                        <div>
                            <label htmlFor="password" style={{ color: "rgba(20, 200, 113, 1)" }} className="block mb-1 text-sm">Senha</label>
                            <input type="password" id="password"
                                className="border border-gray-700 text-white rounded-lg block w-full p-2.5 placeholder-gray-300"
                                style={{
                                    backgroundColor: "rgba(20, 200, 113, 0.1)",
                                }}
                                placeholder="Digite sua senha"
                                {...register("senha")} required />
                        </div>
                        <div className="flex justify-between text-sm">
                            <label className="text-gray-400 flex items-center gap-2">
                                <input type="checkbox" {...register("manter")}
                                    style={{ accentColor: "rgba(20, 200, 113, 1)" }} />
                                Manter conectado
                            </label>
                            <a href="#" style={{ color: "rgba(20, 200, 113, 1)" }} className="hover:underline">Esqueceu sua senha?</a>
                        </div>
                        <button type="submit"
                            style={{ backgroundColor: "rgba(20, 200, 113, 1)" }}
                            className="w-full text-white rounded-full py-2 hover:brightness-110 transition">
                            Login
                        </button>
                        <p className="text-sm text-center text-gray-400">
                            Novo na GoodTicket?{" "}
                            <Link href="/cadastro" style={{ color: "rgba(20, 200, 113, 1)" }} className="hover:underline">Cadastrar</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}
