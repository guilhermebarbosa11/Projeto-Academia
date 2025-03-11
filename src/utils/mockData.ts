import { Assessment, Class, Exercise, MuscleGroup, Student, Workout, WorkoutExercise } from "@/types";
import { subDays, subMonths, subYears } from "date-fns";

export const muscleGroups: MuscleGroup[] = [
  { id: 1, name: "Peito" },
  { id: 2, name: "Costas" },
  { id: 3, name: "Pernas" },
  { id: 4, name: "Ombros" },
  { id: 5, name: "Bíceps" },
  { id: 6, name: "Tríceps" },
  { id: 7, name: "Abdômen" },
  { id: 8, name: "Glúteos" },
  { id: 9, name: "Panturrilha" },
  { id: 10, name: "Antebraço" },
];

export const exercises: Exercise[] = [
  {
    id: 1,
    name: "Supino Reto",
    description: "Exercício para desenvolvimento do peitoral",
    muscleGroups: [
      muscleGroups[0], // Peito
      muscleGroups[5], // Tríceps
    ],
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1740&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example",
    difficulty: "intermediário",
    instructions: [
      "Deite-se no banco com os pés no chão",
      "Segure a barra com as mãos um pouco mais largas que a largura dos ombros",
      "Abaixe a barra controladamente até tocar levemente o peito",
      "Empurre a barra para cima até que os braços estejam estendidos"
    ],
    equipment: ["Banco reto", "Barra", "Anilhas"]
  },
  {
    id: 2,
    name: "Agachamento Livre",
    description: "Exercício composto para desenvolvimento das pernas",
    muscleGroups: [
      muscleGroups[2], // Pernas
      muscleGroups[7], // Glúteos
    ],
    imageUrl: "https://images.unsplash.com/photo-1566241142888-11865d50e4f9?q=80&w=1746&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example",
    difficulty: "avançado",
    instructions: [
      "Posicione a barra nos trapézios",
      "Pés na largura dos ombros",
      "Desça até que suas coxas fiquem paralelas ao chão",
      "Suba empurrando através dos calcanhares"
    ],
    equipment: ["Rack de agachamento", "Barra", "Anilhas"]
  },
  {
    id: 3,
    name: "Puxada Alta",
    description: "Exercício para desenvolvimento das costas",
    muscleGroups: [
      muscleGroups[1], // Costas
      muscleGroups[4], // Bíceps
    ],
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1738&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example",
    difficulty: "iniciante",
    instructions: [
      "Sente-se na máquina com os joelhos presos sob as almofadas",
      "Segure a barra com as mãos um pouco mais largas que a largura dos ombros",
      "Puxe a barra para baixo até que toque levemente a parte superior do peito",
      "Controle o movimento de volta à posição inicial"
    ],
    equipment: ["Máquina de puxada"]
  },
  {
    id: 4,
    name: "Levantamento Terra",
    description: "Exercício composto para desenvolvimento do corpo inteiro",
    muscleGroups: [
      muscleGroups[1], // Costas
      muscleGroups[2], // Pernas
      muscleGroups[7], // Glúteos
    ],
    imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1625&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example",
    difficulty: "avançado",
    instructions: [
      "Posicione-se com os pés na largura dos ombros",
      "Segure a barra com as mãos um pouco mais largas que a largura dos pés",
      "Mantenha as costas retas e levante a barra usando as pernas e as costas",
      "Abaixe a barra controladamente de volta ao chão"
    ],
    equipment: ["Barra", "Anilhas"]
  },
  {
    id: 5,
    name: "Desenvolvimento de Ombros",
    description: "Exercício para desenvolvimento dos ombros",
    muscleGroups: [
      muscleGroups[3], // Ombros
      muscleGroups[5], // Tríceps
    ],
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1740&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example",
    difficulty: "intermediário",
    instructions: [
      "Sente-se no banco com as costas apoiadas",
      "Segure os halteres ao lado dos ombros com as palmas voltadas para frente",
      "Empurre os halteres para cima até que os braços estejam estendidos",
      "Abaixe os halteres controladamente de volta à posição inicial"
    ],
    equipment: ["Banco", "Halteres"]
  },
  {
    id: 6,
    name: "Rosca Direta",
    description: "Exercício para desenvolvimento dos bíceps",
    muscleGroups: [
      muscleGroups[4], // Bíceps
      muscleGroups[9], // Antebraço
    ],
    imageUrl: "https://images.unsplash.com/photo-1584863231364-2edc166de576?q=80&w=1740&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=example",
    difficulty: "iniciante",
    instructions: [
      "Fique em pé com os pés na largura dos ombros",
      "Segure a barra com as palmas voltadas para cima",
      "Dobre os cotovelos e levante a barra até o nível dos ombros",
      "Abaixe a barra controladamente de volta à posição inicial"
    ],
    equipment: ["Barra", "Anilhas"]
  }
];

