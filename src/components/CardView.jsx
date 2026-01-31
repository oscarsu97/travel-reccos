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

  // Helper function to get badge colors
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Mobile Container - Strict max-w-md and h-screen */}
      <div className="w-full max-w-md h-screen flex flex-col overflow-hidden bg-white shadow-2xl">
        
        {/* Progress Bar */}
        <div className="bg-white px-4 py-3 border-b border-gray-200">
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
            {/* Image Section - 60% of screen height */}
            <div className="relative bg-gray-200" style={{ height: '60vh' }}>
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
                />
              </AnimatePresence>

              {/* Image Navigation Buttons */}
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg pointer-events-auto"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg pointer-events-auto"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </motion.button>
              </div>

              {/* Badges - Top Left */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {/* Crowd Level Badge */}
                <div className={`${getCrowdColor(activity.crowdLevel)} backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5`}>
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-semibold">
                    {activity.crowdLevel}
                  </span>
                </div>
                {/* Physical Effort Badge */}
                <div className={`${getEffortColor(activity.physicalEffort)} backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5`}>
                  <Activity className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-semibold">
                    {activity.physicalEffort} Effort
                  </span>
                </div>
              </div>

              {/* Image Counter Overlay - Top Right */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full">
                <span className="text-white text-xs font-semibold">
                  {currentImageIndex + 1}/{images.length}
                </span>
              </div>

              {/* Image Indicator Dots - Bottom */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content Section - Scrollable if needed */}
            <div className="flex-1 overflow-y-auto px-6 py-5 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {activity.name}
              </h2>
              <p className="text-sm text-gray-500 font-medium mb-4">
                {activity.description}
              </p>
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Activities
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {activity.specificActivities}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Fixed Action Buttons - Bottom */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction('Pass')}
              className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 active:bg-red-600 transition-colors"
            >
              <X className="w-6 h-6" strokeWidth={3} />
              Pass
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction('Liked')}
              className="flex-1 py-4 bg-green-500 text-white rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 active:bg-green-600 transition-colors"
            >
              <Heart className="w-6 h-6" fill="currentColor" />
              Like
            </motion.button>
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
