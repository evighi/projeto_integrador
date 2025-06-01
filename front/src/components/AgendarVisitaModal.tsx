"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ImovelItf } from "@/utils/types/ImovelItf";

interface Props {
  imovel: ImovelItf;
  onClose: () => void;
}

const AgendarVisitaModal: React.FC<Props> = ({ imovel, onClose }) => {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(new Date());

  const confirmar = () => {
    alert(`Visita ao imóvel "${imovel.titulo}" marcada.\nData: ${dataSelecionada?.toLocaleString("pt-BR")}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Agendar Visita</h2>

        <p className="mb-2 text-sm text-gray-700">
          Imóvel: <strong>{imovel.titulo}</strong>
        </p>

        <DatePicker
          selected={dataSelecionada}
          onChange={(date) => setDataSelecionada(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border p-2 w-full rounded"
          minDate={new Date()}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={confirmar}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgendarVisitaModal;