const createWorkoutExercises = (exerciseIds: number[]): WorkoutExercise[] => {
  return exerciseIds.map((exerciseId, index) => {
    const exercise = exercises.find(ex => ex.id === exerciseId)!;
    return {
      id: index + 1,
      exerciseId,
      exercise,
      sets: Math.floor(Math.random() * 3) + 3, // 3-5 séries
      reps: Math.floor(Math.random() * 6) + 8, // 8-14 repetições
      restTime: (Math.floor(Math.random() * 4) + 6) * 10, // 60-90 segundos em incrementos de 10
      order: index + 1,
      notes: index === 0 ? "Aumentar o peso progressivamente" : undefined
    };
  });
};

export const workouts: Workout[] = [
  {
    id: 1,
    name: "Treino A - Peito e Tríceps",
    description: "Foco em desenvolvimento de peito e tríceps com exercícios compostos",
    type: "Hipertrofia",
    exercises: createWorkoutExercises([1, 5, 6]),
    createdAt: subDays(new Date(), 30),
    updatedAt: subDays(new Date(), 2),
    duration: 60
  },
  {
    id: 2,
    name: "Treino B - Costas e Bíceps",
    description: "Desenvolvimento de costas e bíceps com foco em largura e espessura",
    type: "Hipertrofia",
    exercises: createWorkoutExercises([3, 4, 6]),
    createdAt: subDays(new Date(), 28),
    updatedAt: subDays(new Date(), 1),
    duration: 75
  },
  {
    id: 3,
    name: "Treino C - Pernas",
    description: "Treino completo de pernas focando em quádriceps, posterior e glúteos",
    type: "Força",
    exercises: createWorkoutExercises([2, 4]),
    createdAt: subDays(new Date(), 25),
    updatedAt: subDays(new Date(), 3),
    duration: 90
  },
  {
    id: 4,
    name: "Treino HIIT",
    description: "Treino intervalado de alta intensidade para queima calórica",
    type: "Cardio",
    exercises: createWorkoutExercises([2, 3, 6]),
    createdAt: subDays(new Date(), 15),
    updatedAt: subDays(new Date(), 5),
    duration: 45
  }
];

const createAssessment = (studentId: number, date: Date): Assessment => {
  return {
    id: Math.floor(Math.random() * 1000) + 1,
    studentId,
    date,
    weight: 70 + Math.random() * 20,
    height: 170 + Math.random() * 20,
    bodyFat: 15 + Math.random() * 10,
    bmi: 22 + Math.random() * 5,
    measurements: {
      chest: 90 + Math.random() * 20,
      waist: 80 + Math.random() * 15,
      hips: 95 + Math.random() * 15,
      leftArm: 30 + Math.random() * 10,
      rightArm: 30 + Math.random() * 10,
      leftThigh: 55 + Math.random() * 10,
      rightThigh: 55 + Math.random() * 10,
    },
    notes: "Progresso consistente. Manter o foco na alimentação."
  };
};

