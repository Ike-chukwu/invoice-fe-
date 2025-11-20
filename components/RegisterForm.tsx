"use client";
import React, { useState } from "react";
import InputField from "./UI/Input";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterPayload, registerSchema } from "@/services/register/schema";
import { useRegister } from "@/hooks/useRegister";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const RegisterForm = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { push } = useRouter();
  const { signup, isLoading } = useRegister({
    onError: () => toast.error("Registration process failed"),
    onSuccess: () => {
      toast.success("User successfuly created!");
    },
  });
  const submitFormHandler = async (values: RegisterPayload) => {
    signup(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitFormHandler)}
        className="bg-white shadow-2xl items-center rounded-lg transition-all flex-col w-[280px] gap-8  md:w-[400px] py-8 px-5 lg:p-10 flex "
      >
        <div className="py-[1rem] flex items-center gap-2">
          <img src="/assets/logo.png" className="w-[40px] h-[40px]" alt="" />
          <h2 className="text-[20px] text-center font-bold text-[#8A91C5]">
            Register
          </h2>
        </div>
        <div className="flex flex-col w-full">
          <InputField
            label="Email"
            name="email"
            placeholder="Enter email"
            type="email"
            labelClassName="text-[14px] font-bold capitalize text-[#8A91C5] pb-1 lg:pb-2"
            error={methods.formState.errors.email?.message}
            inputClassName="px-4 py-4 border-[0.1px] w-full text-[14px] border-[#DFE3FA] "
          />
          <div className="relative pt-8 pb-2">
            <InputField
              label="Password"
              name="password"
              placeholder="At least 6 characters"
              type={togglePassword ? "text" : "password"}
              labelClassName="text-[14px] font-bold capitalize text-[#8A91C5] pt-8  pb-1 lg:pb-2"
              error={methods.formState.errors.password?.message}
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
            className="text-xs p-4 md:px-6 py-4 capitalize hover:opacity-80 rounded-3xl bg-[#9277FF] font-bold text-white"
          >
            Continue
            {isLoading && (
              <ClipLoader className="ml-1" size={10} color="white" />
            )}
          </button>
        </div>
        <p
          onClick={() => push("login")}
          className="text-[12px] hover:underline cursor-pointer md:text-[14px] text-[#8A91C5] text-center self-center"
        >
          Already have an account?
          <span className="text-bold  text-black">Log in</span>
        </p>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
