import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Dados fictícios para o gráfico
const data = [
  { name: "Dom", alunos: 30 },
  { name: "Seg", alunos: 45 },
  { name: "Ter", alunos: 42 },
  { name: "Qua", alunos: 50 },
  { name: "Qui", alunos: 38 },
  { name: "Sex", alunos: 60 },
  { name: "Sáb", alunos: 55 },
];

const ActivityChart = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Atividade da Academia</CardTitle>
        <CardDescription>Número de alunos por dia da semana</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="alunos"
                stroke="var(--gym-blue)"
                fill="var(--gym-blue)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
