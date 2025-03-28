import React from "react";
import about from "../assets/about.png";

const AboutComponent = () => {
  return (
    <section
      className="about-section min-h-screen py-8 sm:py-12 md:py-16 bg-gray-50 dark:bg-gray-900"
      id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
              About the Photography Club
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                Welcome to the Photography Club at RGUKT Nuzvid! Our club is a
                vibrant community of creative minds dedicated to capturing
                life's beautiful moments. Whether you're a seasoned photographer
                or a curious beginner, we provide the tools, guidance, and
                platform to explore your passion.
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                From workshops and photo walks to competitions and exhibitions,
                we aim to nurture the artistic vision of our members. Join us to
                learn, create, and share your unique perspective with the world.
              </p>
            </div>
          </div>

          {/* Right Section (Single Image) */}
          <div className="relative order-1 lg:order-2">
            <div className="w-full max-w-lg mx-auto">
              <div className="relative aspect-auto">
                <img
                  src={about}
                  alt="About the Photography Club"
                  className="rounded-lg shadow-lg object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
