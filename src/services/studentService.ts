import { Student, Assessment } from "@/types";
import * as api from "./api";

const ENDPOINT = "/students";

export async function getAllStudents(): Promise<Student[]> {
  const response = await api.get<Student[]>(ENDPOINT);
  
  if (response.error) {
    console.error("Failed to fetch students:", response.error);
    return [];
  }
  
  return response.data || [];
}

export async function getStudentById(id: number): Promise<Student | null> {
  const response = await api.get<Student>(`${ENDPOINT}/${id}`);
  
  if (response.error) {
    console.error(`Failed to fetch student ${id}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function createStudent(student: Omit<Student, "id" | "registrationDate" | "lastVisit" | "workouts" | "assessments">): Promise<Student | null> {
  const response = await api.post<Student, Omit<Student, "id" | "registrationDate" | "lastVisit" | "workouts" | "assessments">>(ENDPOINT, student);
  
  if (response.error) {
    console.error("Failed to create student:", response.error);
    return null;
  }
  
  return response.data || null;
}

export async function updateStudent(id: number, student: Partial<Student>): Promise<Student | null> {
  const response = await api.put<Student, Partial<Student>>(`${ENDPOINT}/${id}`, student);
  
  if (response.error) {
    console.error(`Failed to update student ${id}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function deleteStudent(id: number): Promise<boolean> {
  const response = await api.del<{ success: boolean }>(`${ENDPOINT}/${id}`);
  
  if (response.error) {
    console.error(`Failed to delete student ${id}:`, response.error);
    return false;
  }
  
  return response.data?.success || false;
}

// Assessment related endpoints
export async function getStudentAssessments(studentId: number): Promise<Assessment[]> {
  const response = await api.get<Assessment[]>(`${ENDPOINT}/${studentId}/assessments`);
  
  if (response.error) {
    console.error(`Failed to fetch assessments for student ${studentId}:`, response.error);
    return [];
  }
  
  return response.data || [];
}

export async function createAssessment(studentId: number, assessment: Omit<Assessment, "id" | "studentId">): Promise<Assessment | null> {
  const response = await api.post<Assessment, Omit<Assessment, "id" | "studentId">>(`${ENDPOINT}/${studentId}/assessments`, assessment);
  
  if (response.error) {
    console.error(`Failed to create assessment for student ${studentId}:`, response.error);
    return null;
  }
  
  return response.data || null;
}
