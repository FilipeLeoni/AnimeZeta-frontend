export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl max-w-md sm:mx-0 w-full justify-center h-screen relative ">
        <main>{children}</main>
      </div>
    </>
  );
}
