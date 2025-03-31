import React, { createContext, useContext, useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpeg";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Initial gallery images state
  const [galleryImages, setGalleryImages] = useState([
    {
      url: img1,
      imgname: "Campus Sunset",
      description: "Beautiful sunset captured at the main campus building",
      photographer: "John Doe",
      likes: 24,
      shares: 12,
      likedByUser: false, // Tracks if the user has liked the image
      sharedByUser: false, // Tracks if the user has shared the image
    },
    {
      url: img2,
      imgname: "Student Life",
      description: "Students enjoying their break time in the campus garden",
      photographer: "Jane Smith",
      likes: 18,
      shares: 8,
      likedByUser: false,
      sharedByUser: false,
    },
    {
      url: img3,
      imgname: "Campus Life",
      description: "A vibrant day in the life of our campus",
      photographer: "John Doe",
      likes: 42,
      shares: 15,
      likedByUser: false,
      sharedByUser: false,
    },
    {
      url: img4,
      imgname: "Evening Lights",
      description: "The campus illuminated by evening lights",
      photographer: "Jane Smith",
      likes: 35,
      shares: 10,
      likedByUser: false,
      sharedByUser: false,
    },
    {
      url: img5,
      imgname: "Nature Walk",
      description: "Exploring the natural beauty of our campus",
      photographer: "Mike Wilson",
      likes: 28,
      shares: 7,
      likedByUser: false,
      sharedByUser: false,
    },
  ]);

  // Initial user images state
  const [userImages, setUserImages] = useState([
    {
      id: 1,
      url: img1,
      imgname: "My First Shot",
      description: "My first photograph of the campus sunset",
      photographer: "John Doe",
      likes: 15,
      shares: 5,
    },
    {
      id: 2,
      url: img2,
      imgname: "Campus Life",
      description: "A day in the life at RGUKT",
      photographer: "John Doe",
      likes: 20,
      shares: 8,
    },
  ]);

  // Function to add a new user image
  const addUserImage = (newImage) => {
    setUserImages((prev) => [...prev, newImage]);
  };

  // Function to update image likes for user images
  const updateImageLikes = (imageId) => {
    setUserImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? {
              ...img,
              likes: img.likes + 1,
            }
          : img
      )
    );
  };

  // Function to update image shares for user images
  const updateImageShares = (imageId) => {
    setUserImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? {
              ...img,
              shares: img.shares + 1,
            }
          : img
      )
    );
  };

  // Function to toggle like (supports liking and disliking)
  const toggleLikeGalleryImage = (imageUrl) => {
    setGalleryImages((prev) =>
      prev.map((img) =>
        img.url === imageUrl
          ? {
              ...img,
              likes: img.likedByUser ? img.likes - 1 : img.likes + 1, // Decrement or increment likes
              likedByUser: !img.likedByUser, // Toggle the likedByUser flag
            }
          : img
      )
    );
  };

  // Function to handle share (prevents duplicate shares)
  const handleShareGalleryImage = (imageUrl) => {
    setGalleryImages((prev) =>
      prev.map((img) =>
        img.url === imageUrl && !img.sharedByUser
          ? {
              ...img,
              shares: img.shares + 1, // Increment shares only once
              sharedByUser: true, // Mark as shared by the user
            }
          : img
      )
    );

    // Construct a shareable URL
    const shareUrl = `${
      window.location.origin
    }/gallery?image=${encodeURIComponent(imageUrl)}`;

    // Copy the shareable URL to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(`Link copied to clipboard: ${shareUrl}`);
    });
  };

  return (
    <DataContext.Provider
      value={{
        galleryImages,
        toggleLikeGalleryImage,
        handleShareGalleryImage,
        userImages,
        addUserImage,
        updateImageLikes,
        updateImageShares,
      }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to access the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
