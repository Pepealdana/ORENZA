const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const { headers = {}, ...config } = options;
  const token = localStorage.getItem('orenza_token');

  const response = await fetch(`${API_URL}${path}`, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'No fue posible completar la solicitud.');
    error.status = response.status;
    throw error;
  }

  return data;
}

export const api = {
  register: (payload) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  login: (payload) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  resetPassword: (payload) => request('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  changePassword: (payload) => request('/auth/change-password', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  me: () => request('/auth/me'),
  getProfile: () => request('/student/profile'),
  updateProfile: (payload) => request('/student/profile', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  getCheckIns: () => request('/student/check-ins'),
  saveCheckIn: (payload) => request('/student/check-ins', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getActivityProgress: () => request('/student/activities/progress'),
  saveActivityProgress: (payload) => request('/student/activities/progress', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getAdminStats: () => request('/admin/stats'),
  getAdminUsers: () => request('/admin/users'),
  createAdminUser: (payload) => request('/admin/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateAdminUser: (id, payload) => request(`/admin/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  getCounselorOverview: () => request('/counselor/overview'),
};

export { API_URL };
