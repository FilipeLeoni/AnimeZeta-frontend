export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white drop-shadow-2xl rounded-lg ">
      <div className="max-w-[600px] w-full h-full flex">
        <div className=" h-auto w-[276px] rounded-md login-bg bg-cover bg-center md:inline hidden" />
        <div className=" h-full flex flex-col p-8">{children}</div>
      </div>
    </div>
  );
}
