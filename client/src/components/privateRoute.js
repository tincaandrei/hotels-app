import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const { auth } = useSelector((state) => state);

  // If user is not logged in, redirect to /login
  if (!auth || !auth.token) {
    return <Navigate to="/login" />;
  }

  
  return children;
}

export default PrivateRoute;



