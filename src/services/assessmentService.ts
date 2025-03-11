import { Assessment } from "@/types";
import * as api from "./api";

const BASE_ENDPOINT = "/students";

export async function getStudentAssessments(studentId: number): Promise<Assessment[]> {
  const response = await api.get<Assessment[]>(`${BASE_ENDPOINT}/${studentId}/assessments`);
  
  if (response.error) {
    console.error(`Failed to fetch assessments for student ${studentId}:`, response.error);
    return [];
  }
  
  return response.data || [];
}

export async function getAssessmentById(studentId: number, assessmentId: number): Promise<Assessment | null> {
  const response = await api.get<Assessment>(`${BASE_ENDPOINT}/${studentId}/assessments/${assessmentId}`);
  
  if (response.error) {
    console.error(`Failed to fetch assessment ${assessmentId}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function getLatestAssessment(studentId: number): Promise<Assessment | null> {
  const response = await api.get<Assessment>(`${BASE_ENDPOINT}/${studentId}/assessments/latest`);
  
  if (response.error) {
    console.error(`Failed to fetch latest assessment for student ${studentId}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function createAssessment(studentId: number, assessmentData: Omit<Assessment, "id">): Promise<Assessment | null> {
  const response = await api.post<Assessment, Omit<Assessment, "id">>(`${BASE_ENDPOINT}/${studentId}/assessments`, assessmentData);
  
  if (response.error) {
    console.error(`Failed to create assessment for student ${studentId}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function updateAssessment(studentId: number, assessmentId: number, assessmentData: Partial<Assessment>): Promise<Assessment | null> {
  const response = await api.put<Assessment, Partial<Assessment>>(
    `${BASE_ENDPOINT}/${studentId}/assessments/${assessmentId}`, 
    assessmentData
  );
  
  if (response.error) {
    console.error(`Failed to update assessment ${assessmentId}:`, response.error);
    return null;
  }
  
  return response.data || null;
}

export async function deleteAssessment(studentId: number, assessmentId: number): Promise<boolean> {
  const response = await api.del<{ success: boolean }>(`${BASE_ENDPOINT}/${studentId}/assessments/${assessmentId}`);
  
  if (response.error) {
    console.error(`Failed to delete assessment ${assessmentId}:`, response.error);
    return false;
  }
  
  return response.data?.success || false;
}

export async function getAssessmentMetrics(): Promise<{ 
  totalAssessments: number; 
  studentsWithAssessments: number;
  averageBmi: number | null;
  averageBodyFat: number | null;
} | null> {
  const response = await api.get<{
    totalAssessments: number;
    studentsWithAssessments: number;
    averageBmi: number | null;
    averageBodyFat: number | null;
  }>(`/assessments/metrics`);
  
  if (response.error) {
    console.error("Failed to fetch assessment metrics:", response.error);
    return null;
  }
  
  return response.data || null;
}
