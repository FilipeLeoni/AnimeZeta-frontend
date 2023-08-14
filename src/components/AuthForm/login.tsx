"use client";
import React, { useState } from "react";
import { Input } from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/utils/Schemas/LoginSchema";
import { toast } from "react-toastify";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";
import { EnvelopeSimple, Eye } from "@phosphor-icons/react";
import Link from "next/link";
import PrimaryButton from "../Buttons/PrimaryButton";
import Spinner from "../SpinnerLoading";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: zodResolver(LoginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const api = useApi();

  const handleSubmitForm: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      const response = await api.login(data.email, data.password);

      if (response) {
        toast.success("Login Successfully!", {
          position: "top-right",
          theme: "light",
        });

        auth?.handleLogin(response.data);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-right",
          theme: "light",
        });
      } else {
        toast.error("An error occurred", {
          position: "top-right",
          theme: "light",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-6 text-gray-500 text-base font-medium w-full h-full"
      >
        <div>
          <Input
            type="text"
            label="Email"
            icon={EnvelopeSimple}
            {...register("email")}
            errorMessage={errors.email?.message}
          />
        </div>
        <div>
          <Input
            label="Password"
            type="password"
            icon={Eye}
            {...register("password")}
            errorMessage={errors.password?.message}
          />
          <div className="form-control flex gap-2 mt-1 relative">
            <label className="cursor-pointer label flex gap-2 justify-start max-w-[140px]">
              <input
                type="checkbox"
                className="checkbox checkbox-warning checkbox-xs bg-gray-200 border-gray-300 rounded"
              />
              <span className="label-text text-xs font-medium text-gray-500">
                Remember me
              </span>
            </label>
            <Link
              href={"/"}
              className="absolute right-0 top-2 text-xs text-blue-600 cursor-pointer underline font-light"
            >
              Forgot Password ?
            </Link>
          </div>
        </div>
        <div className="mt-10 w-full">
          <PrimaryButton type="submit">
            {isLoading ? <Spinner /> : <p>Login</p>}
          </PrimaryButton>
          <div className="text-gray-500 font-medium text-sm text-center mt-2">
            New here?{" "}
            <Link href="/auth/register">
              <span className="text-blue-600 hover:text-blue-800">
                Create an account
              </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
