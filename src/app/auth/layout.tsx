export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 w-full">
        <div className="self-start place-self-start">Back</div>
        <main>{children}</main>
      </div>
    </div>
  );
}
