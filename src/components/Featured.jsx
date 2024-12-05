function Featured({featuresMovieData}) {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-center text-3xl font-bold text-blue-800 mb-6">
        Feature Movies
      </h1>
      {/* 3-Column Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {featuresMovieData.map((movie) => (
          <div
            key={movie._id}
            className="bg-white rounded-lg shadow-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
          >
            {/* Movie Poster */}
            <div>
              <img
                src={movie.moviePoster}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-lg bg-gray-200"
              />
            </div>
            {/* Movie Details */}
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {movie.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Genre:</span>{" "}
                {movie.genre.join(", ")}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Year:</span> {movie.year}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Duration:</span>{" "}
                {movie.duration} mins
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Rating:</span>{" "}
                {movie.movieRating}⭐
              </p>
              <button className="mt-auto self-start rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600">
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}

export default Featured