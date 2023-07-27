export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white drop-shadow-2xl rounded-lg">
      <div className="w-full h-auto flex">
        <div className="h-auto w-[500px] rounded-md md:flex hidden login-bg bg-cover bg-center justify-center items-center drop-shadow-md relative" />
        <div className="h-full flex flex-col py-8 w-full max-w-[436px]">
          {children}
        </div>
      </div>
    </div>
  );
}
