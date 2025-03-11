import { useState, useEffect } from "react";
import { Activity, Users, Dumbbell, Calendar } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import RecentClasses from "@/components/dashboard/RecentClasses";
import { mockApi } from "@/utils/mockApi";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useApi";
import { studentService } from "@/services";

const Index = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({
    students: 0,
    activeStudents: 0,
    exercises: 0,
    classesToday: 0,
  });

  // Using our new useApi hook to fetch students
  const { data: students, isLoading: studentsLoading } = useApi({
    fetchFn: studentService.getAllStudents,
    onError: (error) => {
      toast({
        title: "Erro ao carregar alunos",
        description: error,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    // This simulates fetching data from our backend
    const fetchDashboardData = async () => {
      try {
        // For now we're using our mock API
        const [exercisesData, classesData] = await Promise.all([
          mockApi.getExercises(),
          mockApi.getClasses(),
        ]);

        const activeStudentsCount = students?.filter(
          (student) => student.status === "active"
        ).length || 0;

        // Classes scheduled for today
        const today = new Date();
        const classesToday = classesData.filter(
          (cls) => new Date(cls.date).toDateString() === today.toDateString()
        ).length;

        setStats({
          students: students?.length || 0,
          activeStudents: activeStudentsCount,
          exercises: exercisesData.length,
          classesToday,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do dashboard",
          variant: "destructive",
        });
      }
    };

    if (students) {
      fetchDashboardData();
    }
  }, [students, toast]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total de Alunos"
            value={studentsLoading ? "..." : stats.students}
            icon={<Users size={24} />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Alunos Ativos"
            value={studentsLoading ? "..." : stats.activeStudents}
            icon={<Users size={24} />}
            description="Alunos com matrícula ativa"
          />
          <StatCard
            title="Exercícios"
            value={stats.exercises}
            icon={<Dumbbell size={24} />}
          />
          <StatCard
            title="Aulas Hoje"
            value={stats.classesToday}
            icon={<Calendar size={24} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ActivityChart />
          <RecentClasses />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
