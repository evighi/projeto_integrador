import { Imagem } from "./Imagem"; 
//import { Visita } from "./Visita";

export interface ImovelItf {
  id: number;
  titulo: string;
  descricao: string;
  rua: string;
  numero: string;
  cep: string;
  complemento: string;
  valorAluguel: string; // era number
  valorVenda: string;   // era number
  telefoneProprietario: string;
  createdAt: string; // veio como string no JSON (pode ser Date se for convertido depois)
  imagens: Imagem[]; // você pode criar essa interface separada
}