export const students: Student[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "(11) 98765-4321",
    birthDate: subYears(new Date(), 30),
    registrationDate: subMonths(new Date(), 6),
    avatarUrl: undefined,
    plan: "Premium Anual",
    planExpiryDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    status: "active",
    lastVisit: subDays(new Date(), 1),
    workouts: [workouts[0], workouts[2]],
    assessments: [
      createAssessment(1, subMonths(new Date(), 6)),
      createAssessment(1, subMonths(new Date(), 3)),
      createAssessment(1, new Date())
    ]
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    phone: "(11) 91234-5678",
    birthDate: subYears(new Date(), 25),
    registrationDate: subMonths(new Date(), 3),
    avatarUrl: undefined,
    plan: "Mensal",
    planExpiryDate: new Date(new Date().setDate(new Date().getDate() + 15)),
    status: "active",
    lastVisit: subDays(new Date(), 2),
    workouts: [workouts[1], workouts[3]],
    assessments: [
      createAssessment(2, subMonths(new Date(), 3)),
      createAssessment(2, subMonths(new Date(), 1))
    ]
  },
  {
    id: 3,
    name: "Carlos Santos",
    email: "carlos.santos@example.com",
    phone: "(11) 98888-7777",
    birthDate: subYears(new Date(), 40),
    registrationDate: subMonths(new Date(), 12),
    avatarUrl: undefined,
    plan: "Premium Anual",
    planExpiryDate: new Date(new Date().setMonth(new Date().getMonth() + 9)),
    status: "inactive",
    lastVisit: subDays(new Date(), 30),
    workouts: [workouts[0], workouts[2]],
    assessments: [
      createAssessment(3, subMonths(new Date(), 12)),
      createAssessment(3, subMonths(new Date(), 6)),
      createAssessment(3, subMonths(new Date(), 1))
    ]
  }
];

export const classes: Class[] = [
  {
    id: 1,
    title: "Musculação Avançada",
    description: "Treino avançado de musculação focado em hipertrofia",
    date: new Date(),
    startTime: "07:00",
    endTime: "08:30",
    instructor: "Carlos Silva",
    participants: 12,
    maxParticipants: 15,
    type: "Musculação",
    room: "Sala de Musculação"
  },
  {
    id: 2,
    title: "Spinning",
    description: "Aula de ciclismo indoor de alta intensidade",
    date: new Date(),
    startTime: "09:00",
    endTime: "10:00",
    instructor: "Amanda Oliveira",
    participants: 15,
    maxParticipants: 15,
    type: "Spinning",
    room: "Sala de Spinning"
  },
  {
    id: 3,
    title: "Yoga",
    description: "Aula de yoga para todos os níveis",
    date: new Date(),
    startTime: "11:00",
    endTime: "12:00",
    instructor: "Juliana Costa",
    participants: 8,
    maxParticipants: 12,
    type: "Yoga",
    room: "Sala de Yoga"
  },
  {
    id: 4,
    title: "Crossfit",
    description: "Treino funcional de alta intensidade",
    date: new Date(),
    startTime: "18:00",
    endTime: "19:30",
    instructor: "Rafael Mendes",
    participants: 10,
    maxParticipants: 12,
    type: "Crossfit",
    room: "Box de Crossfit"
  },
  {
    id: 5,
    title: "Pilates",
    description: "Aula de pilates focada no fortalecimento do core",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: "08:00",
    endTime: "09:00",
    instructor: "Camila Rocha",
    participants: 6,
    maxParticipants: 8,
    type: "Pilates",
    room: "Sala de Pilates"
  },
  {
    id: 6,
    title: "Funcional",
    description: "Treino funcional para todos os níveis",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: "10:00",
    endTime: "11:00",
    instructor: "Lucas Ferreira",
    participants: 12,
    maxParticipants: 15,
    type: "Funcional",
    room: "Sala Multiuso"
  }
];
