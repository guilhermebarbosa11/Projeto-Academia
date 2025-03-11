import { Exercise } from "@/types";
import * as api from "./api";

const ENDPOINT = "/exercises";

export async function getAllExercises(): Promise<Exercise[]> {
  const response = await api.get<Exercise[]>(ENDPOINT);
  
  if (response.error) {
    console.error("Failed to fetch exercises:", response.error);
    // Return mock data for now, will be replaced with API data later
    return [];
  }
  
  return response.data || [];
}

export async function getExerciseById(id: number): Promise<Exercise | null> {
  const response = await api.get<Exercise>(`${ENDPOINT}/${id}`);
  
  if (response.error) {
    console.error(`Failed to fetch exercise ${id}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function createExercise(exercise: Omit<Exercise, "id">): Promise<Exercise | null> {
  const response = await api.post<Exercise, Omit<Exercise, "id">>(ENDPOINT, exercise);
  
  if (response.error) {
    console.error("Failed to create exercise:", response.error);
    return null;
  }
  
  return response.data || null;
}

export async function updateExercise(id: number, exercise: Partial<Exercise>): Promise<Exercise | null> {
  const response = await api.put<Exercise, Partial<Exercise>>(`${ENDPOINT}/${id}`, exercise);
  
  if (response.error) {
    console.error(`Failed to update exercise ${id}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function deleteExercise(id: number): Promise<boolean> {
  const response = await api.del<{ success: boolean }>(`${ENDPOINT}/${id}`);
  
  if (response.error) {
    console.error(`Failed to delete exercise ${id}:`, response.error);
    return false;
  }
  
  return response.data?.success || false;
}
