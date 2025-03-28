import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, X } from "lucide-react";
import { useData } from "../context/DataContext";

const Gallery = () => {
  const { galleryImages, updateGalleryImageLikes, updateGalleryImageShares } =
    useData();
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
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-neon-blue dark:neon-text">
            Gallery
          </h1>
          <div className="flex space-x-4">
            <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2">
              <option value="recent">Recent</option>
              <option value="popular">Popular</option>
              <option value="trending">Trending</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedImage(image)}
              className="relative group bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="p-4">
                <img
                  src={image.url}
                  alt={image.imgname}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="px-4 pb-4">
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
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100">
                  View Details
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleClosePopup}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.imgname}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedImage.imgname}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedImage.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Photographer: {selectedImage.photographer}
                  </p>
                  <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5" />
                      <span>{selectedImage.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-5 h-5" />
                      <span>{selectedImage.shares} shares</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
