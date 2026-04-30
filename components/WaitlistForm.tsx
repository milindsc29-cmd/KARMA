'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { addToWaitlist } from '@/lib/supabase';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!email || !name) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      setLoading(false);
      return;
    }

    const result = await addToWaitlist(email, name);

    if (result.success) {
      setMessage('🎉 Welcome to the harvest! Check your email for updates.');
      setMessageType('success');
      setEmail('');
      setName('');
    } else {
      setMessage('Something went wrong. Please try again.');
      setMessageType('error');
    }

    setLoading(false);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="bg-gradient-to-b from-cream to-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-sm font-semibold text-dragon-pink tracking-widest uppercase">
              Be Part of the Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-forest-green mt-4 mb-6">
              Join the Harvest Waitlist
            </h2>
            <p className="text-lg text-forest-green/70">
              Get exclusive updates about our farm, first access to dragon fruit harvests, and behind-the-scenes insights.
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-karma-green-200"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-semibold text-forest-green mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-karma-green-300 focus:outline-none focus:ring-2 focus:ring-dragon-pink bg-cream text-forest-green placeholder-forest-green/40 disabled:opacity-50"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-semibold text-forest-green mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-karma-green-300 focus:outline-none focus:ring-2 focus:ring-dragon-pink bg-cream text-forest-green placeholder-forest-green/40 disabled:opacity-50"
                />
              </motion.div>

              {/* Message Display */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-sm font-semibold ${
                    messageType === 'success'
                      ? 'bg-karma-green-100 text-karma-green-700 border border-karma-green-300'
                      : 'bg-red-100 text-red-700 border border-red-300'
                  }`}
                >
                  {message}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-dragon-pink to-dragon-pink/90 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Joining the harvest...' : 'Join the Harvest Waitlist'}
              </motion.button>

              <p className="text-xs text-forest-green/60 text-center">
                We respect your privacy. You'll only receive updates about KARMA farm and our dragon fruit harvests.
              </p>
            </div>
          </motion.form>

          {/* Trust Badges */}
          <motion.div variants={itemVariants} className="mt-12 flex justify-center items-center gap-6 flex-wrap">
            <div className="text-center">
              <p className="text-2xl font-bold text-dragon-pink">100%</p>
              <p className="text-sm text-forest-green/60">Organic</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-dragon-pink">2</p>
              <p className="text-sm text-forest-green/60">Acres</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-dragon-pink">🌱</p>
              <p className="text-sm text-forest-green/60">Sustainable</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
