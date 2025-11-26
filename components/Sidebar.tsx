"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { LogOutIcon } from "./icons";
import { useLogout } from "@/hooks/useLogout";
import { toast } from "sonner";

const Sidebar = () => {
  const [user, setUser] = useState("");
  const { logout } = useLogout({
    onSuccess: () => toast.success("User has successfully logged out"),
    onError: () => toast.success("User couldn't log out"),
  });
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setUser(email.substring(0, 2).toUpperCase());
    }
  }, []);

  return (
    <div className="fixed z-40 flex pr-4 lg:pr-0 lg:flex-col lg:items-center lg:w-[100px] justify-between left-0 top-0 w-full lg:bottom-0 lg:rounded-tr-[1.2rem] lg:rounded-br-[1.2rem] bg-[#373B53]">
      <img
        src="/assets/logo.png"
        className="w-[70px] h-[70px] lg:w-auto lg:h-auto"
        alt=""
      />
      <div className="flex gap-4 lg:w-full lg:flex-col items-center lg:gap-8 lg:py-6">
        <div className="hidden lg:block">
          <LogOutIcon
            className="text-[#7C5DFA] w-9 cursor-pointer hover:opacity-70"
            onClick={logout}
          />
        </div>
        {!user ? (
          <ClipLoader />
        ) : (
          <div className="w-full  pl-4 lg:pl-0   h-full lg:h-auto items-center  flex lg:pt-5 justify-center lg:border-t-2 lg:border-t-[#494E6E] ">
            <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-red-500">
              {user}
            </div>
          </div>
        )}
        <div className="lg:hidden w-full border-l-2 border-l-[#494E6E] pl-4 lg:pl-0   h-full lg:h-auto items-center  flex lg:pt-5 justify-center lg:border-t-2 lg:border-t-[#494E6E] ">
          <div className="block lg:hidden">
            <LogOutIcon
              onClick={logout}
              className="text-[#7C5DFA] w-7 cursor-pointer hover:opacity-70"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
