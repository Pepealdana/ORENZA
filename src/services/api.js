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
  requestPasswordReset: (payload) => request('/auth/request-password-reset', {
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
  getCheckIn: (id) => request(`/student/check-ins/${id}`),
  createCheckIn: (payload) => request('/student/check-ins', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateCheckIn: (id, payload) => request(`/student/check-ins/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  deleteCheckIn: (id) => request(`/student/check-ins/${id}`, {
    method: 'DELETE',
  }),
  // Alias de compatibilidad con el frontend existente.
  saveCheckIn: (payload) => request('/student/check-ins', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  getActivities: (params = {}) => request(`/activities?${new URLSearchParams(params).toString()}`),
  getActivity: (id) => request(`/activities/${id}`),
  createActivity: (payload) => request('/activities', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateActivity: (id, payload) => request(`/activities/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  deleteActivity: (id) => request(`/activities/${id}`, {
    method: 'DELETE',
  }),

  getActivityProgress: () => request('/student/activities/progress'),
  getActivityProgressById: (activityId) => request(`/student/activities/progress/${activityId}`),
  createActivityProgress: (payload) => request('/student/activities/progress', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateActivityProgress: (activityId, payload) => request(`/student/activities/progress/${activityId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  deleteActivityProgress: (activityId) => request(`/student/activities/progress/${activityId}`, {
    method: 'DELETE',
  }),
  // Alias de compatibilidad con el frontend existente.
  saveActivityProgress: (payload) => request('/student/activities/progress', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  getAdminStats: () => request('/admin/stats'),
  getAdminUsers: (params = {}) => request(`/admin/users?${new URLSearchParams(params).toString()}`),
  createAdminUser: (payload) => request('/admin/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateAdminUser: (id, payload) => request(`/admin/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  deleteAdminUser: (id) => request(`/admin/users/${id}`, {
    method: 'DELETE',
  }),
  getAdminInstitutions: (params = {}) => request(`/admin/institutions?${new URLSearchParams(params).toString()}`),
  createAdminInstitution: (payload) => request('/admin/institutions', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateAdminInstitution: (id, payload) => request(`/admin/institutions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }),
  deleteAdminInstitution: (id) => request(`/admin/institutions/${id}`, { method: 'DELETE' }),
  getAdminAuditLogs: (params = {}) => request(`/admin/audit-logs?${new URLSearchParams(params).toString()}`),

  getCounselorOverview: () => request('/counselor/overview'),
  getCounselorStudent: (studentId) => request(`/counselor/students/${studentId}`),
  getCounselorStudentCheckIns: (studentId) => request(`/counselor/students/${studentId}/check-ins`),
  getCounselorStudentActivities: (studentId) => request(`/counselor/students/${studentId}/activity-progress`),
};

export { API_URL };
