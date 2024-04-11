"use client";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "../ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthContextProvider>{children}</AuthContextProvider>
      <Toaster />
    </>
  );
}
