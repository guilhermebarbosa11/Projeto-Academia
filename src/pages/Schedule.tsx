import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import MainLayout from "@/components/layout/MainLayout";
import ClassCard from "@/components/calendar/ClassCard";
import { classes } from "@/utils/mockData";
import { Class } from "@/types";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<"day" | "week">("day");

  const goToNextDay = () => {
    setSelectedDate(prevDate => addDays(prevDate, 1));
  };

  const goToPrevDay = () => {
    setSelectedDate(prevDate => subDays(prevDate, 1));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
    setCalendarDate(new Date());
  };

  const handleSelectDay = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setCalendarDate(date);
    }
  };

  const renderDayClasses = (date: Date) => {
    return classes.filter(cls => isSameDay(new Date(cls.date), date));
  };

  const renderWeekView = () => {
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i - selectedDate.getDay()));
    
    return (
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-sm text-muted-foreground mb-1">{format(day, 'EEE', { locale: ptBR })}</p>
            <Button 
              variant="outline" 
              className={cn(
                "w-10 h-10 p-0 rounded-full",
                isSameDay(day, new Date()) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                isSameDay(day, selectedDate) && "border-primary"
              )}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, 'd')}
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const groupClassesByTime = (classes: Class[]) => {
    const timeSlots: Record<string, Class[]> = {};
    
    classes.forEach(cls => {
      if (!timeSlots[cls.startTime]) {
        timeSlots[cls.startTime] = [];
      }
      timeSlots[cls.startTime].push(cls);
    });
    
    return Object.entries(timeSlots).sort((a, b) => a[0].localeCompare(b[0]));
  };

  const dayClasses = renderDayClasses(selectedDate);
  const groupedClasses = groupClassesByTime(dayClasses);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Agenda</h1>
          <Button>
            <Plus size={16} className="mr-2" />
            Nova Aula
          </Button>
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={goToPrevDay}
              >
                <ChevronLeft size={16} />
              </Button>
              <h2 className="text-xl font-semibold">
                {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
              </h2>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={goToNextDay}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Tabs defaultValue={viewType} onValueChange={(value) => setViewType(value as "day" | "week")}>
                <TabsList>
                  <TabsTrigger value="day">Dia</TabsTrigger>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" onClick={goToToday} className="ml-2">
                Hoje
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <CalendarIcon size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelectDay}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="p-4">
            {viewType === "week" && (
              <div className="mb-6">
                {renderWeekView()}
              </div>
            )}
            
            {dayClasses.length > 0 ? (
              <div className="space-y-8">
                {groupedClasses.map(([time, classes]) => (
                  <div key={time} className="relative">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-muted-foreground w-16">
                        {time}
                      </div>
                      <div className="h-px flex-grow bg-border ml-2"></div>
                    </div>
                    <div className="mt-2 space-y-2 pl-16">
                      {classes.map(cls => (
                        <ClassCard
                          key={cls.id}
                          id={cls.id}
                          title={cls.title}
                          startTime={cls.startTime}
                          endTime={cls.endTime}
                          instructor={cls.instructor}
                          participants={cls.participants}
                          maxParticipants={cls.maxParticipants}
                          type={cls.type}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Nenhuma aula agendada para este dia.
                </p>
                <Button variant="link" className="mt-2">
                  Adicionar nova aula
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Schedule;
