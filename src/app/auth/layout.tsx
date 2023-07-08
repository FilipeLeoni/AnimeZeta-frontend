"use client";

export const metadata = {
  title: "AnimeZeta",
  description: "An unofficial anime site",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
