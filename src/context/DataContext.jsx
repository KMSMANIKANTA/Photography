import React, { createContext, useContext, useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpeg";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userImages, setUserImages] = useState([
    {
      id: 1,
      url: img1,
      imgname: "Campus Sunset",
      description: "Beautiful sunset captured at the main campus building",
      photographer: "John Doe",
      likes: 24,
      shares: 12,
    },
    {
      id: 2,
      url: img2,
      imgname: "Student Life",
      description: "Students enjoying their break time in the campus garden",
      photographer: "Jane Smith",
      likes: 18,
      shares: 8,
    },
  ]);

  const [galleryImages, setGalleryImages] = useState([
    {
      url: img3,
      imgname: "Campus Life",
      description: "A vibrant day in the life of our campus",
      photographer: "John Doe",
      likes: 42,
      shares: 15,
    },
    {
      url: img4,
      imgname: "Evening Lights",
      description: "The campus illuminated by evening lights",
      photographer: "Jane Smith",
      likes: 35,
      shares: 10,
    },
    {
      url: img5,
      imgname: "Nature Walk",
      description: "Exploring the natural beauty of our campus",
      photographer: "Mike Wilson",
      likes: 28,
      shares: 7,
    },
  ]);

  const addUserImage = (image) => {
    setUserImages((prev) => [image, ...prev]);
  };

  const updateImageLikes = (imageId) => {
    setUserImages((prev) =>
      prev.map((img) =>
        img.id === imageId ? { ...img, likes: img.likes + 1 } : img
      )
    );
  };

  const updateGalleryImageLikes = (imageUrl) => {
    setGalleryImages((prev) =>
      prev.map((img) =>
        img.url === imageUrl ? { ...img, likes: img.likes + 1 } : img
      )
    );
  };

  const updateImageShares = (imageId) => {
    setUserImages((prev) =>
      prev.map((img) =>
        img.id === imageId ? { ...img, shares: img.shares + 1 } : img
      )
    );
  };

  const updateGalleryImageShares = (imageUrl) => {
    setGalleryImages((prev) =>
      prev.map((img) =>
        img.url === imageUrl ? { ...img, shares: img.shares + 1 } : img
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        userImages,
        galleryImages,
        addUserImage,
        updateImageLikes,
        updateGalleryImageLikes,
        updateImageShares,
        updateGalleryImageShares,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
