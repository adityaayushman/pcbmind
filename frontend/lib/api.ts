import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth
export const authAPI = {
  register: (email: string, password: string, fullName: string) =>
    apiClient.post("/api/auth/register", { email, password, full_name: fullName }),
  login: (email: string, password: string) =>
    apiClient.post("/api/auth/login", { email, password }),
  getMe: () => apiClient.get("/api/auth/me"),
};

// Inspections
export const inspectionAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post("/api/inspections/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  runInspection: (data: any) =>
    apiClient.post("/api/inspections/inspect", data),
  getInspection: (id: number) =>
    apiClient.get(`/api/inspections/${id}`),
  listInspections: (skip: number = 0, limit: number = 10) =>
    apiClient.get("/api/inspections/", { params: { skip, limit } }),
};

// Dashboard
export const dashboardAPI = {
  getMetrics: () => apiClient.get("/api/dashboard/metrics"),
  getTrends: (days: number = 7) =>
    apiClient.get("/api/dashboard/trends", { params: { days } }),
  getOverview: () => apiClient.get("/api/dashboard/overview"),
};

// Agents
export const agentAPI = {
  getAgents: (inspectionId: number) =>
    apiClient.get(`/api/agents/${inspectionId}`),
  runAgents: (inspectionId: number) =>
    apiClient.post(`/api/agents/${inspectionId}/run`),
};

// Predictions
export const predictionAPI = {
  getPredictions: (inspectionId: number) =>
    apiClient.get(`/api/predictions/${inspectionId}`),
  generatePredictions: (inspectionId: number) =>
    apiClient.post(`/api/predictions/${inspectionId}/generate`),
};

// Reports
export const reportAPI = {
  generateReport: (inspectionId: number, reportType: string) =>
    apiClient.post("/api/reports/generate", {
      inspection_id: inspectionId,
      report_type: reportType,
    }),
  getReport: (reportId: number) =>
    apiClient.get(`/api/reports/${reportId}`),
};

export default apiClient;
