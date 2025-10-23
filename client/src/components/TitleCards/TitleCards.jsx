import React, { useRef, useEffect } from 'react';
import "./TitleCard.css";
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = React.useState([]);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzVmY2RjZTA5ODAxYzQ5NzUzNWU3NjMzODJiYzZkYiIsIm5iZiI6MTc2MTAzOTE3NS42NTY5OTk4LCJzdWIiOiI2OGY3NTM0NzYxN2RiNDljNzczYTM5ODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.o3exRiz8bcFRZGBe5JodPqFe4jYJCndcBmQStamxbaI'
  }
};


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results || []))
      .catch(err => console.error(err));
  }, [category]);

  useEffect(() => {
    const cardContainer = cardsRef.current;
    if (!cardContainer) return;
    const handleWheel = (e) => {
      e.preventDefault();
      cardContainer.scrollLeft += e.deltaY;
    };
    cardContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => cardContainer.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className='titlecards'>
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card, index) => (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={
                  card.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                    : "https://via.placeholder.com/500x281?text=No+Image"
                }
                alt={card.original_title || card.title}
              />
              <p>{card.original_title || card.title}</p>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
