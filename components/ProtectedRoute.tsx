"use client";
import { ReactElement, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ComponentType } from "react";
import { getAccessToken } from "@/stores/auth-store";
// import { userDataStore } from "../store/userdatastore";
// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
// import Loader from "../components/Loader.json";
// import dynamic from "next/dynamic";
//come and check the loader compoentns styling so it prevents other things from showing

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const [isChecking, setIsChecking] = useState(true);
    const [hasToken, setHasToken] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setHasToken(false);
        router.push("/login");
      } else {
        setHasToken(true);
      }
      setIsChecking(false);
    }, [router]);

    if (isChecking)
      return (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-[15px]">Loading</p>
        </div>
      );

    // if (!accessToken) {
    //   return <p>Loading</p>;
    // }

    return hasToken ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
};

export default WithAuth;
