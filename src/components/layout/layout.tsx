"use client";
import { AuthContextProvider, useAuthContext } from "@/context/AuthContext";
import { Toaster } from "../ui/toaster";
import { Inter } from "next/font/google";
import DefaultHeader from "../header/defaultHeader";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <AuthContextProvider>
        <DefaultHeader />

        {children}
        <Toaster />
      </AuthContextProvider>
    </div>
  );
}
