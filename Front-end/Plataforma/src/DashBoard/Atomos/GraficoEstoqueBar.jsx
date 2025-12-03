import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { API_BASE_URL } from '../../config/api';

export function GraficoEstoqueBar() {
  const [dadosGrafico, setDadosGrafico] = useState([]);

  const token = sessionStorage.getItem('authToken');

  const buscarDados = () => {
    fetch(`${API_BASE_URL}/produtos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
        .then((data) => {
        // assume backend returns products ordered by quantity or provide top-N endpoint; here we take first 6
        const qtdProdutosPlotados = data.slice(0, 6);
        const dadosFormatados = qtdProdutosPlotados.map((item) => ({
          name: item.nome,
          esperado: item.limiteSemanalDeUso,
          atual: item.quantidade
        }));
        setDadosGrafico(dadosFormatados);

      })
      .catch((err) => {
        console.error("Erro ao buscar dados do gráfico:", err);
      });
  };

  useEffect(() => {
    buscarDados();
    const interval = setInterval(() => {
      buscarDados();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (

    <div className="w-full bg-white rounded-2xl shadow ">
      <ResponsiveContainer width="95%" height={230}>
        <BarChart data={dadosGrafico} barCategoryGap="17%">
          <CartesianGrid stroke="#e0e0e0" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#2f4563', fontSize: '1.6vh', fontWeight: '550' }} />
          <YAxis tick={{ fill: '#2f4563', fontSize: '2.1vh', fontWeight: '450' }} />
          <Tooltip
            contentStyle={{ background: 'white', borderRadius: '13px', border: '1.5px solid #b0b0b0', boxShadow: '-8px 4px 10px rgba(0, 0, 0, 0.4)' }}
            position={{ x: 645, y: -40 }}
            cursor={{ fill: 'transparent' }}
          />
          <Legend
            formatter={(value) => (

              <span className="text-[#2f4563] font-semibold text-[1.7vh]">
                {value === 'esperado' ? 'Esperado' : 'Atual'}
              </span>
            )}
          />
          <Bar dataKey="atual" stackId="estoque" fill="#2f4563" activeBar={false} />
          <Bar dataKey="esperado" stackId="" fill="#a9d3e9" activeBar={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

