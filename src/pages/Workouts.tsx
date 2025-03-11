import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import WorkoutCard from "@/components/workouts/WorkoutCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { workouts } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

const Workouts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleDeleteWorkout = (id: number) => {
    toast({
      title: "Treino excluído",
      description: "O treino foi excluído com sucesso.",
      variant: "destructive",
    });
  };

  const handleViewWorkout = (id: number) => {
    // Lógica para visualizar detalhes do treino
  };

  const handleEditWorkout = (id: number) => {
    // Lógica para editar o treino
  };

  const filteredWorkouts = workouts.filter(workout => 
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const workoutsByType = {
    all: filteredWorkouts,
    hipertrofia: filteredWorkouts.filter(workout => workout.type.toLowerCase() === "hipertrofia"),
    forca: filteredWorkouts.filter(workout => workout.type.toLowerCase() === "força"),
    cardio: filteredWorkouts.filter(workout => workout.type.toLowerCase() === "cardio"),
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Treinos</h1>
          <Button>
            <Plus size={16} className="mr-2" />
            Novo Treino
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar treinos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="hipertrofia">Hipertrofia</TabsTrigger>
            <TabsTrigger value="forca">Força</TabsTrigger>
            <TabsTrigger value="cardio">Cardio</TabsTrigger>
          </TabsList>
          
          {Object.entries(workoutsByType).map(([type, workoutList]) => (
            <TabsContent key={type} value={type} className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workoutList.length > 0 ? (
                  workoutList.map((workout) => (
                    <WorkoutCard
                      key={workout.id}
                      id={workout.id}
                      name={workout.name}
                      type={workout.type}
                      exerciseCount={workout.exercises.length}
                      createdAt={workout.createdAt}
                      duration={workout.duration}
                      onView={handleViewWorkout}
                      onEdit={handleEditWorkout}
                      onDelete={handleDeleteWorkout}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground">
                      Nenhum treino encontrado para esta categoria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Workouts;
