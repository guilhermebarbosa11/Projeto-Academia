import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock, ChevronRight, ClipboardList, Dumbbell } from "lucide-react";

interface StudentCardProps {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: string;
  status: "active" | "inactive" | "pending";
  lastVisit: Date;
  onViewProfile: (id: number) => void;
  onViewWorkouts: (id: number) => void;
  onViewAssessments: (id: number) => void;
}

const StatusBadge = ({ status }: { status: "active" | "inactive" | "pending" }) => {
  const statusConfig = {
    active: { label: "Ativo", class: "bg-green-100 text-green-800" },
    inactive: { label: "Inativo", class: "bg-red-100 text-red-800" },
    pending: { label: "Pendente", class: "bg-yellow-100 text-yellow-800" },
  };

  const config = statusConfig[status];

  return (
    <Badge className={config.class}>
      {config.label}
    </Badge>
  );
};

const StudentCard = ({ 
  id, 
  name, 
  email, 
  avatarUrl, 
  plan, 
  status, 
  lastVisit,
  onViewProfile,
  onViewWorkouts,
  onViewAssessments
}: StudentCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{name}</h3>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Plano:</span>
            <span className="text-sm font-medium">{plan}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Último acesso:</span>
            <span className="text-sm">{formatDate(lastVisit)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-4">
        <Button 
          variant="default" 
          size="sm" 
          className="w-full justify-between"
          onClick={() => onViewProfile(id)}
        >
          <span>Ver Perfil</span>
          <ChevronRight size={16} />
        </Button>
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewWorkouts(id)}
          >
            <Dumbbell size={16} className="mr-1" /> Treinos
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewAssessments(id)}
          >
            <ClipboardList size={16} className="mr-1" /> Avaliações
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
