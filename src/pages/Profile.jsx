import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Camera, Heart, Share2, User, Mail, X, Plus } from "lucide-react";
import { useData } from "../context/DataContext";

const Profile = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedImageUrl, setSelectedImageUrl] = useState(null); // Store only the image URL
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Access global state and functions
  const {
    userImages,
    addUserImage,
    toggleLikeGalleryImage,
    handleShareGalleryImage,
  } = useData();

  // Dynamically derive the selected image from the global state
  const selectedImage =
    selectedImageUrl &&
    userImages.find((image) => image.url === selectedImageUrl);

  // Handle image selection for upload
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload
  const handleUpload = () => {
    if (previewUrl && imageName && description) {
      const newImage = {
        id: userImages.length + 1,
        url: previewUrl,
        imgname: imageName,
        description: description,
        photographer: "John Doe", // Replace with actual user name
        likes: 0,
        shares: 0,
        likedByUser: false,
        sharedByUser: false,
      };
      addUserImage(newImage);
      setPreviewUrl(null);
      setImageName("");
      setDescription("");
      setShowUploadForm(false);
    }
  };

  // Handle like action
  const handleLike = (e, imageUrl) => {
    e.stopPropagation();
    toggleLikeGalleryImage(imageUrl);
  };

  // Handle share action
  const handleShare = (e, imageUrl) => {
    e.stopPropagation();
    handleShareGalleryImage(imageUrl);
  };

  return (
    <section
      ref={ref}
      className="min-h-screen py-16 bg-gradient-to-b from-indigo-50 to-purple-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-transparent hover:border-indigo-500 dark:hover:border-purple-500">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 mb-2">
                  John Doe
                </h1>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="text-sm sm:text-base">
                    john.doe@rguktn.ac.in
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowUploadForm(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Upload Photo</span>
            </button>
          </div>
        </div>

        {/* My Photos Section */}
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
          My Photos
        </motion.h2>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedImageUrl(image.url)}
              className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl cursor-pointer border border-transparent hover:border-indigo-500 dark:hover:border-purple-500">
              <div className="p-4">
                <img
                  src={image.url}
                  alt={image.imgname}
                  className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
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
                      className={`flex items-center space-x-1 ${
                        image.likedByUser
                          ? "text-red-500 dark:text-red-400"
                          : "hover:text-red-500 dark:hover:text-red-400"
                      }`}>
                      <Heart className="w-5 h-5" />
                      <span>{image.likes}</span>
                    </button>
                    <button
                      onClick={(e) => handleShare(e, image.url)}
                      className={`flex items-center space-x-1 ${
                        image.sharedByUser
                          ? "text-blue-500 dark:text-blue-400"
                          : "hover:text-blue-500 dark:hover:text-blue-400"
                      }`}>
                      <Share2 className="w-5 h-5" />
                      <span>{image.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pop-up Box */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImageUrl(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden relative p-6"
              onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedImageUrl(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300">
                <X className="w-6 h-6" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.imgname}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
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
                  <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => handleLike(e, selectedImage.url)}
                        className={`flex items-center space-x-1 ${
                          selectedImage.likedByUser
                            ? "text-red-500 dark:text-red-400"
                            : "hover:text-red-500 dark:hover:text-red-400"
                        }`}>
                        <Heart className="w-5 h-5" />
                        <span>{selectedImage.likes} likes</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => handleShare(e, selectedImage.url)}
                        className={`flex items-center space-x-1 ${
                          selectedImage.sharedByUser
                            ? "text-blue-500 dark:text-blue-400"
                            : "hover:text-blue-500 dark:hover:text-blue-400"
                        }`}>
                        <Share2 className="w-5 h-5" />
                        <span>{selectedImage.shares} shares</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Form */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUploadForm(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowUploadForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 mb-6">
                Upload New Photo
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image Name
                  </label>
                  <input
                    type="text"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter image name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description (max 20 words)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={100}
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter image description"
                    rows="3"
                  />
                </div>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg tracking-wide border border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                    <Plus className="w-8 h-8 text-indigo-500 dark:text-purple-500" />
                    <span className="mt-2 text-base text-gray-600 dark:text-gray-400">
                      Select an image
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageSelect}
                    />
                  </label>
                </div>
                {previewUrl && (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    <button
                      onClick={handleUpload}
                      className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all">
                      Upload
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Profile;
