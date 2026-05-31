import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  adminContent: Record<string, any>;
  updateContent: (key: string, value: any) => void;
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  adminContent: {},
  updateContent: () => {},
});

const ADMIN_PASSWORD = "admin123"; // Change this to your desired password

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("adminAuth") === "true";
  });

  const [adminContent, setAdminContent] = useState(() => {
    const saved = localStorage.getItem("adminContent");
    return saved ? JSON.parse(saved) : getDefaultContent();
  });

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
  };

  const updateContent = (key: string, value: any) => {
    const updated = { ...adminContent, [key]: value };
    setAdminContent(updated);
    localStorage.setItem("adminContent", JSON.stringify(updated));
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, adminContent, updateContent }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);

function getDefaultContent() {
  return {
    phone: "+97433555918",
    email: "info@alnoortents.com",
    address: "Dubai, United Arab Emirates",
    whatsapp: "https://wa.me/97433555918",
    instagram: "https://instagram.com/alnoortents",
    facebook: "https://facebook.com/alnoortents",
    stats: {
      projects: 183,
      years: 9,
      clients: 458,
      countries: 7,
    },
    testimonials: [
      {
        id: 1,
        text: "The wedding tent from Al Noor was absolutely stunning. Our clients were amazed by the quality and elegance. The team delivered on time and exceeded all expectations. Highly recommended for luxury events.",
        author: "Sarah Thompson",
        role: "Wedding Planner, Abu Dhabi",
      },
    ],
  };
}
