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
          name: item.nome,
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
    const interval = setInterval(() => {
      buscarDados();
    }, 5000); 

    return () => clearInterval(interval); // limpa intervalo ao desmontar componente
  }, []);

  return (

    <div className="w-full bg-white rounded-2xl shadow p-6 font-[inter]">
      <ResponsiveContainer width="95%" height={240}>
        <BarChart data={dadosGrafico} barCategoryGap="20%">
          <CartesianGrid stroke="#e0e0e0" vertical={false}/>
          <XAxis dataKey="name" tick={{ fill: '#2f4563', fontSize: '1.7vh',}} />
          <YAxis tick={{ fill: '#2f4300' }} />
          <Tooltip  
          contentStyle={{ background: 'white', borderRadius: '13px', border: '1.5px solid #b0b0b0', boxShadow: '-8px 4px 10px rgba(0, 0, 0, 0.4)' }} 
          position={{ x: 570, y: 175 }}
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

