import React from "react";

interface BadgesProps {
  children: React.ReactNode;
}

export default function Badges({ children }: BadgesProps) {
  return (
    <div className="bg-primary rounded-full px-2 text-yellow-800 text-sm">
      <div className="inline-block">{children}</div>
    </div>
  );
}
