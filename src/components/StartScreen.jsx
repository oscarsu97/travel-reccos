import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const StartScreen = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-center text-gray-900 mb-2"
        >
          Travel Vibe Tester
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-600 mb-12"
        >
          Swipe through activities and find your perfect vibe
        </motion.p>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all bg-white"
              autoFocus
            />
          </div>

          <motion.button
            type="submit"
            disabled={!name.trim()}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-xl"
          >
            Start Session
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default StartScreen;
