import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';
const api = axios.create({ baseURL: API_BASE });

export const listNotes = () => api.get('/notes');
export const createNote = (data) => api.post('/notes', data);
export const updateNote = (id, data) => api.put(`/notes/${id}`, data);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
export const getSharedNote = (publicId) => api.get(`/share/${publicId}`);

export default api;
