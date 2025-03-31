import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const FooterComponent = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 neon-text">
              Contact Information
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>RGUKT Nuzvid Campus</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Nuzvid, Krishna District</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Andhra Pradesh - 521202</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Email: photography@rguktn.ac.in</span>
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 neon-text">
              Follow Us
            </h3>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-blue-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-red-500 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 RGUKT Photography Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
