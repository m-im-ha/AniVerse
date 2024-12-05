import { useContext } from "react";
import { MovieContext } from "../provider/Movieprovider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../ui/Loading";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(MovieContext);
  const location = useLocation();

  if (user) return children;

  if (loading) return <Loading />;

  return <Navigate state={location.pathname} to="/login" />;
}

export default PrivateRoute;
