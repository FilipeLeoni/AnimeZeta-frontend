import RegisterForm from '@/components/AuthForm/register';
import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/images/Logo.svg';
import Link from 'next/link';

function RegisterPage() {
  return (
    <>
      <header>
        <title>Sign Up - AnimeZeta</title>
      </header>
      <div className="h-[586px] px-10 w-full relative">
        <div className="flex flex-col gap-14 h-full">
          <div>
            <p>Welcome to AnimeZeta!</p>
            <h1 className="text-grayDark font-bold text-5xl">Sign Up</h1>
            <Link href={'/'} className="absolute top-3 right-10">
              <Image src={Logo} alt="Logo" width={50} height={50} />
            </Link>
          </div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
