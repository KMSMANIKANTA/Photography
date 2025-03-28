import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { useWebTeam } from "../context/WebTeamContext";

const WebTeam = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { teamMembers } = useWebTeam();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [teamMembers.length]);

  const slideVariants = {
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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + teamMembers.length) % teamMembers.length);
  };

  return (
    <section className="min-h-screen py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400 mb-4">
            Meet Our Web Team
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The talented individuals behind the scenes who make this photography
            platform possible.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full max-w-md">
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-gray-200 dark:border-gray-700">
                  {/* Member Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={teamMembers[currentIndex].image}
                      alt={teamMembers[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Member Info */}
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {teamMembers[currentIndex].name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {teamMembers[currentIndex].role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {teamMembers[currentIndex].year}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center justify-center space-x-4">
                      <a
                        href={teamMembers[currentIndex].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={teamMembers[currentIndex].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={`mailto:${teamMembers[currentIndex].email}`}
                        className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors z-10">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors z-10">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Dots Indicator - Now below the card */}
          <div className="mt-6 flex space-x-3">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-500 w-6"
                    : "bg-gray-300 dark:bg-gray-600 w-2.5"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebTeam;
