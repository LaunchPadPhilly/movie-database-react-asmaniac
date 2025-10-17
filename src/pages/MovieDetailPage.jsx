import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { useFavorites } from '../hooks/useFavorites';
import LoadingSpinner from '../components/LoadingSpinner';
import FavoriteButton from '../components/FavoriteButton';
import '../styles/MovieDetailPage.css'; // import the new CSS

export default function MovieDetailPage() {
  const { imdbID } = useParams();
  const { data: movie, isLoading, error } = useMovieDetail(imdbID);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleFavoriteToggle = () => {
    if (!movie) return;
    
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie.imdbID);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !movie) {
    return (
      <div className="movie-detail-error">
        <div className="emoji">😕</div>
        <h2 className="error-title">Movie not found</h2>
        <p className="error-text">
          The movie you're looking for could not be loaded.
        </p>
        <Link to="/" className="back-link">
          <ArrowLeftIcon />
          Back to Search
        </Link>
      </div>
    );
  }

  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : null;

  return (
    <div className="movie-detail-page">
      <Link to="/" className="back-link">
        <ArrowLeftIcon />
        Back to Search
      </Link>

      <div className="movie-detail-card">
        <div className="movie-detail-flex">
          <div className="movie-poster-wrapper">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`${movie.Title} poster`}
                className="movie-poster"
              />
            ) : (
              <div className="movie-poster-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🎬</div>
                  <div>No Poster Available</div>
                </div>
              </div>
            )}
          </div>

          <div className="movie-info-wrapper">
            <div className="title-favorite-row">
              <div>
                <h1 className="movie-title">{movie.Title}</h1>
                <p className="movie-meta">
                  {movie.Year} • {movie.Type} • {movie.Rated}
                </p>
              </div>
              <FavoriteButton
                isFavorite={isFavorite(movie.imdbID)}
                onToggle={handleFavoriteToggle}
              />
            </div>

            {movie.Plot && (
              <div className="movie-plot">
                <h2>Plot</h2>
                <p>{movie.Plot}</p>
              </div>
            )}

            <div className="movie-meta-grid">
              {movie.Director && <div><span>Director:</span> <span>{movie.Director}</span></div>}
              {movie.Actors && <div><span>Cast:</span> <span>{movie.Actors}</span></div>}
              {movie.Genre && <div><span>Genre:</span> <span>{movie.Genre}</span></div>}
              {movie.Runtime && <div><span>Runtime:</span> <span>{movie.Runtime}</span></div>}
              {movie.Released && <div><span>Released:</span> <span>{movie.Released}</span></div>}
              {movie.Language && <div><span>Language:</span> <span>{movie.Language}</span></div>}
            </div>

            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="movie-ratings">
                <h3>Ratings</h3>
                <div>
                  {movie.Ratings.map((rating, index) => (
                    <div key={index} className="rating-row">
                      <span>{rating.Source}:</span>
                      <span>{rating.Value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
