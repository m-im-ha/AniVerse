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
import MovieDetails from "../components/MovieDetails";
import PrivateRoute from "./PrivateRoute";
import UpdateMovie from "../page/UpdateMovie";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch(`https://animated-movieportal-server.vercel.app/features`),
      },
      {
        path: "/allmovies",
        element: <AllMovies />,
        loader: () =>
          fetch(`https://animated-movieportal-server.vercel.app/movies`),
      },
      {
        path: "/movieDetails/:id",
        element: (
          <PrivateRoute>
            <MovieDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://animated-movieportal-server.vercel.app/movies/${params.id}`
          ),
      },
      {
        path: "/deals",
        element: <Deals />,
      },
      {
        path: "/favoritemovies",
        element: (
          <PrivateRoute>
            <Favoritemovies />
          </PrivateRoute>
        ),
      },
      {
        path: "/addmovie",
        element: (
          <PrivateRoute>
            <Addmovie />
          </PrivateRoute>
        ),
      },
      {
        path: "/updatemovie",
        element: (
          <PrivateRoute>
            <UpdateMovie />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
