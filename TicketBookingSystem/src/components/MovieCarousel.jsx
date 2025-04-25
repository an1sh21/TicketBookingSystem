// src/components/MovieCarousel.jsx
import { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import NavButton from './NavButton';

const MovieCarousel = ({ movies }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [containerPadding, setContainerPadding] = useState(0);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const calculateLayout = () => {
      if (!containerRef.current || !carouselRef.current || movies.length === 0) return;
      
      const containerStyle = window.getComputedStyle(containerRef.current);
      const padding = parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight);
      setContainerPadding(padding);
      
      const containerWidth = containerRef.current.offsetWidth - padding;
      const cardElement = carouselRef.current.children[0];
      
      if (!cardElement) return;
      
      const cardStyle = window.getComputedStyle(cardElement);
      const margin = parseFloat(cardStyle.marginRight);
      const width = cardElement.offsetWidth + margin;
      setCardWidth(width);
      
      const cardsThatFit = Math.floor(containerWidth / width);
      setVisibleCards(Math.max(1, cardsThatFit));
    };
    
    calculateLayout();
    
    const handleResize = () => {
      calculateLayout();
      setCardIndex(0); // Reset position on resize
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [movies.length]);

  const totalSlides = Math.max(movies.length - visibleCards + 1, 1);

  useEffect(() => {
    if (totalSlides <= 1) return;
    
    const timer = setInterval(() => {
      setCardIndex(prev => (prev + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [totalSlides]);

  const slideCarousel = (direction) => {
    if (totalSlides <= 1) return;
    
    setCardIndex(prev => {
      if (direction === 'next') {
        return prev >= totalSlides - 1 ? 0 : prev + 1;
      } else {
        return prev <= 0 ? totalSlides - 1 : prev - 1;
      }
    });
  };

  const handleDotClick = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCardIndex(index);
    }
  };

  // Calculate maximum translation needed to show last cards
  const maxTranslation = Math.max(0, (movies.length - visibleCards) * cardWidth);

  return (
    <div className="carousel-container" ref={containerRef}>
      <div 
        ref={carouselRef}
        className="carousel" 
        style={{ 
          transform: `translateX(-${Math.min(cardIndex * cardWidth, maxTranslation)}px)`,
          width: `${movies.length * cardWidth}px`,
          paddingLeft: `${containerPadding / 2}px`,
          paddingRight: `${containerPadding / 2}px`
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isNowShowing={true} />
        ))}
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ 
            width: `${totalSlides > 1 ? ((cardIndex + 1) / totalSlides) * 100 : 0}%`,
            visibility: totalSlides > 1 ? 'visible' : 'hidden'
          }}
        />
      </div>
      
      {totalSlides > 1 && (
        <>
          <div className="dots">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div 
                key={index}
                className={`dot ${index === cardIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
          
          <div className="navigation">
            <NavButton direction="prev" onClick={() => slideCarousel('prev')} />
            <NavButton direction="next" onClick={() => slideCarousel('next')} />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCarousel;