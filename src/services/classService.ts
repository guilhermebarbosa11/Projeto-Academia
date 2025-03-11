import { Class } from "@/types";
import * as api from "./api";

const ENDPOINT = "/classes";

export async function getAllClasses(): Promise<Class[]> {
  const response = await api.get<Class[]>(ENDPOINT);
  
  if (response.error) {
    console.error("Failed to fetch classes:", response.error);
    return [];
  }
  
  return response.data || [];
}

export async function getClassById(id: number): Promise<Class | null> {
  const response = await api.get<Class>(`${ENDPOINT}/${id}`);
  
  if (response.error) {
    console.error(`Failed to fetch class ${id}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function createClass(classData: Omit<Class, "id">): Promise<Class | null> {
  const response = await api.post<Class, Omit<Class, "id">>(ENDPOINT, classData);
  
  if (response.error) {
    console.error("Failed to create class:", response.error);
    return null;
  }
  
  return response.data || null;
}

export async function updateClass(id: number, classData: Partial<Class>): Promise<Class | null> {
  const response = await api.put<Class, Partial<Class>>(`${ENDPOINT}/${id}`, classData);
  
  if (response.error) {
    console.error(`Failed to update class ${id}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function deleteClass(id: number): Promise<boolean> {
  const response = await api.del<{ success: boolean }>(`${ENDPOINT}/${id}`);
  
  if (response.error) {
    console.error(`Failed to delete class ${id}:`, response.error);
    return false;
  }
  
  return response.data?.success || false;
}

export async function registerForClass(classId: number, studentId: number): Promise<boolean> {
  const response = await api.post<{ success: boolean }, { studentId: number }>(`${ENDPOINT}/${classId}/register`, { studentId });
  
  if (response.error) {
    console.error(`Failed to register student ${studentId} for class ${classId}:`, response.error);
    return false;
  }
  
  return response.data?.success || false;
}

export async function cancelClassRegistration(classId: number, studentId: number): Promise<boolean> {
  const response = await api.post<{ success: boolean }, { studentId: number }>(`${ENDPOINT}/${classId}/cancel`, { studentId });
  
  if (response.error) {
    console.error(`Failed to cancel registration for student ${studentId} in class ${classId}:`, response.error);
    return false;
  }
  
  return response.data?.success || false;
}
