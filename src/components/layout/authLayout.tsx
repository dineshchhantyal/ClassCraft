"use client";
import { useAuthContext as useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React from "react";
import Layout from "./layout";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAuth();
  const router = useRouter();
  console.log("user", user);
  React.useEffect(() => {
    console.log(user);
    if (user.userInfo == null) {
      router.push("/signin");
    }
  }, [router, user]);

  return (
    <>
      {/* greet user */}
      {user.userInfo ? (
        <div className=" bg-gray-100 p-4 pl-16">
          Hi, {user.userInfo.displayName?.toLowerCase() ?? ""}
        </div>
      ) : null}
      {children}
    </>
  );
};

export default AuthLayout;
