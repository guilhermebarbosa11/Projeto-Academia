import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import MainLayout from "@/components/layout/MainLayout";
import { exercises } from "@/utils/mockData";
import { MuscleGroup } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ExercisesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<{
    muscleGroups: number[];
    difficulty: string | null;
  }>({
    muscleGroups: [],
    difficulty: null,
  });

  const { toast } = useToast();

  const handleAddToWorkout = (id: number) => {
    toast({
      title: "Exercício adicionado",
      description: "Exercício adicionado ao treino com sucesso!",
    });
  };

  const handleViewExercise = (id: number) => {
    // Lógica para visualizar detalhes do exercício
  };

  const filteredExercises = exercises.filter((exercise) => {
    // Filtro de pesquisa por nome
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filtro por grupo muscular
    const matchesMuscleGroups =
      selectedFilters.muscleGroups.length === 0 ||
      exercise.muscleGroups.some((group) =>
        selectedFilters.muscleGroups.includes(group.id)
      );

    // Filtro por dificuldade
    const matchesDifficulty =
      selectedFilters.difficulty === null ||
      exercise.difficulty === selectedFilters.difficulty;

    return matchesSearch && matchesMuscleGroups && matchesDifficulty;
  });

  const toggleMuscleGroupFilter = (groupId: number) => {
    setSelectedFilters((prev) => {
      const exists = prev.muscleGroups.includes(groupId);
      return {
        ...prev,
        muscleGroups: exists
          ? prev.muscleGroups.filter((id) => id !== groupId)
          : [...prev.muscleGroups, groupId],
      };
    });
  };

  const setDifficultyFilter = (difficulty: string | null) => {
    setSelectedFilters((prev) => ({
      ...prev,
      difficulty,
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      muscleGroups: [],
      difficulty: null,
    });
  };

  const allMuscleGroups: MuscleGroup[] = [];
  exercises.forEach((exercise) => {
    exercise.muscleGroups.forEach((group) => {
      if (!allMuscleGroups.some((g) => g.id === group.id)) {
        allMuscleGroups.push(group);
      }
    });
  });

  allMuscleGroups.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Exercícios</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-2" />
                Novo Exercício
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Exercício</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground">
                  Funcionalidade em desenvolvimento
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar exercícios..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter size={16} />
                Filtros
                {(selectedFilters.muscleGroups.length > 0 ||
                  selectedFilters.difficulty !== null) && (
                  <Badge className="ml-1 bg-primary text-primary-foreground">
                    {selectedFilters.muscleGroups.length +
                      (selectedFilters.difficulty !== null ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Filtrar Exercícios</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="muscle" className="py-4">
                <TabsList className="w-full">
                  <TabsTrigger value="muscle" className="flex-1">
                    Grupos Musculares
                  </TabsTrigger>
                  <TabsTrigger value="difficulty" className="flex-1">
                    Dificuldade
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="muscle" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {allMuscleGroups.map((group) => (
                      <Badge
                        key={group.id}
                        variant={
                          selectedFilters.muscleGroups.includes(group.id)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => toggleMuscleGroupFilter(group.id)}
                      >
                        {group.name}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="difficulty" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {["iniciante", "intermediário", "avançado"].map(
                      (difficulty) => (
                        <Badge
                          key={difficulty}
                          variant={
                            selectedFilters.difficulty === difficulty
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() =>
                            setDifficultyFilter(
                              selectedFilters.difficulty === difficulty
                                ? null
                                : difficulty
                            )
                          }
                        >
                          {difficulty.charAt(0).toUpperCase() +
                            difficulty.slice(1)}
                        </Badge>
                      )
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
                <DialogTrigger asChild>
                  <Button>Aplicar</Button>
                </DialogTrigger>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {selectedFilters.muscleGroups.length > 0 ||
        selectedFilters.difficulty !== null ? (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Filtros:</span>
            {selectedFilters.muscleGroups.map((groupId) => {
              const group = allMuscleGroups.find((g) => g.id === groupId);
              return (
                group && (
                  <Badge
                    key={group.id}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => toggleMuscleGroupFilter(group.id)}
                  >
                    {group.name} ×
                  </Badge>
                )
              );
            })}
            {selectedFilters.difficulty && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setDifficultyFilter(null)}
              >
                {selectedFilters.difficulty.charAt(0).toUpperCase() +
                  selectedFilters.difficulty.slice(1)}{" "}
                ×
              </Badge>
            )}
            <Button
              variant="link"
              className="text-sm p-0 h-auto"
              onClick={clearFilters}
            >
              Limpar todos
            </Button>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                id={exercise.id}
                name={exercise.name}
                muscleGroups={exercise.muscleGroups}
                imageUrl={exercise.imageUrl}
                difficulty={exercise.difficulty}
                onAddToWorkout={handleAddToWorkout}
                onView={handleViewExercise}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">
                Nenhum exercício encontrado. Tente outros filtros.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ExercisesPage;
