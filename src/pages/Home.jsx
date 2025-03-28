import React from "react";
import HeroComponent from "../components/HeroComponent";
import TopImagesComponent from "../components/TopImagesComponent";
import AboutComponent from "../components/AboutComponent";
import FooterComponent from "../components/FooterComponent";
import WebTeam from "../components/WebTeam";

const Home = () => {
  return (
    <div className="pt-16 sm:pt-20">
      <HeroComponent />
      <AboutComponent />
      <TopImagesComponent />
      <WebTeam />
      <FooterComponent />
    </div>
  );
};

export default Home;
