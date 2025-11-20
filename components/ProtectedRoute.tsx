"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ComponentType } from "react";
import Loader from "./Loader";

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.replace("/login");
      } else {
        setIsChecking(false);
      }
    }, [router]);

    if (isChecking) return <Loader />;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default WithAuth;
