"use client";
import LoginForm from "@/components/LoginForm";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [isAuthModalForLoginFormActive, setisAuthModalForLoginFormActive] =
    useState(true);
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      replace("/");
    }
    setIsCheckingAuth(false);
  }, [pathname]);

  if (isCheckingAuth)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-center text-[15px]">Loading</p>
      </div>
    );

  return (
    <div
      className={
        "transition-colors duration-300 bg-overlay-color fixed inset-0 min-h-[100vh] w-full z-20  flex items-center justify-center"
      }
    >
      <LoginForm
        isModalActive={isAuthModalForLoginFormActive}
        setIsModalActive={setisAuthModalForLoginFormActive}
      />
    </div>
  );
};

export default Login;
