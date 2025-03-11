import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MuscleGroup } from "@/types";
import { Eye, Plus } from "lucide-react";

interface ExerciseCardProps {
  id: number;
  name: string;
  muscleGroups: MuscleGroup[];
  imageUrl: string;
  difficulty: "iniciante" | "intermediário" | "avançado";
  onAddToWorkout?: (id: number) => void;
  onView?: (id: number) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "iniciante":
      return "bg-green-100 text-green-800";
    case "intermediário":
      return "bg-blue-100 text-blue-800";
    case "avançado":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ExerciseCard = ({ 
  id, 
  name, 
  muscleGroups, 
  imageUrl, 
  difficulty,
  onAddToWorkout,
  onView 
}: ExerciseCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <Badge 
          className={`absolute top-2 right-2 ${getDifficultyColor(difficulty)}`}
        >
          {difficulty}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>
          {muscleGroups.map((group) => group.name).join(", ")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1 mt-1">
          {muscleGroups.map((group) => (
            <Badge key={group.id} variant="outline" className="text-xs">
              {group.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onView && onView(id)}
        >
          <Eye size={16} className="mr-1" /> Detalhes
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
          onClick={() => onAddToWorkout && onAddToWorkout(id)}
        >
          <Plus size={16} className="mr-1" /> Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
