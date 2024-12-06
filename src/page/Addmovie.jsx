import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Rating } from "react-simple-star-rating";
import { validateMovieForm } from "../utils/validateMovieForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function Addmovie() {
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

    // Send data to the server
    const response = await fetch(`http://localhost:5000/movies`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    if (response.ok) {
      Swal.fire({
        title: "Movie added successfully!!",
        icon: "success",
        confirmButtonColor: "Ok",
      });
      navigate("/allmovies");
    } else {
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
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-800 sm:text-3xl">
            Add Your Movie
          </h2>
          <p className="mt-2 text-gray-600">
            Nice to meet you! Enter your movie details.
          </p>
        </div>
        <form onSubmit={handleAddMovie} className="mt-6 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-blue-900">
                Movie Poster
              </span>
            </label>
            <input
              type="url"
              name="Photo_URL"
              placeholder="Link to your movie poster"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-blue-900">
                Movie Title
              </span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Movie Title"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <p>Select movie genre</p>
            <Select
              isMulti
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-blue-900">
                Duration
              </span>
            </label>
            <input
              type="number"
              name="duration"
              placeholder="Movie Duration"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-blue-900">Year</span>
            </label>
            <Select
              options={yearOptions}
              value={selectedYear}
              onChange={handleChange}
            />
          </div>
          <div className="form-control flex items-center">
            <label className="label mr-2">
              <span className="label-text font-medium text-blue-900">
                Rating
              </span>
            </label>
            <Rating
              onClick={handleRating}
              initialValue={rating}
              size={30}
              maxRating={10}
            />
            <p className="ml-2">your rating : {rating}</p>
          </div>
          <div className="form-control flex items-center">
            <label className="label mr-2">
              <span className="label-text font-medium text-blue-900">
                Description
              </span>
            </label>
            <textarea
              name="summary"
              placeholder="Description"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addmovie;
