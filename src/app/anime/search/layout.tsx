export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <title>Search Animes - AnimeZeta</title>
      </header>
      <h1 className="text-center text-gray-600 font-medium text-4xl mb-10">
        Search
      </h1>
      <div>{children}</div>
    </div>
  );
}
