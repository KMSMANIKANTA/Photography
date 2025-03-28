import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Share2, Heart, X } from "lucide-react";
import { useData } from "../context/DataContext";

const TopImagesComponent = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { galleryImages, updateGalleryImageLikes, updateGalleryImageShares } =
    useData();
  const topImages = galleryImages.slice(0, 3);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  const handleLike = (e, imageUrl) => {
    e.stopPropagation();
    updateGalleryImageLikes(imageUrl);
  };

  const handleShare = (e, image) => {
    e.stopPropagation();
    const shareUrl = `${
      window.location.origin
    }/gallery?image=${encodeURIComponent(image.url)}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("Link copied to clipboard!");
        updateGalleryImageShares(image.url);
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
      });
  };

  return (
    <section
      ref={ref}
      className="min-h-screen py-16 bg-gradient-to-b from-indigo-50 to-purple-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-neon-purple dark:to-neon-blue">
          Top Images of the Week
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topImages.map((image, index) => (
            <motion.div
              key={image.url}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedImage(image)}
              className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl cursor-pointer border border-transparent hover:border-indigo-500 dark:hover:border-purple-500">
              {/* Card Image */}
              <div className="p-4">
                <img
                  src={image.url}
                  alt={image.imgname}
                  className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              {/* Card Content */}
              <div className="px-6 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {image.imgname}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  By {image.photographer}
                </p>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => handleLike(e, image.url)}
                      className="flex items-center space-x-1 hover:text-red-500 dark:hover:text-red-400">
                      <Heart className="w-5 h-5" />
                      <span>{image.likes}</span>
                    </button>
                    <button
                      onClick={(e) => handleShare(e, image)}
                      className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400">
                      <Share2 className="w-5 h-5" />
                      <span>{image.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-opacity duration-300">
                <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pop-Up */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={handleClosePopup}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden relative p-6"
              onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300">
                <X className="w-6 h-6" />
              </button>
              {/* Pop-Up Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side (Image) */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.imgname}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                {/* Right Side (Details) */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedImage.imgname}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedImage.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Photographer: {selectedImage.photographer}
                  </p>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span>{selectedImage.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-5 h-5 text-blue-500" />
                      <span>{selectedImage.shares} shares</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TopImagesComponent;
