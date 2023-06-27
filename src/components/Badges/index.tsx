import React from "react";

interface BadgesProps {
  children: React.ReactNode;
}

export default function Badges({ children }: BadgesProps) {
  return (
    <div className="bg-primary rounded-full">
      <div className="px-4 text-background">{children}</div>
    </div>
  );
}
