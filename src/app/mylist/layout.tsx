"use client";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="pt-36 pb-20">{children}</div>
    </QueryClientProvider>
  );
}
