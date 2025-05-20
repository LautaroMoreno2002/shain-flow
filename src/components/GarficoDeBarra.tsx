import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    {mes: "Enero", semana_1: 10, semana_2: 20},
    {mes: 'Febrero',semana_1: 25, semana_2: 22},
    {mes: 'Marzo',semana_1: 15, semana_2: 21},
    {mes: 'Abril', semana_1: 20, semana_2: 17},
    {mes: 'Mayo',semana_1: 12, semana_2: 18},
    {mes: 'Junio', semana_1: 20, semana_2: 24},
    {mes: 'Julio',semana_1: 15, semana_2: 3},
]

export const GraficoDeBarra = () => {
  return (
    <ResponsiveContainer width="100%" aspect={2}>
        <BarChart 
            data={data}
            width={500}
            height={300}
            margin={{
                top:5,
                right:30,
                left:20,
                bottom:5
            }}
        >
        <CartesianGrid strokeDasharray="4 1 2" />    
        <XAxis dataKey="mes"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="semana_1" fill="#6b48ff"/>
        <Bar dataKey="semana_2" fill="#1ee3cf"/>
        </BarChart>
    </ResponsiveContainer>
  )
}

//export default GraficoDeBarra