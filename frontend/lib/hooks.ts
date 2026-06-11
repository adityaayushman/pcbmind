"""React hooks for data fetching"""

import { useState, useCallback } from "react";
import { authAPI, inspectionAPI, dashboardAPI } from "./api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authAPI.login(email, password);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, fullName: string) => {
      setLoading(true);
      try {
        const response = await authAPI.register(email, password, fullName);
        setUser(response.data);
        return response.data;
      } catch (err: any) {
        setError(err.response?.data?.detail || "Registration failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { user, loading, error, login, register };
};

export const useDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await dashboardAPI.getMetrics();
      setMetrics(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { metrics, loading, error, fetchMetrics };
};

export const useInspections = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInspections = useCallback(async () => {
    setLoading(true);
    try {
      const response = await inspectionAPI.listInspections();
      setInspections(response.data.items);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const upload = useCallback(async (file: File) => {
    setLoading(true);
    try {
      const response = await inspectionAPI.uploadImage(file);
      return response.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { inspections, loading, error, fetchInspections, upload };
};
