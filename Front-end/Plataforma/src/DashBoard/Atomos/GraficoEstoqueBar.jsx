import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Candida', esperado: 22, atual: 2 },
  { name: 'Detergente', esperado: 28, atual: 1 },
  { name: 'Alvejante', esperado: 16, atual: 1 },
  { name: 'Álcool', esperado: 30, atual: 0 },
  { name: 'Luva Vinil', esperado: 13, atual: 1 },
  { name: 'Suplefex', esperado: 20, atual: 8 },
];

export default function GraficoEstoqueBar() {
  return (
    <div className="w-full bg-white rounded-2xl shadow p-6 font-[inter]">

      <ResponsiveContainer width="95%" height={240}>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: '#2f4563' }} />
          <YAxis tick={{ fill: '#2f4563' }} />
          <Tooltip />
          <Legend
            formatter={(value) => (
              <span className="text-[#2f4563] font-medium">{value === 'esperado' ? 'Esperado' : 'Atual'}</span>
            )}
          />
          <Bar dataKey="esperado" stackId="estoque" fill="#a9d3e9" />
          <Bar dataKey="atual" stackId="estoque" fill="#2f4563" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
