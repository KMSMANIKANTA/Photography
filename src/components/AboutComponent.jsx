import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutComponent = () => {
  // Array of working images related to college activities
  const images = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", // Classroom
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", // Campus
    "https://images.unsplash.com/photo-1531030874896-9f6c5ae379b1", // Students
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc", // Library
    "https://images.unsplash.com/photo-1593642532973-d31b6557fa68", // Technology
  ];

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section
      className="about-section py-16 bg-gray-50 dark:bg-gray-900"
      id="about">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
            About the Photography Club
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            Welcome to the Photography Club at RGUKT Nuzvid! Our club is a
            vibrant community of creative minds dedicated to capturing life's
            beautiful moments. Whether you're a seasoned photographer or a
            curious beginner, we provide the tools, guidance, and platform to
            explore your passion.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            From workshops and photo walks to competitions and exhibitions, we
            aim to nurture the artistic vision of our members. Join us to learn,
            create, and share your unique perspective with the world.
          </p>
        </div>

        {/* Right Section (Carousel) */}
        <div className="relative">
          <Slider {...settings}>
            {images.map((src, index) => (
              <div key={index} className="p-2">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="rounded-lg shadow-lg object-cover w-full h-64 sm:h-80 md:h-96"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
