export interface MuscleGroup {
    id: number;
    name: string;
  }
  
  export interface Exercise {
    id: number;
    name: string;
    description: string;
    muscleGroups: MuscleGroup[];
    imageUrl: string;
    videoUrl?: string;
    difficulty: "iniciante" | "intermediário" | "avançado";
    instructions: string[];
    equipment: string[];
  }
  
  export interface Workout {
    id: number;
    name: string;
    description: string;
    type: string;
    exercises: WorkoutExercise[];
    createdAt: Date;
    updatedAt: Date;
    duration: number;
  }
  
  export interface WorkoutExercise {
    id: number;
    exerciseId: number;
    exercise: Exercise;
    sets: number;
    reps: number;
    restTime: number;
    order: number;
    notes?: string;
  }
  
  export interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    registrationDate: Date;
    avatarUrl?: string;
    plan: string;
    planExpiryDate: Date;
    status: "active" | "inactive" | "pending";
    lastVisit: Date;
    workouts: Workout[];
    assessments: Assessment[];
  }
  
  export interface Assessment {
    id: number;
    studentId: number;
    date: Date;
    weight: number;
    height: number;
    bodyFat: number;
    bmi: number;
    measurements: {
      chest: number;
      waist: number;
      hips: number;
      leftArm: number;
      rightArm: number;
      leftThigh: number;
      rightThigh: number;
    };
    notes: string;
  }
  
  export interface Class {
    id: number;
    title: string;
    description: string;
    date: Date;
    startTime: string;
    endTime: string;
    instructor: string;
    participants: number;
    maxParticipants: number;
    type: string;
    room: string;
  }
  