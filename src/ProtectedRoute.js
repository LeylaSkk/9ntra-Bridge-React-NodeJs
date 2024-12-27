import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Add your authentication logic here
  const isAuthenticated = true; // Replace with actual auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};