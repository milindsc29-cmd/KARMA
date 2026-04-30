'use client';

import { motion } from 'framer-motion';

export default function MissionSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const missionPoints = [
    {
      icon: '🌱',
      title: 'Pure Cultivation',
      description: '100% organic practices without synthetic pesticides. We nurture soil health and biodiversity with every harvest.',
    },
    {
      icon: '🤝',
      title: 'Community First',
      description: 'Direct relationships with our community. Transparency in every step of our journey from seed to table.',
    },
    {
      icon: '🌍',
      title: 'Environmental Stewardship',
      description: 'Carbon-neutral farming methods that regenerate ecosystems. We farm for future generations.',
    },
    {
      icon: '💎',
      title: 'Dragon Fruit Excellence',
      description: 'Premium dragon fruit cultivation with superior flavor and nutritional value. Our specialty and our passion.',
    },
  ];

  return (
    <section className="bg-cream py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-semibold text-dragon-pink tracking-widest uppercase">
              Our Foundation
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-forest-green mt-4 mb-6">
              The Trust
            </h2>
            <p className="text-lg text-forest-green/70 max-w-3xl mx-auto">
              KARMA is built on four pillars of trust: purity in our methods, community in our hearts, stewardship of the earth, and excellence in every harvest.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-karma-green-100"
              >
                <div className="text-5xl mb-4">{point.icon}</div>
                <h3 className="text-2xl font-bold text-forest-green mb-3">
                  {point.title}
                </h3>
                <p className="text-forest-green/70 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
