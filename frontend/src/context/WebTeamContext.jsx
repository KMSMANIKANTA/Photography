import React, { createContext, useContext } from "react";

const WebTeamContext = createContext();

export const useWebTeam = () => {
  const context = useContext(WebTeamContext);
  if (!context) {
    throw new Error("useWebTeam must be used within a WebTeamProvider");
  }
  return context;
};

export const WebTeamProvider = ({ children }) => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      year: "3rd Year",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "john.doe@rguktn.ac.in",
    },
    {
      name: "Jane Smith",
      role: "Backend Developer",
      year: "2nd Year",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "jane.smith@rguktn.ac.in",
    },
    {
      name: "Alex Johnson",
      role: "UI/UX Designer",
      year: "4th Year",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "alex.johnson@rguktn.ac.in",
    },
  ];

  return (
    <WebTeamContext.Provider value={{ teamMembers }}>
      {children}
    </WebTeamContext.Provider>
  );
};
