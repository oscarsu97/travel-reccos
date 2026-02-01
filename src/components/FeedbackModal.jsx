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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Enhanced Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal - Bright Dark Blue Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md rounded-2xl shadow-2xl max-h-[85vh] flex flex-col border opacity-100"
          style={{ backgroundColor: '#1e3a8a', borderColor: '#3b82f6' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b" style={{ backgroundColor: '#1e3a8a', borderColor: '#3b82f6' }}>
            <h2 className="text-xl font-bold text-white">
              {isLike ? 'Nice choice! Tell us more.' : 'Not for you? Why?'}
            </h2>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity border"
              style={{ backgroundColor: '#2563eb', borderColor: '#60a5fa' }}
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ backgroundColor: '#1e3a8a' }}>
            {/* Activity Name Reference */}
            <div className="rounded-2xl p-4 border" style={{ backgroundColor: '#1d4ed8', borderColor: '#3b82f6' }}>
              <p className="text-xs text-blue-200 mb-1 uppercase tracking-wide">Activity</p>
              <p className="text-lg font-semibold text-white">{activity?.name}</p>
            </div>

            {/* Question 1: Experience Level */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:border-blue-400 transition-colors" style={{ backgroundColor: '#1d4ed8', borderColor: '#3b82f6' }}>
                <input
                  type="checkbox"
                  checked={hasDoneBefore}
                  onChange={(e) => setHasDoneBefore(e.target.checked)}
                  className="w-5 h-5 rounded border-2 cursor-pointer"
                  style={{ accentColor: '#22c55e' }}
                />
                <span className="text-base text-white font-medium">
                  I have done this before
                </span>
              </label>
            </div>

            {/* Question 2: Vibes */}
            <div>
              <h3 className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-3">
                What's the Vibe?
              </h3>
              <div className="flex flex-wrap gap-2">
                {VIBE_OPTIONS.map((vibe) => (
                  <button
                    key={vibe}
                    onClick={() => handleVibeToggle(vibe)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all border"
                    style={selectedVibes.includes(vibe) 
                      ? { backgroundColor: '#22c55e', color: '#ffffff', borderColor: '#10b981' } 
                      : { backgroundColor: '#1d4ed8', color: '#bfdbfe', borderColor: '#3b82f6' }}
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
                      className="px-4 py-2 rounded-full text-sm font-medium border"
                      style={{ backgroundColor: '#a855f7', color: '#ffffff', borderColor: '#c084fc' }}
                    >
                      {vibe}
                    </button>
                  ))}

                {/* Add Custom Button */}
                {!showCustomInput && (
                  <button
                    onClick={() => setShowCustomInput(true)}
                    className="px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-1 hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: '#1d4ed8', color: '#bfdbfe', borderColor: '#3b82f6' }}
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
                    className="flex-1 p-3 border rounded-lg text-white focus:outline-none"
                    style={{ backgroundColor: '#1d4ed8', color: '#ffffff', borderColor: '#3b82f6', placeholder: '#bfdbfe' }}
                    autoFocus
                  />
                  <button
                    onClick={handleAddCustomVibe}
                    className="px-4 py-3 text-white rounded-lg font-medium border hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#22c55e', borderColor: '#10b981' }}
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
                <h3 className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-3">
                  Why do you like it? (Optional)
                </h3>
                <textarea
                  value={openTextFeedback}
                  onChange={(e) => setOpenTextFeedback(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border rounded-lg text-white resize-none focus:outline-none"
                  style={{ backgroundColor: '#1d4ed8', color: '#ffffff', borderColor: '#3b82f6' }}
                  rows={4}
                />
              </div>
            ) : (
              // For Passes: Structured reasons + open feedback
              <>
                <div>
                  <h3 className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-3">
                    Why do you dislike it?
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {DISLIKE_REASONS.map((reason) => (
                      <button
                        key={reason}
                        onClick={() => handleDislikeReasonToggle(reason)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all border"
                        style={selectedDislikeReasons.includes(reason) 
                          ? { backgroundColor: '#ef4444', color: '#ffffff', borderColor: '#f87171' } 
                          : { backgroundColor: '#1d4ed8', color: '#bfdbfe', borderColor: '#3b82f6' }}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={openTextFeedback}
                    onChange={(e) => setOpenTextFeedback(e.target.value)}
                    placeholder="Additional comments..."
                    className="w-full p-3 border rounded-lg text-white resize-none focus:outline-none"
                    style={{ backgroundColor: '#1d4ed8', color: '#ffffff', borderColor: '#3b82f6' }}
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>

          {/* Submit Button */}
          <div className="p-6 pt-4 border-t" style={{ backgroundColor: '#1e3a8a', borderColor: '#3b82f6' }}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              className="w-full py-4 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all border"
              style={{ background: 'linear-gradient(to right, #22c55e, #10b981)', borderColor: '#10b981' }}
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
