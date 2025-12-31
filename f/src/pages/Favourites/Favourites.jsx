import React, { useEffect, useState } from "react";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Favourites.css";

export default function Favourites() {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem('qs_email');
    setUserEmail(email || '');
    
    if (email) {
      fetchFavourites(email);
    } else {
      setError('Please login to view your favorites');
      setLoading(false);
    }
  }, []);

  const fetchFavourites = async (email) => {
    try {
      setLoading(true);
      setError('');
      const response = await api.getFavourites(email);
      if (response.success) {
        setFavourites(response.data || []);
      } else {
        setError('Failed to load favorites');
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError(err.message || 'Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavourite = async (movieId, e) => {
    e.stopPropagation();
    
    if (!userEmail) return;
    
    try {
      await api.removeFavourite(userEmail, movieId);
      setFavourites(prev => prev.filter(fav => fav.movie._id !== movieId));
    } catch (error) {
      console.error('Remove favourite error:', error);
      alert(error.message || 'Failed to remove from favorites');
    }
  };

  if (!userEmail) {
    return (
      <div className="favourites-page">
        <h2 className="title">My Favourites</h2>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>
          <p>Please login to view your favorites</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favourites-page">
      <h2 className="title">My Favourites</h2>
      {error && <div style={{textAlign:'center',color:'salmon',marginTop:8}}>{error}</div>}

      <div className="movies-container">
        {loading ? (
          Array.from({length: 4}).map((_,i)=> (
            <div className="movie-card sk" key={i}>
              <div className="sk-img"/>
              <div className="sk-line" style={{width:'80%'}}/>
              <div className="sk-line" style={{width:'60%'}}/>
              <div className="sk-foot">
                <div className="sk-btn"/>
                <div className="sk-badge"/>
              </div>
            </div>
          ))
        ) : favourites.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#aaa' 
          }}>
            <p>No favorites yet. Add movies to your favorites from the Movies page!</p>
          </div>
        ) : (
          favourites.map((fav) => {
            const movie = fav.movie;
            return (
              <div className="movie-card" key={fav._id}>
                <div className="movie-image-wrapper">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    loading="lazy" 
                    onError={(e)=>{e.currentTarget.src='https://dummyimage.com/600x900/1a1a1f/ffffff&text=No+Poster'}} 
                  />
                  <button 
                    className="heart-button active"
                    onClick={(e) => handleRemoveFavourite(movie._id, e)}
                    title="Remove from favorites"
                  >
                    <Heart size={20} fill="#ff4d6d" stroke="#ff4d6d" />
                  </button>
                </div>
                <h3>{movie.title}</h3>
                <p>
                  {movie.rating ? `${movie.rating} • ` : ''}Now Playing
                </p>
                <div className="card-footer">
                  <button onClick={() => navigate("/movie-details", { state: { movie: { title: movie.title, img: movie.poster, rating: movie.rating, times: movie.times || [], price: movie.price } } })}>
                    Buy Tickets
                  </button>
                  <div className="rating">
                    <Star size={14} className="star-icon" />
                    {movie.rating || "—"}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

