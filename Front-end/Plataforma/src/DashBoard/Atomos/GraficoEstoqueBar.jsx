import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function GraficoEstoqueBar() {
  const [dadosGrafico, setDadosGrafico] = useState([]);

  const token = sessionStorage.getItem('authToken');

  const buscarDados = () => {
    fetch("http://localhost:8080/api/produtos", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const dadosFormatados = data.map((item) => ({
          name: item.nome,        // ou o campo que representa o nome no seu backend
          esperado: item.limiteSemanalDeUso,
          atual: item.quantidade
        }));
        setDadosGrafico(dadosFormatados);
        console.log(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do gráfico:", err);
      });
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <div className="w-full bg-white rounded-2xl shadow p-6 font-[inter]">
      <ResponsiveContainer width="95%" height={240}>
        <BarChart data={dadosGrafico} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: '#2f4563' }} />
          <YAxis tick={{ fill: '#2f4563' }} />
          <Tooltip />
          <Legend
            formatter={(value) => (
              <span className="text-[#2f4563] font-medium">
                {value === 'esperado' ? 'Esperado' : 'Atual'}
              </span>
            )}
          />
          <Bar dataKey="esperado" stackId="estoque" fill="#a9d3e9" />
          <Bar dataKey="atual" stackId="estoque" fill="#2f4563" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
