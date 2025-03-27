import React from "react";

const WebTeam = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      year: "3rd Year",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    },
    {
      name: "Jane Smith",
      role: "Backend Developer",
      year: "2nd Year",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
    },
    {
      name: "Alex Johnson",
      role: "UI/UX Designer",
      year: "4th Year",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Meet Our Web Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-aqua dark:border-purple p-4 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {member.role}
                </p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">
                  {member.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebTeam;
