import { motion } from 'framer-motion';
import { Copy, RotateCcw, Heart, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const SummaryScreen = ({ testerName, likedActivities, onReset }) => {
  const [copied, setCopied] = useState(false);

  const copyResults = () => {
    const activityNames = likedActivities.map(a => a.name).join(', ');
    const resultText = `Tester: ${testerName} | Likes: ${activityNames || 'None'}`;
    
    navigator.clipboard.writeText(resultText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6 flex flex-col"
    >
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8 mt-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Done, {testerName}!
          </h1>
          <p className="text-gray-600">
            {likedActivities.length > 0
              ? `You liked ${likedActivities.length} ${likedActivities.length === 1 ? 'activity' : 'activities'}`
              : "You didn't like any activities"}
          </p>
        </motion.div>

        {/* Liked Activities */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 mb-6"
        >
          {likedActivities.length > 0 ? (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide px-2 mb-3">
                Your Liked Activities
              </h2>
              {likedActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md"
                >
                  <div className="flex items-start gap-4 p-4">
                    <img
                      src={activity.image1}
                      alt={activity.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <Heart className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" />
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">
                            {activity.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">
                No activities were liked during this session.
              </p>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3 pb-safe"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={copyResults}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow"
          >
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Results
              </>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onReset}
            className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold text-lg shadow-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            New Session
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SummaryScreen;
