import { createBrowserRouter } from "react-router-dom";
import Applayout from "../layout/Applayout";
import Home from "../components/Home";
import AllMovies from "../components/AllMovies";
import Favoritemovies from "../components/Favoritemovies";
import Addmovie from "../page/Addmovie";
import Login from "../page/Login";
import Register from "../page/Register";
import Deals from "../components/Deals";
import ErrorPage from "../page/ErrorPage";
import UserProfile from "../components/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allmovies",
        element: <AllMovies />,
      },
      {
        path: "/deals",
        element: <Deals />,
      },
      {
        path: "/favoritemovies",
        element: <Favoritemovies />,
      },
      {
        path: "/addmovie",
        element: <Addmovie />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/userProfile",
        element: <UserProfile/>,
      },
    ],
  },
]);
