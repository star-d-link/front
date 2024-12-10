import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
