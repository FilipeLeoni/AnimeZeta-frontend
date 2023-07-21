"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Input from "@/components/Input";
import { useApi } from "@/hooks/useApi";
import { RegisterSchema } from "@/utils/Schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeSimple, Eye } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function RegisterPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();
  const api = useApi();

  async function handleSubmitForm(data: any) {
    try {
      await api.createUser(data.username, data.email, data.password);

      await api.login(data.email, data.password);

      toast.success("Created account successfully", {
        position: "top-right",
        theme: "light",
      });

      router.push("/");
    } catch (error) {
      toast.error("Error, Try Again", {
        position: "top-right",
        theme: "light",
      });
    }
  }

  return (
    <>
      <header>
        <title>Sign Up - AnimeZeta</title>
      </header>
      <div className="w-full px-12">
        <div className="mb-10">
          <p>Welcome to AnimeZeta!</p>
          <h1 className="text-grayDark font-bold text-5xl">Sign Up</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-6 text-gray-500 text-sm font-medium"
        >
          <div>
            <label>Username</label>
            <Input
              register={{ ...register("username") }}
              type="text"
              errorMessage={errors.username?.message}
            />
          </div>
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
          </div>
          <div>
            <label>Confirm Password</label>
            <Input
              type="password"
              Icon={Eye}
              register={{ ...register("confirmPassword") }}
              errorMessage={errors.confirmPassword?.message}
            />
          </div>
          <div className="mt-auto w-full text-center pb-2">
            <PrimaryButton type="submit">Sing Up</PrimaryButton>
            <div className="text-gray-500 font-medium text-sm mt-2">
              Alredy have an account?{" "}
              <Link href="/auth/login">
                <span className="text-blue-600 hover:text-blue-800">
                  Log in
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
