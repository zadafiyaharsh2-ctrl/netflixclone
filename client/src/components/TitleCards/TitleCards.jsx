import React, { useRef, useEffect } from 'react';
import "./TitleCard.css";
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({title,category}) => {
  const cardsRef = useRef();

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const cardContainer = cardsRef.current;
    cardContainer.addEventListener("wheel", handleWheel, { passive: false });

    // cleanup on unmount
    return () => {
      cardContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
