import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "John Doe",
    role: "Frontend Developer",
    year: "3rd Year",
  },
  {
    name: "Jane Smith",
    role: "Backend Developer",
    year: "2nd Year",
  },
  {
    name: "Alex Johnson",
    role: "UI/UX Designer",
    year: "4th Year",
  },
];

const WebTeam = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Web Team
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {member.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Role: <span className="font-medium">{member.role}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Year: <span className="font-medium">{member.year}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WebTeam;
