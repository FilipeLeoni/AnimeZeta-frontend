"use client";
import React from "react";
import { Input } from "../Input";
import { EnvelopeSimple, Eye } from "@phosphor-icons/react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/utils/Schemas/registerSchema";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: zodResolver(RegisterSchema),
  });

  const auth = useAuth();
  const api = useApi();

  const handleSubmitForm: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await api.createUser(
        data.username,
        data.email,
        data.password
      );

      if (response) {
        toast.success("Account created Successfully!", {
          position: "top-right",
          theme: "light",
        });
        auth?.handleLogin(response.data.accessToken);
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
    }
  };

  return (
    <div className="h-full">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-6 text-gray-500 text-sm font-medium h-full"
      >
        <div>
          <Input
            type="text"
            label="Username"
            {...register("username")}
            name="username"
            errorMessage={errors.username?.message}
          />
        </div>
        <div>
          <Input
            type="text"
            label="Email"
            icon={EnvelopeSimple}
            {...register("email")}
            name="email"
            errorMessage={errors.email?.message}
          />
        </div>
        <div>
          <Input
            label="Password"
            type="password"
            icon={Eye}
            {...register("password")}
            name="password"
            errorMessage={errors.password?.message}
          />
        </div>
        <div>
          <Input
            label="Confirm Password"
            type="password"
            icon={Eye}
            {...register("confirmPassword")}
            name="confirmPassword"
            errorMessage={errors.confirmPassword?.message}
          />
        </div>
        <div className="mt-auto w-full text-center pb-2">
          <PrimaryButton type="submit">Sing Up</PrimaryButton>
          <div className="text-gray-500 font-medium text-sm mt-2">
            Alredy have an account?{" "}
            <Link href="/auth/login">
              <span className="text-blue-600 hover:text-blue-800">Log in</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
