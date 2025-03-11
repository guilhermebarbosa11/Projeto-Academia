import { exercises, students, workouts } from "./mockData";
import { Class, Exercise, Student, Workout } from "@/types";

// This file simulates a backend API for development purposes
// It will be replaced with actual API calls when the Flask backend is ready

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock classes data
const classes: Class[] = [
  {
    id: 1,
    title: "Musculação Avançada",
    description: "Treino intenso focado em hipertrofia para alunos avançados",
    date: new Date(),
    startTime: "07:00",
    endTime: "08:30",
    instructor: "Carlos Silva",
    participants: 12,
    maxParticipants: 15,
    type: "Musculação",
    room: "Sala de Musculação 1"
  },
  {
    id: 2,
    title: "Spinning",
    description: "Aula de ciclismo indoor com alta queima calórica",
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
    description: "Relaxamento e alongamento para todos os níveis",
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
];

export const mockApi = {
  // Exercise API
  getExercises: async (): Promise<Exercise[]> => {
    await delay(500); // Simulate network latency
    return exercises;
  },
  
  getExerciseById: async (id: number): Promise<Exercise | null> => {
    await delay(300);
    return exercises.find(exercise => exercise.id === id) || null;
  },
  
  createExercise: async (exercise: Omit<Exercise, "id">): Promise<Exercise> => {
    await delay(500);
    const newExercise = {
      ...exercise,
      id: Math.max(...exercises.map(e => e.id), 0) + 1
    };
    exercises.push(newExercise);
    return newExercise;
  },
  
  updateExercise: async (id: number, data: Partial<Exercise>): Promise<Exercise | null> => {
    await delay(500);
    const index = exercises.findIndex(exercise => exercise.id === id);
    if (index === -1) return null;
    
    const updatedExercise = { ...exercises[index], ...data };
    exercises[index] = updatedExercise;
    return updatedExercise;
  },
  
  deleteExercise: async (id: number): Promise<boolean> => {
    await delay(500);
    const index = exercises.findIndex(exercise => exercise.id === id);
    if (index === -1) return false;
    
    exercises.splice(index, 1);
    return true;
  },
  
  // Student API
  getStudents: async (): Promise<Student[]> => {
    await delay(500);
    return students;
  },
  
  getStudentById: async (id: number): Promise<Student | null> => {
    await delay(300);
    return students.find(student => student.id === id) || null;
  },
  
  createStudent: async (student: Omit<Student, "id" | "registrationDate" | "lastVisit" | "workouts" | "assessments">): Promise<Student> => {
    await delay(500);
    const newStudent: Student = {
      ...student,
      id: Math.max(...students.map(s => s.id), 0) + 1,
      registrationDate: new Date(),
      lastVisit: new Date(),
      workouts: [],
      assessments: []
    };
    students.push(newStudent);
    return newStudent;
  },
  
  updateStudent: async (id: number, data: Partial<Student>): Promise<Student | null> => {
    await delay(500);
    const index = students.findIndex(student => student.id === id);
    if (index === -1) return null;
    
    const updatedStudent = { ...students[index], ...data };
    students[index] = updatedStudent;
    return updatedStudent;
  },
  
  deleteStudent: async (id: number): Promise<boolean> => {
    await delay(500);
    const index = students.findIndex(student => student.id === id);
    if (index === -1) return false;
    
    students.splice(index, 1);
    return true;
  },
  
  // Workout API
  getWorkouts: async (): Promise<Workout[]> => {
    await delay(500);
    return workouts;
  },
  
  getWorkoutById: async (id: number): Promise<Workout | null> => {
    await delay(300);
    return workouts.find(workout => workout.id === id) || null;
  },
  
  createWorkout: async (workout: Omit<Workout, "id" | "createdAt" | "updatedAt">): Promise<Workout> => {
    await delay(500);
    const now = new Date();
    const newWorkout: Workout = {
      ...workout,
      id: Math.max(...workouts.map(w => w.id), 0) + 1,
      createdAt: now,
      updatedAt: now
    };
    workouts.push(newWorkout);
    return newWorkout;
  },
  
  updateWorkout: async (id: number, data: Partial<Workout>): Promise<Workout | null> => {
    await delay(500);
    const index = workouts.findIndex(workout => workout.id === id);
    if (index === -1) return null;
    
    const updatedWorkout = { ...workouts[index], ...data, updatedAt: new Date() };
    workouts[index] = updatedWorkout;
    return updatedWorkout;
  },
  
  deleteWorkout: async (id: number): Promise<boolean> => {
    await delay(500);
    const index = workouts.findIndex(workout => workout.id === id);
    if (index === -1) return false;
    
    workouts.splice(index, 1);
    return true;
  },
  
  // Class API
  getClasses: async (): Promise<Class[]> => {
    await delay(500);
    return classes;
  },
  
  getClassById: async (id: number): Promise<Class | null> => {
    await delay(300);
    return classes.find(cls => cls.id === id) || null;
  },
  
  createClass: async (classData: Omit<Class, "id">): Promise<Class> => {
    await delay(500);
    const newClass: Class = {
      ...classData,
      id: Math.max(...classes.map(c => c.id), 0) + 1
    };
    classes.push(newClass);
    return newClass;
  },
  
  updateClass: async (id: number, data: Partial<Class>): Promise<Class | null> => {
    await delay(500);
    const index = classes.findIndex(cls => cls.id === id);
    if (index === -1) return null;
    
    const updatedClass = { ...classes[index], ...data };
    classes[index] = updatedClass;
    return updatedClass;
  },
  
  deleteClass: async (id: number): Promise<boolean> => {
    await delay(500);
    const index = classes.findIndex(cls => cls.id === id);
    if (index === -1) return false;
    
    classes.splice(index, 1);
    return true;
  }
};
