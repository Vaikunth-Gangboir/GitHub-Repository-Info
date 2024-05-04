import { Navigate } from 'react-router-dom';
import { useOctokitContext } from '../Context/OctokitContext';

function ProtectedRoute({ children }) {
  const { userData } = useOctokitContext();

  if (!userData.login) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
