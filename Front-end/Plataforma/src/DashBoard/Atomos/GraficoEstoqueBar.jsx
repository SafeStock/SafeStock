import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Candida', esperado: 22, atual: 1 },
  { name: 'Detergente', esperado: 28, atual: 1 },
  { name: 'Alvejante', esperado: 16, atual: 1 },
  { name: 'Álcool', esperado: 30, atual: 0 },
  { name: 'Luva Vinil', esperado: 13, atual: 1 },
  { name: 'Suplefex', esperado: 20, atual: 8 },
];

export default function GraficoEstoqueBar() {
  return (
    <div className="w-full rounded-2xl  p-6 font-[inter]">

      <ResponsiveContainer width="95%" height={240}>
        <BarChart data={data} barCategoryGap="25%">
          <CartesianGrid stroke="#e0e0e0" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#2f4563' }} />
          <YAxis tick={{ fill: '#2f4300' }} />
          <Tooltip />
          <Legend
            formatter={(value) => (
              <span className="text-[#2f4563] font-extrabold text-[14px]">{value === 'esperado' ? 'Esperado' : 'Atual'}</span>
            )}
          />
          <Bar dataKey="esperado" stackId="estoque" fill="#a9d3e9" />
          <Bar dataKey="atual" stackId="estoque" fill="#2f4563" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
