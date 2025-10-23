import React, { useEffect, useState } from 'react';
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useParams } from 'react-router-dom';
import Home from '../Home/Home';

const Player = () => {
const {id} = useParams();

  const [apidata, setapidata] = useState({
    name: '',
    key: '',
    published_at: '',
    typeof: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzVmY2RjZTA5ODAxYzQ5NzUzNWU3NjMzODJiYzZkYiIsIm5iZiI6MTc2MTAzOTE3NS42NTY5OTk4LCJzdWIiOiI2OGY3NTM0NzYxN2RiNDljNzczYTM5ODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.o3exRiz8bcFRZGBe5JodPqFe4jYJCndcBmQStamxbaI'
    }
  };

 useEffect(() => {
  if (!id) return;

  console.log("Fetching videos for movie ID:", id); // ✅ check this

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      console.log("TMDB video response:", res); // ✅ see what data you get
      const trailer = res.results?.find(
        video => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setapidata({
          name: trailer.name,
          key: trailer.key,
          published_at: trailer.published_at || "Unknown",
          type: trailer.type,
        });
      } else {
        console.warn("No trailer found for this movie.");
      }
    })
    .catch(err => console.error(err));
}, [id]);



  return (
    <div className='player'>
     <Link to={`/`}><img src={back_arrow_icon} alt='back-arrow' className='back-arrow' /></Link> 
      
      <iframe
        width='90%'
        height='80%'
        src={`https://www.youtube.com/embed/${apidata.key}`} // ✅ backticks
        title='Trailer'
        frameBorder='0'
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p><strong>Published:</strong> {apidata.published_at}</p>
        <p><strong>Title:</strong> {apidata.name}</p>
        <p><strong>Type:</strong> {apidata.typeof}</p>
      </div>
    </div>
  );
};

export default Player;
