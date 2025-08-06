"use client";

import Header from "@/components/Header";
import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "../../../generated/prisma";
import { Company } from "../../../generated/prisma";


type UwC = User & { company: Company };

interface UserContextType {
  user: UwC | null;
  setUser: (value: UwC | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default function Layout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UwC | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("http://localhost:3000/api/current-user");
        const data = await res.json();
        console.log("data", data);
        if (data.success) {
          setUser(data.data);
        }
      } catch (error: any) {
        console.log("Failed to fetch user:", error.message);
      }
    }

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      {children}
    </UserContext.Provider>
  );
}
