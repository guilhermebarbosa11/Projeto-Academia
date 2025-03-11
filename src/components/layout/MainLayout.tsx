import { Sidebar, SidebarMenu, SidebarContent, SidebarProvider, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarHeader } from "@/components/ui/sidebar";
import { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, BookOpen, Calendar, Dumbbell, Home, ListChecks, LogOut, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/" },
    { title: "Treinos", icon: Dumbbell, path: "/treinos" },
    { title: "Exercícios", icon: BookOpen, path: "/exercicios" },
    { title: "Alunos", icon: Users, path: "/alunos" },
    { title: "Agendamentos", icon: Calendar, path: "/agendamentos" },
    { title: "Avaliações", icon: ListChecks, path: "/avaliacoes" },
    { title: "Relatórios", icon: BarChart3, path: "/relatorios" },
    { title: "Configurações", icon: Settings, path: "/configuracoes" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="py-6 px-6 flex items-center justify-center">
            <h1 className="text-2xl font-bold text-white">
              Gym<span className="text-gym-green">Pro</span>
            </h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link 
                          to={item.path}
                          className={cn(
                            "w-full", 
                            location.pathname === item.path ? "text-white bg-sidebar-accent" : "text-sidebar-foreground"
                          )}
                        >
                          <item.icon size={20} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="mt-auto pb-4 px-4">
              <Button variant="outline" className="w-full text-white border-white/20 hover:bg-white/10 hover:text-white">
                <LogOut size={18} className="mr-2" />
                Sair
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <div className="container py-4">
            <div className="flex items-center mb-4 p-2">
              <SidebarTrigger className="mr-4 text-gym-dark-blue" />
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Perfil
                </Button>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
