import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: (data: { email: string; password: string; name?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getSession: () => api.get('/auth/session'),
};

// Users API
export const usersApi = {
  getMe: () => api.get('/me'),
  updateMe: (data: any) => api.patch('/me', data),
  deleteMe: () => api.delete('/me'),
};

// Habits API
export const habitsApi = {
  getAll: () => api.get('/habits'),
  getOne: (id: string) => api.get(`/habits/${id}`),
  create: (data: any) => api.post('/habits', data),
  update: (id: string, data: any) => api.patch(`/habits/${id}`, data),
  delete: (id: string) => api.delete(`/habits/${id}`),
  getStreak: (id: string) => api.get(`/habits/${id}/streak`),
};

// Logs API
export const logsApi = {
  getAll: (params?: any) => api.get('/logs', { params }),
  create: (data: any) => api.post('/logs', data),
  update: (id: string, data: any) => api.patch(`/logs/${id}`, data),
  delete: (id: string) => api.delete(`/logs/${id}`),
};

// Goals API
export const goalsApi = {
  getAll: () => api.get('/goals'),
  create: (data: any) => api.post('/goals', data),
  update: (id: string, data: any) => api.patch(`/goals/${id}`, data),
  delete: (id: string) => api.delete(`/goals/${id}`),
};

// Analytics API
export const analyticsApi = {
  getWeekly: () => api.get('/analytics/weekly'),
  getMonthly: () => api.get('/analytics/monthly'),
  getHeatmap: () => api.get('/analytics/heatmap'),
};

// Gamification API
export const gamificationApi = {
  getStreaks: () => api.get('/streaks'),
  getBadges: () => api.get('/badges'),
  getLeaderboard: () => api.get('/leaderboard'),
};

// AI API
export const aiApi = {
  getWeeklySummary: () => api.post('/ai/weekly-summary'),
  chat: (prompt: string) => api.post('/ai/coach', { prompt }),
};

// Pomodoro API
export const pomodoroApi = {
  start: (data: any) => api.post('/pomodoro/start', data),
  stop: (data: any) => api.post('/pomodoro/stop', data),
  save: (data: any) => api.post('/pomodoro/save', data),
};
