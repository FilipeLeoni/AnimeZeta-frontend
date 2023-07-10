export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-white drop-shadow-2xl rounded-lg">
      {children}
    </div>
  );
}
