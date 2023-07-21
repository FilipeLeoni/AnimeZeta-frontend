"use client";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white drop-shadow-2xl rounded-lg">
      <div className="max-w-[800px] w-full h-full flex max-h-[642px]">
        <div className=" h-auto w-[400px] rounded-md md:flex hidden login-bg bg-cover bg-center justify-center items-center drop-shadow-md relative">
          {/* <div className="absolute top-0 left-0 w-full h-full bg-primary/80" /> */}
          {/* <motion.div className="drop-shadow-lg">
            <motion.div className="relative ">
              <div className="z-20">
                <Image src={Zenitsu} width={300} alt="" />
              </div>
              <motion.div
                className="absolute top-32 pr-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  delay: 1,
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <Image src={Lightning1} width={300} alt="" />
              </motion.div>
              <motion.div
                className="absolute top-32 pr-3 -left-10 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  delay: 1.1,
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 2.3,
                }}
              >
                <Image src={Lightning2} width={300} alt="" />
              </motion.div>

              <motion.div
                className="absolute top-12 -right-5 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  delay: 1.5,
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                }}
              >
                <Image src={Lightning3} width={100} alt="" />
              </motion.div>
            </motion.div>
          </motion.div> */}
        </div>
        <div className=" h-full flex flex-col py-8 w-full max-w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
