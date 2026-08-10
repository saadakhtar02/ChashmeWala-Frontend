import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

function HeroSection() {
  const [heroSlides, setHeroSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.95], [0, -50]);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/home/hero');
        if (response.data && Array.isArray(response.data)) {
          setHeroSlides(response.data);
        }
      } catch (error) {
        console.error('Error fetching hero section data:', error);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return `http://localhost:5000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  if (!heroSlides.length) {
    return null;
  }

  const slide = heroSlides[current] || heroSlides[0];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-0 lg:min-h-[140vh] transition-colors duration-300"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="sticky top-0 h-auto lg:h-screen w-full flex flex-col justify-center overflow-y-auto lg:overflow-hidden pt-1 sm:pt-4 lg:pt-6 pb-6 sm:pb-12 lg:pb-20 px-4 sm:px-6 z-10"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[240px] sm:w-[500px] h-[240px] sm:h-[500px] bg-gold/15 rounded-full blur-[60px] sm:blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[180px] sm:w-[400px] h-[180px] sm:h-[400px] bg-orange-400/10 rounded-full blur-[50px] sm:blur-[100px] animate-pulse delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center relative z-10 my-auto">

          <div className="text-left flex flex-col justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-outfit font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold mb-1.5 sm:mb-3 block">
                  {slide.subtitle}
                </span>

                <h1 className="font-display font-extrabold text-2xl sm:text-6xl md:text-7xl leading-tight text-gradient-premium mb-3 sm:mb-6">
                  {slide.title}
                </h1>

                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
                  <span className="font-outfit font-black text-xl sm:text-3xl text-gold">
                    ₹{slide.price}
                  </span>
                  <span className="text-[9px] sm:text-xs uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gold/10 text-gold rounded font-medium border border-gold/20">
                    New Arrival
                  </span>
                </div>

                <p className="text-xs sm:text-lg text-muted max-w-xl mb-4 sm:mb-8 leading-relaxed font-sans">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4">
                  <button
                    onClick={() => handleScroll('products')}
                    className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-4 bg-gold hover:bg-gold-hover text-white font-outfit font-bold text-xs sm:text-sm rounded shadow-lg shadow-gold/25 hover:shadow-gold-hover/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer text-center"
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={() => handleScroll('categories')}
                    className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-4 glass-card font-outfit font-bold text-xs sm:text-sm rounded hover:bg-gray-100 hover:border-gold/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer text-center"
                  >
                    Explore Categories
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex justify-center items-center h-[180px] sm:h-[380px] md:h-[450px] order-1 lg:order-2">
            <div className="absolute w-[150px] h-[150px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px] rounded-full border border-gold/10 flex items-center justify-center animate-spin [animation-duration:40s]">
              <div className="absolute w-[130px] h-[130px] sm:w-[260px] sm:h-[260px] rounded-full border border-dashed border-gold/15" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="absolute inset-0 flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute font-outfit font-black text-4xl sm:text-8xl md:text-9xl tracking-[0.15em] sm:tracking-[0.2em] text-gray-200/40 select-none pointer-events-none z-0">
                  GLASSES
                </div>

                <motion.img
                  src={getImageUrl(slide.image)}
                  alt={slide.title}
                  className="max-h-[120px] sm:max-h-[240px] md:max-h-[280px] w-auto object-contain z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 1.5, 0]
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <div className="relative lg:absolute bottom-2 lg:bottom-8 left-0 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center gap-2 sm:gap-3 z-20 mt-6 sm:mt-8 lg:mt-0">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${current === index ? 'w-5 sm:w-8 bg-gold' : 'w-1.5 sm:w-2.5 bg-gray-300 hover:bg-gold/50'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </motion.div>
    </section>
  );
}

export default HeroSection;