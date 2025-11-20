"use client";
import Loader from "@/components/Loader";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const { replace } = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      replace("/");
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  if (isCheckingAuth) return <Loader />;

  return (
    <div
      className={
        " h-screen w-full flex items-center justify-center"
      }
    >
      <LoginForm />
    </div>
  );
};

export default Login;
