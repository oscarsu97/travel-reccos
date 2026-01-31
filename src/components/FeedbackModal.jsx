import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

const VIBE_OPTIONS = [
  'Chill',
  'Chaotic',
  'Iconic',
  'Romantic',
  'Adventure',
  'Luxury',
  'Local',
  'Tourist Trap'
];

const DISLIKE_REASONS = [
  'Too Crowded',
  'Too Expensive',
  'Too Physical',
  'Nothing to do',
  'Looks Dirty',
  'Been there/Done that'
];

const FeedbackModal = ({ isOpen, activity, swipeDirection, onSubmit, onClose }) => {
  const [hasDoneBefore, setHasDoneBefore] = useState(false);
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [customVibe, setCustomVibe] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedDislikeReasons, setSelectedDislikeReasons] = useState([]);
  const [openTextFeedback, setOpenTextFeedback] = useState('');

  const isLike = swipeDirection === 'Liked';

  const resetForm = () => {
    setHasDoneBefore(false);
    setSelectedVibes([]);
    setCustomVibe('');
    setShowCustomInput(false);
    setSelectedDislikeReasons([]);
    setOpenTextFeedback('');
  };

  const handleVibeToggle = (vibe) => {
    setSelectedVibes(prev =>
      prev.includes(vibe)
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
  };

  const handleDislikeReasonToggle = (reason) => {
    setSelectedDislikeReasons(prev =>
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleAddCustomVibe = () => {
    if (customVibe.trim()) {
      setSelectedVibes(prev => [...prev, customVibe.trim()]);
      setCustomVibe('');
      setShowCustomInput(false);
    }
  };

  const handleSubmit = () => {
    const feedback = {
      hasDoneBefore,
      vibes: selectedVibes,
      ...(isLike
        ? { whyLike: openTextFeedback }
        : {
            whyDislike: selectedDislikeReasons,
            additionalComments: openTextFeedback
          }
      )
    };

    onSubmit(feedback);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md bg-slate-950 rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">
              {isLike ? 'Nice choice! Tell us more.' : 'Not for you? Why?'}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Activity Name Reference */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
              <p className="text-sm text-slate-400 mb-1">Activity</p>
              <p className="text-lg font-semibold text-white">{activity.name}</p>
            </div>

            {/* Question 1: Experience Level */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasDoneBefore}
                  onChange={(e) => setHasDoneBefore(e.target.checked)}
                  className="w-6 h-6 rounded-lg border-2 border-slate-700 bg-slate-800 checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                />
                <span className="text-base text-white font-medium">
                  I have done this before
                </span>
              </label>
            </div>

            {/* Question 2: Vibes */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">
                What's the Vibe?
              </h3>
              <div className="flex flex-wrap gap-2">
                {VIBE_OPTIONS.map((vibe) => (
                  <button
                    key={vibe}
                    onClick={() => handleVibeToggle(vibe)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedVibes.includes(vibe)
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {vibe}
                  </button>
                ))}
                
                {/* Custom Vibes */}
                {selectedVibes
                  .filter(v => !VIBE_OPTIONS.includes(v))
                  .map((vibe) => (
                    <button
                      key={vibe}
                      onClick={() => handleVibeToggle(vibe)}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500 text-white"
                    >
                      {vibe}
                    </button>
                  ))}

                {/* Add Custom Button */}
                {!showCustomInput && (
                  <button
                    onClick={() => setShowCustomInput(true)}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                )}
              </div>

              {/* Custom Vibe Input */}
              {showCustomInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 flex gap-2"
                >
                  <input
                    type="text"
                    value={customVibe}
                    onChange={(e) => setCustomVibe(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustomVibe()}
                    placeholder="Type custom vibe..."
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={handleAddCustomVibe}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600"
                  >
                    Add
                  </button>
                </motion.div>
              )}
            </div>

            {/* Question 3: Context-specific */}
            {isLike ? (
              // For Likes: Open feedback
              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">
                  Why do you like it? (Optional)
                </h3>
                <textarea
                  value={openTextFeedback}
                  onChange={(e) => setOpenTextFeedback(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  rows={4}
                />
              </div>
            ) : (
              // For Passes: Structured reasons + open feedback
              <>
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">
                    Why do you dislike it?
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {DISLIKE_REASONS.map((reason) => (
                      <button
                        key={reason}
                        onClick={() => handleDislikeReasonToggle(reason)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedDislikeReasons.includes(reason)
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={openTextFeedback}
                    onChange={(e) => setOpenTextFeedback(e.target.value)}
                    placeholder="Additional comments..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>

          {/* Submit Button */}
          <div className="p-6 pt-4 border-t border-slate-800">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Submit & Next
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FeedbackModal;
