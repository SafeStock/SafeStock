import axios from "axios";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

export async function baixarRelatorio(tipoRelatorio, url, nomeArquivo) {
    try {
        const res = await axios.get(url, {
            responseType: "arraybuffer",
            headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` },
        });

        if (res.status === 204) {
            toast.error("Nenhum dado encontrado para exportar.");
            return;
        }

        const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `${nomeArquivo}.xlsx`);
        toast.success(`Relatório ${tipoRelatorio} baixado com sucesso!`);
    } catch (error) {
        console.error("Erro ao baixar o relatório:", error);
        toast.error("Erro ao baixar o relatório. Verifique os logs para mais detalhes.");
    }
}