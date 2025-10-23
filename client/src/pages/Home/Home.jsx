import React from 'react';
import "./Home.css";
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />

      {/* Hero Section */}
      <div className='hero' style={{ backgroundImage: `url(${hero_banner})` }}>
        <div className="hero-caption">
          <img src={hero_title} alt="Hero title" className='caption-img' />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks 
            on a quest to save the city from an immortal enemy.
          </p>
          <div className="hero-btns">
            <button className='btn'>
              <img src={play_icon} alt="Play icon" /> Play
            </button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="Info icon" /> More info
            </button>
          </div><TitleCards title="Now Playing" category="now_playing" />
        </div>
      </div>

      {/* Cards Section */}
      <div className="morecards">
        
        <TitleCards title="Popular Movies" category="popular" />
        <TitleCards title="Top Rated Movies" category="top_rated" />
        <TitleCards title="Upcoming Movies" category="upcoming" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
