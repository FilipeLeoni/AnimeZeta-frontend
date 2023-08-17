import React from "react";
import { Input } from "../Input";

export const EditProfile = () => {
  return (
    <div className="text-start w-full flex flex-col gap-6">
      <div>
        <label>Username</label>
        <Input name="username" />
      </div>
      <div>
        <label>Email</label>
        <Input name="email" />
      </div>
      <div>
        <label>Password</label>
        <Input name="password" />
      </div>
      <div>
        <label>New Password</label>
        <Input name="NewPassword" />
      </div>
    </div>
  );
};
