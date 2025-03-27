import React from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ParticleBackground from "./ParticleBackground";

const HeroComponent = () => {
  return (
    // Section container with relative positioning
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* ParticleBackground spans the entire HeroComponent */}
      <ParticleBackground />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 sm:mb-8">
          <Camera className="w-24 h-24 sm:w-32 sm:h-32 mx-auto text-blue-600 dark:text-blue-400 rotate-3d" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
          <span className="text-blue-600 dark:text-blue-400">RGUKT</span>{" "}
          Photography Club
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Capture moments, create memories
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 sm:mt-12">
          {/* Use Link to navigate to the gallery page */}
          <Link
            to="/gallery"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
            Explore Gallery
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroComponent;
