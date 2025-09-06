// src/store/authStore.js
import { create } from 'zustand';
import axios from '../api/axiosInstance'; 

const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

 

  
  get isAuthenticated() {
    return !!get().user;
  },

  // ——— Helpers ———
  clearError: () => set({ error: null }),



  // Sign up
  register: async (formData) => {
    // formData: { displayName, email, password, ... }
    set({ loading: true, error: null });
    try {
      const res = await axios.post('/auth/register', formData);
      // If your API does NOT auto-login on register, remove the next line
      set({ user: res.data.user || res.data, loading: false });
      return true;
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed';
      set({ error: msg, loading: false });
      return false;
    }
  },

  // Login
  login: async (formData) => {
    // formData: { identifier, password, remember? }
    set({ loading: true, error: null });
    try {
      const res = await axios.post('/auth/login', formData);
      set({ user: res.data.user || res.data, loading: false });
      return res.data;
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed';
      set({ error: msg, loading: false });
      return null;
    }
  },

  // Logout
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axios.post('/auth/logout');
    } catch (err) {
      // ignore server error but still clear client state
    } finally {
      set({
        user: null,
        loading: false,
        error: null,
      
      });
    }
  },


}));

export default useAuthStore;
