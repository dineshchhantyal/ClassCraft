"use client";
import { AuthContextProvider } from "@/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthContextProvider>{children}</AuthContextProvider>
    </>
  );
}
