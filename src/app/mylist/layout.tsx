export default function MyListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <head>
        <title>MyList - AnimeZeta</title>
      </head>
      <h1 className="max-w-3xl text-center font-medium text-2xl text-gray-600">
        Oops! This page is still under construction. We&apos;re working hard to
        bring you the best experience. Please check back soon for updates. Thank
        you for your patience!
      </h1>
      <div>{children}</div>
    </div>
  );
}
