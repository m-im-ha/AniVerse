import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Rating } from "react-simple-star-rating";
import { validateMovieForm } from "../utils/validateMovieForm";
import { MovieContext } from "../provider/Movieprovider";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

function UpdateMovie() {
  const { allmovies, setAllmovies } = useContext(MovieContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { movie } = location.state || {};

  const [selectedOption, setSelectedOption] = useState(
    movie?.genre.map((g) => ({ value: g, label: g })) || []
  );
  const [selectedYear, setSelectedYear] = useState(
    movie?.year ? { value: movie.year, label: movie.year } : null
  );
  const [rating, setRating] = useState(movie?.movieRating || 0);

  const handleRating = (newRating) => setRating(newRating);

  const yearOptions = Array.from({ length: 30 }, (_, i) => ({
    value: new Date().getFullYear() - i,
    label: new Date().getFullYear() - i,
  }));

  const genreOptions = [
    { value: "Action", label: "Action" },
    { value: "Horror", label: "Horror" },
    { value: "Animation", label: "Animation" },
    { value: "Comedy", label: "Comedy" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Drama", label: "Drama" },
    { value: "Romance", label: "Romance" },
    { value: "Thriller", label: "Thriller" },
  ];

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updatedMovie = {
      moviePoster: form.get("Photo_URL"),
      title: form.get("title"),
      genre: selectedOption.map((opt) => opt.value),
      duration: form.get("duration"),
      year: selectedYear?.value || null,
      movieRating: rating,
      summary: form.get("summary"),
    };

    const validationErrors = validateMovieForm(updatedMovie);
    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach((error) => {
        toast.error(error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
      return;
    }

    try {
      const response = await fetch(
        `https://animated-movieportal-server.vercel.app/movies/${movie._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMovie),
        }
      );

      if (response.ok) {
        const updatedMovieData = await response.json();
        Swal.fire("Movie updated successfully!", "", "success");

        const updatedMovies = allmovies.map((m) =>
          m._id === updatedMovieData._id ? updatedMovieData : m
        );
        setAllmovies(updatedMovies);

        navigate("/allmovies");
      } else {
        toast.error("Failed to update the movie");
      }
    } catch (error) {
      toast.error("An error occurred while updating the movie.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
      <ToastContainer />
      <div className="w-full max-w-2xl rounded-2xl bg-gray-800 p-6 shadow-lg sm:p-8 text-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-gradient bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
            Update Your Movie
          </h2>
          <p className="mt-2 text-gray-300">
            Modify the details of your movie below.
          </p>
        </div>
        <form onSubmit={handleUpdateMovie} className="mt-6 space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">
                Movie Poster
              </span>
            </label>
            <input
              type="url"
              name="Photo_URL"
              placeholder="Link to your movie poster"
              defaultValue={movie?.moviePoster}
              className="input input-bordered w-full bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">
                Movie Title
              </span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Movie Title"
              defaultValue={movie?.title}
              className="input input-bordered w-full bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium text-gray-300">
                Genre
              </span>
            </label>
            <Select
              isMulti
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={genreOptions}
              className="basic-multi-select text-gray-800"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">
                Duration
              </span>
            </label>
            <input
              type="number"
              name="duration"
              placeholder="Duration in minutes"
              defaultValue={movie?.duration}
              className="input input-bordered w-full bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">Year</span>
            </label>
            <Select
              options={yearOptions}
              value={selectedYear}
              onChange={setSelectedYear}
              className="text-gray-800"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">
                Rating
              </span>
            </label>
            <div className="flex items-center gap-4">
              <Rating
                onClick={handleRating}
                initialValue={rating}
                size={30}
                maxRating={10}
                fillColor="gold"
                emptyColor="gray"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">
                Description
              </span>
            </label>
            <textarea
              name="summary"
              placeholder="Description"
              defaultValue={movie?.summary}
              className="textarea textarea-bordered bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500 w-full"
              rows="4"
            ></textarea>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:from-blue-600 hover:to-purple-600 focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300"
            >
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateMovie;
