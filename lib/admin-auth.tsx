"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Simple hash function for password comparison (client-side)
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

const ADMIN_SESSION_KEY = "portfolio_admin_session";
const SESSION_EXPIRY_HOURS = 24;

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const session = localStorage.getItem(ADMIN_SESSION_KEY);
    if (session) {
      try {
        const { expiry } = JSON.parse(session);
        if (new Date().getTime() < expiry) {
          setIsAdmin(true);
        } else {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((password: string): boolean => {
    // The admin password is set via environment variable
    // Default password is "admin123" - CHANGE THIS IN PRODUCTION!
    const adminPasswordHash = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH || hashPassword("admin123");
    const inputHash = hashPassword(password);

    if (inputHash === adminPasswordHash) {
      const session = {
        authenticated: true,
        expiry: new Date().getTime() + (SESSION_EXPIRY_HOURS * 60 * 60 * 1000),
      };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdmin(false);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

// Helper to generate password hash (run this in browser console to generate hash for your password)
// console.log("Hash for your password:", hashPassword("your-password-here"));
