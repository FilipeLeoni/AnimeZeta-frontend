export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-28 pb-20">{children}</div>;
}
