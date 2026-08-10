import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiLayers, FiDollarSign, FiEye } from 'react-icons/fi';

const FEATURES = [
  {
    icon: <FiShield className="w-6 h-6 text-gold" />,
    title: "Handcrafted Optics",
    description: "Every frame is hand-crafted from the finest lightweight Italian acetates and aerospace-grade titanium alloy."
  },
  {
    icon: <FiLayers className="w-6 h-6 text-gold" />,
    title: "Latest Specs Catalog",
    description: "Stay ahead of global fashion trends with monthly catalog releases designed by international optical designers."
  },
  {
    icon: <FiDollarSign className="w-6 h-6 text-gold" />,
    title: "Direct Pricing",
    description: "Luxury optical specs without designer markups. Direct manufacturer relationships pass maximum value to you."
  },
  {
    icon: <FiEye className="w-6 h-6 text-gold" />,
    title: "Precision Prescription",
    description: "Tailored optical lenses crafted to your exact prescription with advanced anti-glare, anti-scratch, and blue-light protection."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 px-6 border-t border-b border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center mb-16">
          <span className="font-outfit font-bold text-xs uppercase tracking-[0.25em] text-gold mb-2 block">
            Our Core Standards
          </span>
          <h2 className="font-display font-extrabold text-4xl text-gradient-premium mb-4">
            Why Choose Our Optical Store
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4 rounded" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {FEATURES.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-card p-6 rounded-2xl border border-gray-150/40 dark:border-gray-900/60 flex flex-col items-center text-center hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 dark:bg-gold/5 flex items-center justify-center border border-gold/15 mb-6 shadow-inner">
                {item.icon}
              </div>

              <h3 className="font-outfit font-bold text-lg text-gray-800 dark:text-gray-100 mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed font-sans">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
