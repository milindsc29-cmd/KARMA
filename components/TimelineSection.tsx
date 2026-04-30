'use client';

import { motion } from 'framer-motion';

export default function TimelineSection() {
  const timelineEvents = [
    {
      phase: 'Phase 1',
      title: 'Foundation & Land Preparation',
      date: 'Year 1',
      description: 'Soil analysis, land conditioning, and infrastructure setup. Building the foundation for success.',
      milestone: '🌍',
    },
    {
      phase: 'Phase 2',
      title: 'Dragon Fruit Sapling Cultivation',
      date: 'Year 1-2',
      description: 'Sourcing premium dragon fruit varieties and establishing young plants with proper irrigation.',
      milestone: '🌱',
    },
    {
      phase: 'Phase 3',
      title: 'Growth & Development',
      date: 'Year 2-3',
      description: 'Nurturing growth, implementing organic pest management, and building biodiversity.',
      milestone: '🌿',
    },
    {
      phase: 'Phase 4',
      title: 'First Harvest',
      date: 'Year 3-4',
      description: 'Celebrating first yields of premium dragon fruit. Beginning direct community distribution.',
      milestone: '🐉',
    },
    {
      phase: 'Phase 5',
      title: 'Scale & Impact',
      date: 'Year 4+',
      description: 'Expanding sustainable practices, mentoring other farmers, and creating a ripple effect.',
      milestone: '🌟',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-semibold text-dragon-pink tracking-widest uppercase">
              Our Evolution
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-forest-green mt-4 mb-6">
              The 2-Acre Journey
            </h2>
            <p className="text-lg text-forest-green/70 max-w-3xl mx-auto">
              Building in public. Sharing our transformation from vision to thriving sustainable farm.
            </p>
          </motion.div>

          <div className="relative mt-16">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-dragon-pink via-karma-green-500 to-forest-green transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8 relative`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                    className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-dragon-pink rounded-full border-4 border-cream shadow-lg transform md:-translate-x-1/2 -translate-x-1.5"
                  />

                  {/* Content */}
                  <div className="md:w-1/2 pl-12 md:pl-0">
                    <motion.div
                      whileHover={{ x: index % 2 === 0 ? 5 : -5 }}
                      className="bg-cream border border-karma-green-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="text-3xl mb-3">{event.milestone}</div>
                      <p className="text-sm font-semibold text-dragon-pink tracking-widest uppercase mb-2">
                        {event.phase}
                      </p>
                      <h3 className="text-2xl font-bold text-forest-green mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm font-semibold text-forest-green/60 mb-3">
                        {event.date}
                      </p>
                      <p className="text-forest-green/70 leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
