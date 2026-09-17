import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL||'/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization Bearer token from localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Quotes API
export const submitQuoteApi = (quoteData) => API.post('/quotes', quoteData);
export const fetchQuotesApi = (params) => API.get('/quotes', { params });
export const updateQuoteStatusApi = (id, data) => API.put(`/quotes/${id}`, data);
export const deleteQuoteApi = (id) => API.delete(`/quotes/${id}`);

// Gallery API
export const fetchGalleryApi = (category) => API.get('/gallery', { params: { category } });
export const uploadGalleryItemApi = (formData) =>
  API.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateGalleryItemApi = (id, formData) =>
  API.put(`/gallery/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteGalleryItemApi = (id) => API.delete(`/gallery/${id}`);

// Contact API
export const submitContactApi = (contactData) => API.post('/contact', contactData);
export const fetchContactMessagesApi = () => API.get('/contact');
export const deleteContactMessageApi = (id) => API.delete(`/contact/${id}`);

// Auth API
export const loginAdminApi = (credentials) => API.post('/auth/login', credentials);
export const getAdminProfileApi = () => API.get('/auth/me');
export const logoutAdminApi = () => API.post('/auth/logout');

export default API;
