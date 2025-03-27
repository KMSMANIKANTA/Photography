import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const Gallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1682687220063-4742bd7c98d6",
      title: "Campus Life",
      photographer: "John Doe",
      likes: 42,
      comments: 8,
    },
    {
      url: "https://images.unsplash.com/photo-1682687220795-796d3f6f7000",
      title: "Evening Lights",
      photographer: "Jane Smith",
      likes: 35,
      comments: 5,
    },
    {
      url: "https://images.unsplash.com/photo-1682687220742-aba19b51f319",
      title: "Nature Walk",
      photographer: "Mike Wilson",
      likes: 28,
      comments: 3,
    },
    // Add more images as needed
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative group">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View Details
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  By {image.photographer}
                </p>

                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                    <span>{image.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>{image.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
