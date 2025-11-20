"use client";
import Loader from "@/components/Loader";
import RegisterForm from "@/components/RegisterForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Signup = () => {
  const [isChecking, setIsChecking] = useState(true);
  const { replace } = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      replace("/");
    } else {
      setIsChecking(false);
    }
  }, []);

  if (isChecking) return <Loader />;
  return (
    <div
      className={
        "w-full h-screen flex items-center justify-center"
      }
    >
      <RegisterForm />
    </div>
  );
};

export default Signup;
