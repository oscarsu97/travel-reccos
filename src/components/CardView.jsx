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
            <div className="relative bg-gray-200 mx-4 mt-4 rounded-3xl overflow-hidden" style={{ height: '55vh' }}>
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

              {/* Badges - Top Left (Absolute inside image) */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {/* Crowd Level Badge */}
                <div className="bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Users className="w-3.5 h-3.5" />
                  <span className="font-semibold">
                    {activity.crowdLevel}
                  </span>
                </div>
                {/* Physical Effort Badge */}
                <div className="bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="font-semibold">
                    {activity.physicalEffort}
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
