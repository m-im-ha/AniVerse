import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Rating } from "react-simple-star-rating";
import { validateMovieForm } from "../utils/validateMovieForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { MovieContext } from "../provider/Movieprovider";

function AddMovie() {
  const { user, allmovies, setAllmovies } = useContext(MovieContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  function handleRating(newRating) {
    setRating(newRating);
  }

  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );
  const yearOptions = years.map((year) => ({ value: year, label: year }));

  const handleChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const options = [
    { value: "Action", label: "Action" },
    { value: "Horror", label: "Horror" },
    { value: "Animation", label: "Animation" },
    { value: "Comedy", label: "Comedy" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Drama", label: "Drama" },
    { value: "Romance", label: "Romance" },
    { value: "Thriller", label: "Thriller" },
  ];

  async function handleAddMovie(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const moviePoster = form.get("Photo_URL");
    const title = form.get("title");
    const genre = selectedOption ? selectedOption.map((opt) => opt.value) : [];
    const duration = form.get("duration");
    const year = selectedYear ? selectedYear.value : null;
    const movieRating = rating;
    const summary = form.get("summary");
  
    const movie = {
      useremail: user.email,
      moviePoster,
      title,
      genre,
      duration,
      year,
      movieRating,
      summary,
    };
  
    // Validate the form
    const validationErrors = validateMovieForm(movie);
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
      // Send data to the server
      const response = await fetch(
        `https://animated-movieportal-server.vercel.app/movies`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(movie),
        }
      );
  
      if (response.ok) {
        const newMovie = await response.json(); 
        setAllmovies((prevMovies) => [...prevMovies, newMovie]); 
  
        Swal.fire({
          title: "Movie added successfully!!",
          icon: "success",
          confirmButtonColor: "Ok",
        });
  
        navigate("/allmovies");
      } else {
        toast.error("Failed to add movie", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("An error occurred while adding the movie.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
      <ToastContainer />
      <div className="w-full max-w-2xl rounded-2xl bg-gray-800 p-6 shadow-lg sm:p-8 text-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-gradient bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
            Add Your Movie
          </h2>
          <p className="mt-2 text-gray-300">
            Enter your movie details below to share it.
          </p>
        </div>
        <form onSubmit={handleAddMovie} className="mt-6 space-y-6">
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
              className="input input-bordered w-full bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
              required
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
              className="input input-bordered w-full bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
              required
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
              options={options}
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
              className="input input-bordered w-full bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">Year</span>
            </label>
            <Select
              options={yearOptions}
              value={selectedYear}
              onChange={handleChange}
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
                ratingValue={rating}
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
              className="textarea textarea-bordered bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500 w-full"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:from-blue-600 hover:to-purple-600 focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
