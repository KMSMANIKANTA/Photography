import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TopImagesComponent = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const topImages = [
    {
      url: "https://images.unsplash.com/photo-1682687220742-aba19b51f319",
      title: "Sunset at Campus",
      photographer: "John Doe",
      likes: 42,
    },
    {
      url: "https://images.unsplash.com/photo-1682687220063-4742bd7c98d6",
      title: "Campus Architecture",
      photographer: "Jane Smith",
      likes: 35,
    },
    {
      url: "https://images.unsplash.com/photo-1682687220795-796d3f6f7000",
      title: "Student Life",
      photographer: "Mike Johnson",
      likes: 28,
    },
  ];

  return (
    <section ref={ref} className="min-h-screen py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-neon-purple dark:neon-text">
          Top Images of the Week
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {image.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  By {image.photographer}
                </p>
                <div className="mt-2 flex items-center text-gray-600 dark:text-gray-300">
                  <span className="text-red-500">❤️</span>
                  <span className="ml-1">{image.likes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopImagesComponent;
