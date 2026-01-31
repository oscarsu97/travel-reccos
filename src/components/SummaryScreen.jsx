import { motion } from 'framer-motion';
import { Copy, RotateCcw, Heart, X, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const SummaryScreen = ({ testerName, likedActivities, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  // Separate liked and passed activities
  const liked = likedActivities.filter(item => item.status === 'Liked');
  const passed = likedActivities.filter(item => item.status === 'Pass');

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyResults = () => {
    let resultText = `TRAVEL VIBE TEST RESULTS\n`;
    resultText += `Tester: ${testerName}\n`;
    resultText += `Date: ${new Date().toLocaleDateString()}\n`;
    resultText += `\n${'='.repeat(50)}\n\n`;

    // Liked Activities
    resultText += `✅ LIKED ACTIVITIES (${liked.length})\n\n`;
    
    if (liked.length === 0) {
      resultText += `None\n\n`;
    } else {
      liked.forEach((item, index) => {
        resultText += `${index + 1}. ${item.activity.name}\n`;
        resultText += `   ${item.activity.description}\n`;
        
        if (item.feedback.hasDoneBefore) {
          resultText += `   ✓ Have done this before\n`;
        }
        
        if (item.feedback.vibes && item.feedback.vibes.length > 0) {
          resultText += `   Vibes: ${item.feedback.vibes.join(', ')}\n`;
        }
        
        if (item.feedback.whyLike) {
          resultText += `   Why: ${item.feedback.whyLike}\n`;
        }
        
        resultText += `\n`;
      });
    }

    // Passed Activities
    resultText += `${'='.repeat(50)}\n\n`;
    resultText += `❌ PASSED ACTIVITIES (${passed.length})\n\n`;
    
    if (passed.length === 0) {
      resultText += `None\n\n`;
    } else {
      passed.forEach((item, index) => {
        resultText += `${index + 1}. ${item.activity.name}\n`;
        resultText += `   ${item.activity.description}\n`;
        
        if (item.feedback.hasDoneBefore) {
          resultText += `   ✓ Have done this before\n`;
        }
        
        if (item.feedback.vibes && item.feedback.vibes.length > 0) {
          resultText += `   Vibes: ${item.feedback.vibes.join(', ')}\n`;
        }
        
        if (item.feedback.whyDislike && item.feedback.whyDislike.length > 0) {
          resultText += `   Reasons: ${item.feedback.whyDislike.join(', ')}\n`;
        }
        
        if (item.feedback.additionalComments) {
          resultText += `   Comments: ${item.feedback.additionalComments}\n`;
        }
        
        resultText += `\n`;
      });
    }

    resultText += `${'='.repeat(50)}\n`;
    resultText += `End of Report`;
    
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
            {liked.length} liked · {passed.length} passed
          </p>
        </motion.div>

        {/* Results Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 mb-6 overflow-y-auto"
        >
          {/* Liked Activities */}
          {liked.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide px-2 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-green-500" fill="currentColor" />
                Liked Activities ({liked.length})
              </h2>
              <div className="space-y-3">
                {liked.map((item, index) => (
                  <motion.div
                    key={item.activity.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={item.activity.image1}
                          alt={item.activity.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-base">
                            {item.activity.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.activity.description}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleExpanded(item.activity.id)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {expandedItems[item.activity.id] ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>

                      {/* Expanded Feedback */}
                      {expandedItems[item.activity.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-3 border-t border-gray-100 space-y-2"
                        >
                          {item.feedback.hasDoneBefore && (
                            <p className="text-xs text-gray-600">
                              ✓ Done this before
                            </p>
                          )}
                          {item.feedback.vibes && item.feedback.vibes.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Vibes:</p>
                              <div className="flex flex-wrap gap-1">
                                {item.feedback.vibes.map((vibe, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                    {vibe}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {item.feedback.whyLike && (
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Why:</p>
                              <p className="text-xs text-gray-600 italic">"{item.feedback.whyLike}"</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Passed Activities */}
          {passed.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide px-2 mb-3 flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" />
                Passed Activities ({passed.length})
              </h2>
              <div className="space-y-3">
                {passed.map((item, index) => (
                  <motion.div
                    key={item.activity.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={item.activity.image1}
                          alt={item.activity.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0 opacity-60"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-700 text-base">
                            {item.activity.name}
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.activity.description}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleExpanded(item.activity.id)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {expandedItems[item.activity.id] ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>

                      {/* Expanded Feedback */}
                      {expandedItems[item.activity.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-3 border-t border-gray-100 space-y-2"
                        >
                          {item.feedback.hasDoneBefore && (
                            <p className="text-xs text-gray-600">
                              ✓ Done this before
                            </p>
                          )}
                          {item.feedback.vibes && item.feedback.vibes.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Vibes:</p>
                              <div className="flex flex-wrap gap-1">
                                {item.feedback.vibes.map((vibe, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                                    {vibe}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {item.feedback.whyDislike && item.feedback.whyDislike.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Reasons:</p>
                              <div className="flex flex-wrap gap-1">
                                {item.feedback.whyDislike.map((reason, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                                    {reason}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {item.feedback.additionalComments && (
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-1">Comments:</p>
                              <p className="text-xs text-gray-600 italic">"{item.feedback.additionalComments}"</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {liked.length === 0 && passed.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">
                No feedback collected during this session.
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
