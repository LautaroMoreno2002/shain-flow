import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import '../estilos/graficos.css'

const data = [
  { antiguedad: 'hasta 6 meses', porcentaje: 43 },
  { antiguedad: '0.5 a 5 años', porcentaje: 35 },
  { antiguedad: '5 a 10 años', porcentaje: 10 },
  { antiguedad: '10 a 20 años', porcentaje: 7 },
  { antiguedad: 'mas de 20 años', porcentaje: 5 },
];

const GraficoAntiguedad: React.FC = () => {
  return (
    <div
      className='chart-container'
      style={{
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Informe de Antigüedad</h2>
      <div
        style={{
          backgroundColor: '#00a8e8',
          color: 'white',
          padding: '12px',
          fontSize: '1.1rem',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        Rango de años laborales
      </div>

      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="antiguedad"
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="porcentaje" fill="#64c2f0" barSize={24}>
              <LabelList
                dataKey="porcentaje"
                position="right"
                formatter={(val: number) => `${val}%`}
                style={{ fontSize: 12 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficoAntiguedad;
