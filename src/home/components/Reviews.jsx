import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const REVIEWS = [
  {
    name: "Alexander Mercer",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    text: "The build quality of these optical specs is unbelievable. They fit perfectly, feel light on the nose, and I constantly receive compliments on the matte frame finish.",
    rating: 5
  },
  {
    name: "Elena Rostova",
    role: "Professional Photographer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    text: "As a photographer, lens clarity is everything. The anti-reflective anti-glare prescription coating on these glasses is superior to designer brands costing three times as much.",
    rating: 5
  },
  {
    name: "Marcus Vance",
    role: "Senior Software Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    text: "The screen-glare protection is a lifesaver. My daily eye strain has vanished since switching to their premium blue-light blocking lenses. Highest recommendation!",
    rating: 5
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
    scale: 0.96
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 150 : -150,
    opacity: 0,
    scale: 0.96
  })
};

function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const autoPlayRef = useRef(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isHovered, current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const activeReview = REVIEWS[current];

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto w-full transition-colors duration-300">
      <div className="text-center mb-12">
        <span className="font-outfit font-bold text-xs uppercase tracking-[0.25em] text-gold mb-2 block">
          Client Testimonials
        </span>
        <h2 className="font-display font-extrabold text-4xl text-gradient-premium mb-4">
          What Our Customers Say
        </h2>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-4 rounded" />
      </div>

      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative min-h-[380px] sm:min-h-[300px] flex items-center justify-center"
      >
        <button
          onClick={handlePrev}
          className="absolute left-0 sm:-left-12 z-20 p-3 rounded-full bg-white border border-gray-150 hover:border-gold hover:text-gold shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer hidden sm:block"
          aria-label="Previous review"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        <div className="w-full overflow-hidden relative py-4 px-2">
          <div className="glass-card p-8 sm:p-10 rounded-3xl border border-gray-150/40 relative min-h-[300px] flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            <div className="absolute top-6 right-10 text-gold/15 font-serif text-9xl pointer-events-none select-none">
              “
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 350, damping: 30 },
                  opacity: { duration: 0.25 }
                }}
                className="flex flex-col justify-between h-full flex-grow text-left"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4.5 h-4.5 fill-current ${
                          i < activeReview.rating ? 'text-amber-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 italic font-sans">
                    "{activeReview.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-2 border-t border-gray-100 pt-5">
                  <img
                    src={activeReview.avatar}
                    alt={activeReview.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold/30 shadow-md"
                  />
                  <div>
                    <h4 className="font-outfit font-bold text-sm text-gray-800">
                      {activeReview.name}
                    </h4>
                    <p className="text-xs text-muted font-sans">
                      {activeReview.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 sm:-right-12 z-20 p-3 rounded-full bg-white border border-gray-150 hover:border-gold hover:text-gold shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer hidden sm:block"
          aria-label="Next review"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center items-center gap-2.5 mt-8">
        <button 
          onClick={handlePrev}
          className="p-2 border border-gray-150 rounded-full hover:border-gold hover:text-gold text-gray-600 transition-colors mr-2 sm:hidden"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>

        {REVIEWS.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              current === index ? 'w-7 bg-gold' : 'w-2.5 bg-gray-300 hover:bg-gold/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

        <button 
          onClick={handleNext}
          className="p-2 border border-gray-150 rounded-full hover:border-gold hover:text-gold text-gray-600 transition-colors ml-2 sm:hidden"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

export default Reviews;
