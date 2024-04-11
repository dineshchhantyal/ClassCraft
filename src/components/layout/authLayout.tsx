"use client";
import { useAuthContext as useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    console.log(user);
    if (user == null) {
      router.push("/signin");
    }
  }, [router, user]);

  return <>{children}</>;
};

export default AuthLayout;
