export function validateMovieForm({
  moviePoster,
  title,
  genre,
  duration,
  year,
  movieRating,
  summary,
}) {
  const errors = {};

  // Validate poster URL
  if (!moviePoster) {
    errors.moviePoster = "Movie poster URL is required.";
  } else if (!isValidURL(moviePoster)) {
    errors.moviePoster = "Invalid URL format.";
  }

  // Validate movie title
  if (!title || title.trim().length < 2) {
    errors.title = "Movie title must have at least 2 characters.";
  }

  // Validate duration
  if (!duration || isNaN(duration) || duration <= 60) {
    errors.duration = "Duration must be greater than 60 minutes.";
  }

  // Validate year
  if (!year) {
    errors.year = "Year is required.";
  }

  // Validate rating
  if (!movieRating || movieRating <= 0) {
    errors.movieRating = "Rating is required.";
  }

  // Validate summary
  if (!summary || summary.trim().length < 10) {
    errors.summary = "Summary must have at least 10 characters.";
  }

  // Validate genre
  if (!genre || genre.length === 0) {
    errors.genre = "At least one genre is required.";
  }

  return errors;
}

function isValidURL(url) {
  const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*\.(?:png|jpg|jpeg|gif|webp))$/i;

  return !!urlPattern.test(url);
}
