import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Rating } from "react-simple-star-rating";
import { validateMovieForm } from "../utils/validateMovieForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { MovieContext } from "../provider/Movieprovider";
import { useTheme } from "../provider/ThemeProvider";

function AddMovie() {
  const { theme } = useTheme();
  const { user, allmovies, setAllmovies } = useContext(MovieContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  function handleRating(newRating) {
    setRating(newRating);
  }

  const handleChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

   const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);
  const yearOptions = years.map((year) => ({ value: year, label: year }));
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

  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: theme === 'dark' ? '#1e293b' : 'white',
      borderColor: theme === 'dark' ? '#3f445180' : '#e2e8f0',
      '&:hover': {
        borderColor: theme === 'dark' ? '#6b21a8' : '#14b8a6'
      }
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused 
        ? theme === 'dark' ? '#3f445180' : '#e2e8f0' 
        : theme === 'dark' ? '#1e293b' : 'white',
      color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
      ':active': {
        backgroundColor: theme === 'dark' ? '#6b21a8' : '#14b8a6'
      }
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: theme === 'dark' ? '#1e293b' : 'white'
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: theme === 'dark' ? '#3f445180' : '#e2e8f0'
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: theme === 'dark' ? '#e2e8f0' : '#1e293b'
    })
  };

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
    <div className={`min-h-screen py-16 px-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-black via-slate-900 to-black'
        : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
    }`}>
      <ToastContainer />
      
      <div className="container mx-auto max-w-4xl">
        <div className={`rounded-2xl overflow-hidden shadow-xl ${
          theme === 'dark'
            ? 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50'
            : 'bg-white/80 backdrop-blur-sm border border-slate-200/50'
        }`}>
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-extrabold font-mont mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Add New <span className={theme === 'dark' ? 'text-purple-400' : 'text-teal-500'}>Movie</span>
              </h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-mont`}>
                Share your favorite animated movies with others
              </p>
            </div>

            <form onSubmit={handleAddMovie} className="space-y-6">
              {/* Two-Column Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Movie Poster */}
                <div className="form-control">
                  <label className={`block mb-2 font-medium font-mont ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Movie Poster URL
                  </label>
                  <input
                    type="url"
                    name="Photo_URL"
                    placeholder="Enter poster URL"
                    className={`w-full px-4 py-3 rounded-xl font-mont transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-slate-900/50 border border-slate-700 text-white placeholder-gray-400 focus:border-purple-500'
                        : 'bg-white border border-slate-200 text-gray-900 placeholder-gray-500 focus:border-teal-500'
                    }`}
                    required
                  />
                </div>

                {/* Movie Title */}
                <div className="form-control">
                  <label className={`block mb-2 font-medium font-mont ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Movie Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter movie title"
                    className={`w-full px-4 py-3 rounded-xl font-mont transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-slate-900/50 border border-slate-700 text-white placeholder-gray-400 focus:border-purple-500'
                        : 'bg-white border border-slate-200 text-gray-900 placeholder-gray-500 focus:border-teal-500'
                    }`}
                    required
                  />
                </div>

                {/* Genre Select */}
                <div className="form-control">
                  <label className={`block mb-2 font-medium font-mont ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Genre
                  </label>
                  <Select
                    isMulti
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    styles={customSelectStyles}
                    className="font-mont"
                  />
                </div>

                {/* Duration */}
                <div className="form-control">
                  <label className={`block mb-2 font-medium font-mont ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    placeholder="Enter duration"
                    className={`w-full px-4 py-3 rounded-xl font-mont transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-slate-900/50 border border-slate-700 text-white placeholder-gray-400 focus:border-purple-500'
                        : 'bg-white border border-slate-200 text-gray-900 placeholder-gray-500 focus:border-teal-500'
                    }`}
                    required
                  />
                </div>

                {/* Year Select */}
                <div className="form-control">
                  <label className={`block mb-2 font-medium font-mont ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Release Year
                  </label>
                  <Select
                    options={yearOptions}
                    value={selectedYear}
                    onChange={handleChange}
                    styles={customSelectStyles}
                    className="font-mont"
                  />
                </div>

                {/* Rating */}
                <div className="form-control">
                  <label className={`block mb-2 font-medium font-mont ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Rating
                  </label>
                  <div className="flex items-center h-[42px]">
                    <Rating
                      onClick={handleRating}
                      ratingValue={rating}
                      size={25}
                      maxRating={5}
                      fillColor={theme === 'dark' ? '#c084fc' : '#14b8a6'}
                      emptyColor={theme === 'dark' ? '#334155' : '#e2e8f0'}
                    />
                  </div>
                </div>
              </div>

              {/* Full-width Description */}
              <div className="form-control">
                <label className={`block mb-2 font-medium font-mont ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Movie Description
                </label>
                <textarea
                  name="summary"
                  placeholder="Enter movie description"
                  rows="4"
                  className={`w-full px-4 py-3 rounded-xl font-mont transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-900/50 border border-slate-700 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-slate-200 text-gray-900 placeholder-gray-500 focus:border-teal-500'
                  }`}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-mont text-white font-semibold
                transition-all duration-300 transform hover:scale-[1.02] active:scale-98 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
                    : 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800'
                }`}
              >
                Add Movie
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
