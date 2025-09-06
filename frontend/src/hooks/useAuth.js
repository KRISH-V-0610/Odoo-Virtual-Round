// hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';


const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/auth/check-auth');
        
        if (response.data.status === 'success') {
          setIsAuthenticated(response.data.data.isLoggedIn);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setError(error.message);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, loading, error };
};

export default useAuth;