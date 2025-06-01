
import { ImovelItf } from "@/utils/types/ImovelItf";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
    min: number;
    max: number;
}

type InputPesquisaProps = {
    setImoveis: React.Dispatch<React.SetStateAction<any[]>>; // Ajuste conforme o tipo de dados que você está usando
}

export function InputPesquisa({ setImoveis }: InputPesquisaProps) {
    const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()

    async function enviaPesquisa(data: Inputs) {
        if (data.min < 0 || data.max < 0 || data.min > data.max) {
            toast.error("Verifique os valores de aluguel. O valor mínimo deve ser menor que o valor máximo.");
            return;
        }

        // Requisição para a rota de busca por preço de aluguel
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/imoveis/aluguel?min=${data.min}&max=${data.max}`);
        const dados = await response.json();

        if (dados.length === 0) {
            toast.error("Não há imóveis dentro do intervalo de preço informado.");
            reset({ min: 0, max: 0 });
            return;
        }

        setImoveis(dados);  // Atualiza os imóveis no estado
    }

    async function mostraDestaques() {
        // Requisição para buscar todos os imóveis
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/imoveis`);
        const dados = await response.json();
        reset({ min: 0, max: 0 });
        setImoveis(dados);  // Atualiza com todos os imóveis
    }

    return (
        <div className="flex mx-auto max-w-5xl mt-3">
            <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
                <label htmlFor="min" className="mb-2 text-sm font-medium text-gray-900">Valor Mínimo</label>
                <div className="relative mb-2">
                    <input
                        type="number"
                        id="min"
                        className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Valor mínimo"
                        {...register("min")}
                    />
                </div>
                <label htmlFor="max" className="mb-2 text-sm font-medium text-gray-900">Valor Máximo</label>
                <div className="relative mb-2">
                    <input
                        type="number"
                        id="max"
                        className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Valor máximo"
                        {...register("max")}
                    />
                </div>
                <button type="submit" className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                    Pesquisar
                </button>
            </form>
            <button type="button"
                className="cursor-pointer ms-3 mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                onClick={mostraDestaques}>
                Exibir Destaques
            </button>
        </div>
    );
}
