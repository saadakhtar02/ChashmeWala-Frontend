import React, { useState } from 'react';
import ProductGrid from './ProductGrid';

const CATEGORIES = [
  {
    name: 'All',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=500&q=80',
    count: 'Specs & Sunglasses'
  },
  {
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80',
    count: 'Men Eyeglasses'
  },
  {
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=500&q=80',
    count: 'Women Eyeglasses'
  },
  {
    name: 'Kids',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=500&q=80',
    count: 'Kids Eyeglasses'
  }
];

function CategoryCards() {
  const [activeCategory, setActiveCategory] = useState('All');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    const rotateX = -(dy / yc) * 12;
    const rotateY = (dx / xc) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <>
      <section id="categories" className="py-20 px-6 max-w-7xl mx-auto w-full transition-colors duration-300">
        <div className="text-center mb-12">
          <span className="font-outfit font-bold text-xs uppercase tracking-[0.25em] text-gold mb-2 block">
            Curated Eyewear
          </span>
          <h2 className="font-display font-extrabold text-4xl text-gradient-premium mb-4">
            Shop By Category
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <div
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative h-[180px] sm:h-[240px] lg:h-[300px] rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ease-out border ${isActive
                  ? 'border-gold shadow-gold/20 scale-[1.03]'
                  : 'border-transparent dark:border-gray-900 shadow-gray-200/50 dark:shadow-black/40'
                  }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />

                <div
                  className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-20 text-left transition-transform duration-300"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <span className="font-outfit text-[10px] sm:text-xs text-gold font-semibold uppercase tracking-wider block mb-0.5 sm:mb-1">
                    {cat.count}
                  </span>
                  <h3 className="font-outfit font-bold text-base sm:text-xl lg:text-2xl text-white">
                    {cat.name}
                  </h3>

                  <div className={`h-0.5 mt-1.5 sm:mt-2 rounded transition-all duration-500 ${isActive ? 'w-8 sm:w-12 bg-gold' : 'w-0 bg-white group-hover:w-8 sm:group-hover:w-12'
                    }`} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ProductGrid activeCategory={activeCategory} />
    </>
  );
}

export default CategoryCards;
