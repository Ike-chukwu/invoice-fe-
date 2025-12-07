"use client";
import React, { useState } from "react";
import InputField from "./UI/Input";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginPayload, loginSchema } from "@/services/login/schema";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useLogin } from "../hooks/useLogin";
import { toast } from "sonner";
import { EyeIcon, EyeOff, EyeOffIcon } from "lucide-react";

const LoginForm = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, formState } = methods;
  const router = useRouter();
  const { login, isLoading } = useLogin({
    onSuccess: () => toast.success("User successfully logged in"),
    onError: (err) => toast.error(err),
  });
  const submitFormHandler = (values: LoginPayload) => {
    login(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(submitFormHandler)}
        className="bg-white shadow-2xl rounded-lg flex-col z-50 w-[280px] md:w-[400px] py-3 px-5 lg:p-10 flex gap-8 items-center"
      >
        <div className="py-[1rem] flex items-center gap-2">
          <img src="/assets/logo.png" className="w-[40px] h-[40px]" alt="" />
          <h2 className="text-[20px] text-center font-bold text-[#8A91C5]">
            Login
          </h2>
        </div>{" "}
        <div className="flex flex-col w-full">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            labelClassName="text-[14px] font-bold capitalize text-[#8A91C5] pb-2"
            error={formState.errors.email?.message}
            inputClassName="px-4 py-4 border-[0.1px] w-full text-[14px] border-[#DFE3FA] "
          />
          <div className="relative pt-8 pb-2">
            <InputField
              placeholder="Enter password"
              label="Password"
              name="password"
              type={togglePassword ? "text" : "password"}
              labelClassName="text-[14px] font-bold capitalize text-[#8A91C5] "
              error={formState.errors.password?.message}
              inputClassName="px-4 py-4 border-[0.1px] w-full text-[14px] border-[#DFE3FA] "
            />
            {togglePassword ? (
              <EyeIcon
                onClick={() => setTogglePassword(false)}
                className="absolute cursor-pointer translate-y-[-50%] top-[70%] right-[4%]"
              />
            ) : (
              <EyeOffIcon
                onClick={() => setTogglePassword(true)}
                className="absolute cursor-pointer translate-y-[-50%] top-[70%] right-[4%]"
              />
            )}
          </div>
        </div>
        <div className="self-end flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="text-xs p-4 md:px-6 py-4 hover:opacity-80 capitalize rounded-3xl bg-[#9277FF] font-bold text-white"
          >
            Continue
            {isLoading && (
              <ClipLoader className="ml-1" size={10} color="white" />
            )}
          </button>
        </div>
        <p
          onClick={() => router.push("/signup")}
          className="text-[12px] hover:underline cursor-pointer md:text-[14px] text-[#8A91C5] text-center self-center"
        >
          First time using our app?{" "}
          <span className="text-bold   text-black">Create an account</span>{" "}
        </p>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
