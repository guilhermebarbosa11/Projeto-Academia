/**
 * API service for making requests to the backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        error: errorData.message || `Error: ${response.status} ${response.statusText}` 
      };
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function post<T, D = unknown>(endpoint: string, data: D): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        error: errorData.message || `Error: ${response.status} ${response.statusText}` 
      };
    }
    
    const responseData = await response.json();
    return { data: responseData };
  } catch (error) {
    console.error('API request failed:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function put<T, D = unknown>(endpoint: string, data: D): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        error: errorData.message || `Error: ${response.status} ${response.statusText}` 
      };
    }
    
    const responseData = await response.json();
    return { data: responseData };
  } catch (error) {
    console.error('API request failed:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        error: errorData.message || `Error: ${response.status} ${response.statusText}` 
      };
    }
    
    const responseData = await response.json();
    return { data: responseData };
  } catch (error) {
    console.error('API request failed:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}
