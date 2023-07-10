import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Input from "@/components/Input";
import React from "react";
import LoginBg from "@/assets/images/Login.svg";
import Image from "next/image";

function page() {
  return (
    <div className="w-[600px] h-full flex p-8">
      <div
        className="w-full h-full bg-center bg-cover rounded-md"
        style={{ backgroundImage: `url(${LoginBg.default})` }}
      >
        <Image src={LoginBg} alt="" width={200} height={400}></Image>
      </div>
      <div className="w-full h-full flex flex-col p-8">
        <div className="mb-20">
          <p>Welcome Back!</p>
          <h1 className="text-grayDark font-bold text-5xl">Login</h1>
        </div>
        <div className="flex flex-col gap-6 text-gray-500 text-sm font-medium">
          <div>
            <label className="pl-1">Email</label>
            <Input />
          </div>
          <div>
            <label className="pl-1">Password</label>
            <Input />
          </div>
        </div>
        <div className="mt-20 w-full">
          <PrimaryButton>Login</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default page;
