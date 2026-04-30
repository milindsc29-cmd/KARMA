'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-cream via-white to-cream flex items-center justify-center px-4 py-20 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-dragon-pink tracking-widest uppercase">
              Welcome to
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-forest-green mb-4">
            KARMA Organic &
            <span className="text-dragon-pink block">Dragon Fruit Farms</span>
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-forest-green/70 mb-8 font-light leading-relaxed"
        >
          Where sustainable agriculture meets dragon fruit excellence. Cultivating trust, community, and the future of ethical farming.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-dragon-pink text-white font-semibold rounded-lg shadow-lg hover:bg-dragon-pink/90 transition-colors"
          >
            Join the Harvest
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-forest-green text-forest-green font-semibold rounded-lg hover:bg-forest-green/5 transition-colors"
          >
            Learn Our Story
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-3 gap-8 text-center"
        >
          <div>
            <p className="text-3xl font-bold text-dragon-pink">2</p>
            <p className="text-sm text-forest-green/60 mt-2">Acres of Excellence</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-dragon-pink">100%</p>
            <p className="text-sm text-forest-green/60 mt-2">Organic</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-dragon-pink">∞</p>
            <p className="text-sm text-forest-green/60 mt-2">Sustainable</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <svg
          className="w-6 h-6 text-dragon-pink"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
