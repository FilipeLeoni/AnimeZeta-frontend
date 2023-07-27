import React from "react";

import LoginForm from "@/components/AuthForm/login";
import Image from "next/image";
import Logo from "@/assets/images/Logo.svg";
import Link from "next/link";

function LoginPage() {
  return (
    <>
      <header>
        <title>Login - AnimeZeta</title>
      </header>
      <div className="h-[500px] px-10 w-full relative">
        <div className="flex-col flex gap-16 h-full">
          <div className="">
            <p>Welcome Back!</p>
            <div className="flex items-center gap-4">
              <h1 className="text-grayDark font-bold text-5xl">Login</h1>
            </div>
          </div>
          <LoginForm />
          <Link href={"/"} className="absolute top-3 right-10">
            <Image src={Logo} alt="Logo" width={50} height={50} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
