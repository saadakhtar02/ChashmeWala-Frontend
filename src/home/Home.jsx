import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryCards from './components/CategoryCards';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <CategoryCards />
      <WhyChooseUs />
      <Reviews />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
