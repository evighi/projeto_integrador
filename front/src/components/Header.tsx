// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useClienteStore } from "@/context/ClienteContext";
import { toast } from "sonner";

export function Header() {
    const { cliente, deslogaCliente } = useClienteStore();  // null se não logado
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // fecha dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="border-green-700 bg-[#9B9993] dark:bg-green-800 dark:border-green-600">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                {/* logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/goodticket.png" alt="Logo GoodTicket" width={100} height={100} />
                    <span className="text-2xl font-semibold dark:text-white">

                    </span>
                </Link>

                {/* avatar e menu */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="focus:outline-none"
                        aria-label="menu do usuário"
                    >
                        <Image
                            src="/avatar.png"      /* coloque um avatar padrão em /public/avatar.png */
                            alt="Perfil"
                            width={32}
                            height={32}
                            className="rounded-full border-2 border-white"
                        />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 z-50">
                            {!cliente ? (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        href="/cadastro"
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Cadastrar-se
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/conta"
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Minha conta
                                    </Link>
                                    <button
                                        onClick={() => {
                                            deslogaCliente();
                                            localStorage.removeItem("clienteId");
                                            localStorage.removeItem("token");
                                            toast.success("Logout realizado com sucesso!");
                                            setOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Sair
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
