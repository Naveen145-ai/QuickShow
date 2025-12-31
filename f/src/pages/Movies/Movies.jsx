import React, { useEffect, useState } from "react";
import { Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import "./Movies.css";

export default function Movies() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState(new Set());
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get user email from localStorage
    const email = localStorage.getItem('qs_email');
    setUserEmail(email || '');
    
    let ignore = false;
    
    // Fetch movies
    api
      .listShows()
      .then((data) => {
        if (!ignore) setItems(Array.isArray(data) ? data : []);
      })
      .catch((e) => !ignore && setError(e.message || "Failed to load shows"))
      .finally(() => { if(!ignore) setLoading(false) });
    
    // Fetch user's favorites if logged in
    if (email) {
      api.getFavourites(email)
        .then((response) => {
          if (!ignore && response.success) {
            const favIds = new Set(response.data.map(fav => fav.movie._id));
            setFavourites(favIds);
          }
        })
        .catch((e) => console.error('Failed to load favorites:', e));
    }
    
    return () => {
      ignore = true;
    };
  }, []);

  const handleFavouriteToggle = async (movie, e) => {
    e.stopPropagation(); // Prevent navigation
    
    if (!userEmail) {
      alert('Please login to add favorites');
      return;
    }
    
    const movieId = movie._id;
    const isFavourite = favourites.has(movieId);
    
    try {
      if (isFavourite) {
        // Remove from favorites
        await api.removeFavourite(userEmail, movieId);
        setFavourites(prev => {
          const newSet = new Set(prev);
          newSet.delete(movieId);
          return newSet;
        });
      } else {
        // Add to favorites
        await api.addFavourite(userEmail, {
          _id: movie._id,
          title: movie.title,
          poster: movie.poster,
          price: movie.price,
          rating: movie.rating,
          times: movie.times || []
        });
        setFavourites(prev => new Set([...prev, movieId]));
      }
    } catch (error) {
      console.error('Favourite toggle error:', error);
      alert(error.message || 'Failed to update favorite');
    }
  };

  return (
    <div className="movies-page">
      <h2 className="title">Explore Movies</h2>
      {error && <div style={{textAlign:'center',color:'salmon',marginTop:8}}>{error}</div>}

      <div className="movies-container">
        {loading
          ? Array.from({length: 8}).map((_,i)=> (
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
          : items.map((m, idx) => {
            const isFavourite = favourites.has(m._id);
            return (
              <div className="movie-card" key={m._id || idx}>
                <div className="movie-image-wrapper">
                  <img src={m.poster} alt={m.title} loading="lazy" onError={(e)=>{e.currentTarget.src='https://dummyimage.com/600x900/1a1a1f/ffffff&text=No+Poster'}} />
                  <button 
                    className={`heart-button ${isFavourite ? 'active' : ''}`}
                    onClick={(e) => handleFavouriteToggle(m, e)}
                    title={isFavourite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart size={20} fill={isFavourite ? '#ff4d6d' : 'none'} stroke={isFavourite ? '#ff4d6d' : '#fff'} />
                  </button>
                </div>
                <h3>{m.title}</h3>
                <p>
                  {m.rating ? `${m.rating} • ` : ''}Now Playing
                </p>
                <div className="card-footer">
                  <button onClick={() => navigate("/movie-details", { state: { movie: { title: m.title, img: m.poster, rating: m.rating, times: m.times || [], price: m.price } } })}>
                    Buy Tickets
                  </button>
                  <div className="rating">
                    <Star size={14} className="star-icon" />
                    {m.rating || "—"}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}