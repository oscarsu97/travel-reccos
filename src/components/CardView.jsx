import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ChevronLeft, ChevronRight, Users, Activity } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

const CardView = ({ activity, currentIndex, totalCount, onAction }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [pendingSwipeDirection, setPendingSwipeDirection] = useState(null);

  const images = [activity.image1, activity.image2, activity.image3];

  // Helper functions for user-friendly labels
  const getCrowdLabel = (level) => {
    switch (level) {
      case 'Low': return 'Few People';
      case 'Medium': return 'Moderate Crowd';
      case 'High': return 'Very Crowded';
      case 'Extreme': return 'Packed';
      default: return level;
    }
  };

  const getEffortLabel = (level) => {
    switch (level) {
      case 'Low': return 'Low Physical Effort';
      case 'Medium': return 'Moderate Physical Effort';
      case 'High': return 'Physically Challenging';
      default: return level;
    }
  };

  const getCrowdColor = (level) => {
    switch (level) {
      case 'Low': return 'bg-green-500/90';
      case 'Medium': return 'bg-yellow-500/90';
      case 'High': return 'bg-orange-500/90';
      case 'Extreme': return 'bg-red-500/90';
      default: return 'bg-gray-500/90';
    }
  };

  const getEffortColor = (level) => {
    switch (level) {
      case 'Low': return 'bg-green-500/90';
      case 'Medium': return 'bg-yellow-500/90';
      case 'High': return 'bg-red-500/90';
      default: return 'bg-gray-500/90';
    }
  };

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAction = (status) => {
    // Instead of immediately proceeding, show feedback modal
    setPendingSwipeDirection(status);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (feedback) => {
    setShowFeedbackModal(false);
    setCurrentImageIndex(0);
    // Pass both the status and feedback to parent
    onAction(pendingSwipeDirection, feedback);
    setPendingSwipeDirection(null);
  };

  const handleFeedbackClose = () => {
    setShowFeedbackModal(false);
    setPendingSwipeDirection(null);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Mobile Container - Polished Card */}
      <div className="w-full max-w-md h-[95vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Progress Bar */}
        <div className="bg-white px-6 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">
              {currentIndex + 1} of {totalCount}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(((currentIndex + 1) / totalCount) * 100)}%
            </span>
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activity.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="flex-1 flex flex-col"
          >
            {/* Image Section - Fixed aspect ratio */}
            <div className="relative bg-gray-200 mx-4 mt-4 rounded-3xl overflow-hidden" style={{ height: '55vh', position: 'relative' }}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={currentImageIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  src={images[currentImageIndex]}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                  style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                />
              </AnimatePresence>

              {/* Image Navigation Buttons - Enhanced visibility */}
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', padding: '0 1.5rem', pointerEvents: 'none', zIndex: 50 }}>
                <button
                  onClick={prevImage}
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    pointerEvents: 'auto',
                    border: '2px solid rgba(229, 231, 235, 1)',
                    cursor: 'pointer',
                    zIndex: 50
                  }}
                >
                  <ChevronLeft style={{ width: '24px', height: '24px', color: '#111827', strokeWidth: 2.5 }} />
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    pointerEvents: 'auto',
                    border: '2px solid rgba(229, 231, 235, 1)',
                    cursor: 'pointer',
                    zIndex: 50
                  }}
                >
                  <ChevronRight style={{ width: '24px', height: '24px', color: '#111827', strokeWidth: 2.5 }} />
                </button>
              </div>

              {/* Badges - Top Left - User Friendly */}
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 40 }}>
                {/* Crowd Level Badge */}
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(12px)', color: 'white', fontSize: '0.75rem', padding: '0.5rem 0.875rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
                  <Users style={{ width: '14px', height: '14px' }} />
                  <span style={{ fontWeight: '700', letterSpacing: '0.025em' }}>
                    {getCrowdLabel(activity.crowdLevel)}
                  </span>
                </div>
                {/* Physical Effort Badge */}
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(12px)', color: 'white', fontSize: '0.75rem', padding: '0.5rem 0.875rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
                  <Activity style={{ width: '14px', height: '14px' }} />
                  <span style={{ fontWeight: '700', letterSpacing: '0.025em' }}>
                    {getEffortLabel(activity.physicalEffort)}
                  </span>
                </div>
              </div>

              {/* Image Counter Overlay - Top Right */}
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(12px)', padding: '0.375rem 0.75rem', borderRadius: '9999px', zIndex: 40 }}>
                <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: '600' }}>
                  {currentImageIndex + 1}/{images.length}
                </span>
              </div>

              {/* Image Indicator Dots - Bottom */}
              <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '0.5rem', zIndex: 40 }}>
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: '8px',
                      width: idx === currentImageIndex ? '32px' : '8px',
                      backgroundColor: idx === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                      borderRadius: '9999px',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Content Section - Proper padding, never touches edges */}
            <div className="flex-1 overflow-y-auto px-6 pt-4 pb-2 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-1.5">
                {activity.name}
              </h2>
              <p className="text-sm text-gray-500 font-medium mb-3">
                {activity.description}
              </p>
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                Activities
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {activity.specificActivities}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Action Buttons - Bottom */}
        <div className="bg-white px-6 py-5 border-t border-gray-100">
          <div className="flex items-center justify-center gap-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAction('Pass')}
              className="h-16 w-16 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-xl flex items-center justify-center transition-colors active:shadow-2xl"
            >
              <X className="w-7 h-7" strokeWidth={3} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAction('Liked')}
              className="h-16 w-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center transition-colors active:shadow-2xl"
            >
              <Heart className="w-7 h-7" fill="currentColor" />
            </motion.button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <span className="text-xs font-semibold text-rose-500 w-16 text-center">Pass</span>
            <span className="text-xs font-semibold text-emerald-500 w-16 text-center">Like</span>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        activity={activity}
        swipeDirection={pendingSwipeDirection}
        onSubmit={handleFeedbackSubmit}
        onClose={handleFeedbackClose}
      />
    </div>
  );
};

export default CardView;
