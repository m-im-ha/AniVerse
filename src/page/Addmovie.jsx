import { useState } from "react";
import Select from "react-select";
import { Rating } from "react-simple-star-rating";

function Addmovie() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [rating, setRating] = useState(0);

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

  function handleAddMovie(e) {
    e.preventDefault();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      {/* <ToastContainer /> */}
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
          {/* Poster URL */}
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
              required
            />
          </div>
          {/* Movie title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-blue-900">
                Movie Title
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Movie Title"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Movie Genre */}
          <div>
            <p>Select movie genre</p>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          {/* Duration */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-blue-900">
                Duration
              </span>
            </label>
            <input
              type="number"
              name="Duration"
              placeholder="Movie Duration"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Date */}
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
          {/* Rating */}
          <div className="form-control flex items-center">
            <label className="label mr-2">
              <span className="label-text font-medium text-blue-900">
                Rating
              </span>
            </label>
            <div className="flex flex-row react-simple-star-rating">
              <Rating
              className="react-simple-star-rating"
                onClick={handleRating}
                initialValue={rating}
                size={30}
              />
            </div>
            <p className="ml-2">your rating : {rating}</p>
          </div>
          {/* Submit */}
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
