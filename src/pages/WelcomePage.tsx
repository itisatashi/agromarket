import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const WelcomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      title: "Welcome to AgroMarket",
      description: "Connect directly with local farmers and enjoy fresh, sustainably grown produce delivered to your doorstep.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      buttonText: "Next"
    },
    {
      title: "Fresh from the Farm",
      description: "Support local agriculture and get fresher, healthier food while ensuring farmers receive fair prices.",
      image: "https://images.unsplash.com/photo-1592321675774-3de57f3ee0dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      buttonText: "Next"
    },
    {
      title: "Easy Ordering",
      description: "Browse products, place orders, and track deliveries all from your mobile device.",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      buttonText: "Get Started"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Slide Content */}
      <div className="flex-grow relative overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">{slide.title}</h1>
              <p className="text-lg mb-6 text-white/90">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute top-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? 'w-6 bg-primary' : 'w-2 bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      
      {/* Skip Button */}
      <div className="absolute top-8 right-8">
        <Link 
          to="/login" 
          className="text-white text-sm font-medium"
        >
          Skip
        </Link>
      </div>
      
      {/* Bottom Controls */}
      <div className="p-8 flex justify-between items-center bg-white">
        <button 
          onClick={() => navigate('/login')}
          className="text-primary font-medium"
        >
          Skip
        </button>
        
        <button 
          onClick={handleNext}
          className="bg-primary text-white px-6 py-3 rounded-full font-medium flex items-center"
        >
          {slides[currentSlide].buttonText}
          <ChevronRightIcon className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
