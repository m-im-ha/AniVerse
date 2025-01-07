import { useContext } from "react";
import { MovieContext } from "../provider/Movieprovider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../ui/Loading";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(MovieContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login" />;
  }

  return children;
}

export default PrivateRoute;
