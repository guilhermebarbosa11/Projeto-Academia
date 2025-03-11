import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit2, Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface WorkoutCardProps {
  id: number;
  name: string;
  type: string;
  exerciseCount: number;
  createdAt: Date;
  duration: number;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const WorkoutCard = ({ 
  id, 
  name, 
  type, 
  exerciseCount, 
  createdAt, 
  duration,
  onView,
  onEdit,
  onDelete
}: WorkoutCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="outline">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar size={14} className="mr-2" />
            Criado em {format(createdAt, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock size={14} className="mr-2" />
            Duração estimada: {duration} minutos
          </div>
          <p className="text-sm mt-2">
            <strong>{exerciseCount}</strong> exercícios neste treino
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onView && onView(id)}
        >
          <Eye size={16} className="mr-1" /> Ver
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onEdit && onEdit(id)}
        >
          <Edit2 size={16} className="mr-1" /> Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-destructive hover:text-destructive-foreground hover:bg-destructive"
          onClick={() => onDelete && onDelete(id)}
        >
          <Trash2 size={16} className="mr-1" /> Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
