export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 sm:gap-6 lg:max-w-5xl max-w-full mx-2 sm:mx-20 pt-36 pb-20">
        <main>{children}</main>
      </div>
    </div>
  );
}
