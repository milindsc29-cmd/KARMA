'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="bg-deep-forest text-cream py-12 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-cream mb-3">KARMA</h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              Organic & Dragon Fruit Farms. Building a sustainable future through ethical agriculture.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-cream mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <a href="#" className="hover:text-dragon-pink transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-dragon-pink transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-dragon-pink transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-cream mb-4 text-sm uppercase tracking-wider">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-cream/10 hover:bg-dragon-pink transition-colors text-cream hover:text-white"
                  title={social}
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-cream/20 pt-8 text-center text-sm text-cream/60"
        >
          <p>
            &copy; {currentYear} KARMA Organic & Dragon Fruit Farms. All rights reserved. | Cultivating trust, one harvest at a time.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
