"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Input from "@/components/Input";
import React from "react";
import Link from "next/link";
import { EnvelopeSimple, Eye } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/utils/Schemas/LoginSchema";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  const api = useApi();

  async function handleSubmitForm(data: any) {
    const Response = await api.login(data.email, data.password);

    try {
      if (Response) {
        toast.success("Login Successfully!", {
          position: "top-right",
          theme: "light",
        });

        router.push("/");
      }
    } catch (error) {
      toast.error("Error, Try again", {
        position: "top-right",
        theme: "light",
      });
    }
  }

  return (
    <>
      <header>
        <title>Login - AnimeZeta</title>
      </header>
      <div className="w-full px-12">
        <div className="mb-20">
          <p>Welcome Back!</p>
          <h1 className="text-grayDark font-bold text-5xl">Login</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-6 text-gray-500 text-base font-medium w-full"
        >
          <div>
            <label>Email</label>
            <Input
              type="text"
              Icon={EnvelopeSimple}
              register={{ ...register("email") }}
              errorMessage={errors.email?.message}
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              type="password"
              Icon={Eye}
              register={{ ...register("password") }}
              errorMessage={errors.password?.message}
            />
            <div className="form-control flex gap-2 mt-1 relative">
              <label className="cursor-pointer label flex gap-2 justify-start max-w-[140px]">
                <input
                  type="checkbox"
                  className="checkbox checkbox-warning checkbox-xs bg-gray-200 border-gray-300 rounded"
                  {...register("checkbox")}
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
          <div className="mt-11 w-full">
            <PrimaryButton type="submit">Login</PrimaryButton>
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
    </>
  );
}

export default LoginPage;
