import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock } from "lucide-react";

const classes = [
  {
    id: 1,
    name: "Musculação Avançada",
    time: "07:00 - 08:30",
    instructor: "Carlos Silva",
    participants: 12,
    maxParticipants: 15,
  },
  {
    id: 2,
    name: "Spinning",
    time: "09:00 - 10:00",
    instructor: "Amanda Oliveira",
    participants: 15,
    maxParticipants: 15,
  },
  {
    id: 3,
    name: "Yoga",
    time: "11:00 - 12:00",
    instructor: "Juliana Costa",
    participants: 8,
    maxParticipants: 12,
  },
  {
    id: 4,
    name: "Crossfit",
    time: "18:00 - 19:30",
    instructor: "Rafael Mendes",
    participants: 10,
    maxParticipants: 12,
  },
];

const RecentClasses = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aulas do Dia</CardTitle>
        <CardDescription>Próximas aulas agendadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes.map((cls) => (
            <div key={cls.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">{cls.name}</h4>
                <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {cls.time}
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {cls.participants}/{cls.maxParticipants}
                  </div>
                </div>
              </div>
              <Badge variant={cls.participants === cls.maxParticipants ? "destructive" : "outline"}>
                {cls.participants === cls.maxParticipants ? "Lotado" : "Disponível"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentClasses;
