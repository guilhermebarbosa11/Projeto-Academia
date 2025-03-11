import { Workout } from "@/types";
import * as api from "./api";

const ENDPOINT = "/workouts";

export async function getAllWorkouts(): Promise<Workout[]> {
  const response = await api.get<Workout[]>(ENDPOINT);
  
  if (response.error) {
    console.error("Failed to fetch workouts:", response.error);
    return [];
  }
  
  return response.data || [];
}

export async function getWorkoutById(id: number): Promise<Workout | null> {
  const response = await api.get<Workout>(`${ENDPOINT}/${id}`);
  
  if (response.error) {
    console.error(`Failed to fetch workout ${id}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function createWorkout(workout: Omit<Workout, "id" | "createdAt" | "updatedAt">): Promise<Workout | null> {
  const response = await api.post<Workout, Omit<Workout, "id" | "createdAt" | "updatedAt">>(ENDPOINT, workout);
  
  if (response.error) {
    console.error("Failed to create workout:", response.error);
    return null;
  }
  
  return response.data || null;
}

export async function updateWorkout(id: number, workout: Partial<Workout>): Promise<Workout | null> {
  const response = await api.put<Workout, Partial<Workout>>(`${ENDPOINT}/${id}`, workout);
  
  if (response.error) {
    console.error(`Failed to update workout ${id}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function deleteWorkout(id: number): Promise<boolean> {
  const response = await api.del<{ success: boolean }>(`${ENDPOINT}/${id}`);
  
  if (response.error) {
    console.error(`Failed to delete workout ${id}:`, response.error);
    return false;
  }
  
  return response.data?.success || false;
}
