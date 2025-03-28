import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Camera,
  Heart,
  MessageCircle,
  Share2,
  User,
  Mail,
  X,
  Plus,
} from "lucide-react";
import { useData } from "../context/DataContext";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { userImages, addUserImage, updateImageLikes, updateImageShares } =
    useData();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedImage && imageName && description) {
      const newImage = {
        id: userImages.length + 1,
        url: previewUrl,
        imgname: imageName,
        description: description,
        photographer: "John Doe", // You can replace this with actual user name
        likes: 0,
        shares: 0,
      };
      addUserImage(newImage);
      setSelectedImage(null);
      setPreviewUrl(null);
      setImageName("");
      setDescription("");
      setShowUploadForm(false);
    }
  };

  const handleLike = (e, imageId) => {
    e.stopPropagation();
    updateImageLikes(imageId);
  };

  const handleShare = (e, image) => {
    e.stopPropagation();
    const shareUrl = `${
      window.location.origin
    }/profile?image=${encodeURIComponent(image.url)}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("Link copied to clipboard!");
        updateImageShares(image.id);
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
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
              className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Upload Photo</span>
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          My Photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {userImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                      onClick={(e) => handleLike(e, image.id)}
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
            onClick={() => setSelectedImage(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedImage(null)}
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

      <AnimatePresence>
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowUploadForm(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowUploadForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
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
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
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
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter image description"
                    rows="3"
                  />
                </div>

                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg tracking-wide border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                    <Plus className="w-8 h-8 text-gray-600 dark:text-gray-400" />
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
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={handleUpload}
                      className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Upload
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
