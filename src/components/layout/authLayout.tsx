"use client";
import { useAuthContext as useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return <h1>Only logged in users can view this page</h1>;
};

export default AuthLayout;
