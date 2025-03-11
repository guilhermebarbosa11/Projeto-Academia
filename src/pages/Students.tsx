import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, UserPlus } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StudentCard from "@/components/students/StudentCard";
import { students } from "@/utils/mockData";
import { Badge } from "@/components/ui/badge";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewProfile = (id: number) => {
    // Lógica para visualizar perfil do aluno
  };

  const handleViewWorkouts = (id: number) => {
    // Lógica para visualizar treinos do aluno
  };

  const handleViewAssessments = (id: number) => {
    // Lógica para visualizar avaliações do aluno
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Alunos</h1>
          <Button>
            <UserPlus size={16} className="mr-2" />
            Novo Aluno
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar alunos..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="py-2 px-3">
              Todos <span className="ml-1 text-muted-foreground">{students.length}</span>
            </Badge>
            <Badge variant="outline" className="py-2 px-3">
              Ativos <span className="ml-1 text-muted-foreground">
                {students.filter(s => s.status === "active").length}
              </span>
            </Badge>
            <Badge variant="outline" className="py-2 px-3">
              Inativos <span className="ml-1 text-muted-foreground">
                {students.filter(s => s.status === "inactive").length}
              </span>
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                id={student.id}
                name={student.name}
                email={student.email}
                avatarUrl={student.avatarUrl}
                plan={student.plan}
                status={student.status}
                lastVisit={student.lastVisit}
                onViewProfile={handleViewProfile}
                onViewWorkouts={handleViewWorkouts}
                onViewAssessments={handleViewAssessments}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">
                Nenhum aluno encontrado. Tente outra busca.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Students;
