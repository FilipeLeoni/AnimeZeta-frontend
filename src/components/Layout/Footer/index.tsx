import React from "react";
import Logo from "@/assets/images/Logo.svg";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="footer p-10 px-16 bg-gray-300 text-gray-800">
      <div>
        <Image src={Logo} alt="AnimeZeta Logo" width={60} />
        <div className="mt-2">
          <p>
            © 2023 AnimeZeta, Inc. All rights reserved.
            <br />
            For educational purposes only.
          </p>
        </div>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a
            className="hover:text-yellow-500 cursor-pointer"
            href="https://www.youtube.com/channel/UCVQnzWi-aQv99UvvQKpLlAw"
          >
            <svg
              width="34px"
              height="34px"
              viewBox="0 0 256 256"
              id="Flat"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current"
            >
              <path d="M160,128a32,32,0,1,1-32-32A32.03667,32.03667,0,0,1,160,128Zm68-44v88a56.06353,56.06353,0,0,1-56,56H84a56.06353,56.06353,0,0,1-56-56V84A56.06353,56.06353,0,0,1,84,28h88A56.06353,56.06353,0,0,1,228,84Zm-52,44a48,48,0,1,0-48,48A48.05436,48.05436,0,0,0,176,128Zm16-52a12,12,0,1,0-12,12A12,12,0,0,0,192,76Z" />
            </svg>
          </a>
          <a
            className="hover:text-yellow-500 cursor-pointer"
            href="https://www.instagram.com/filipeleoni/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="34"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a
            className="hover:text-yellow-500 cursor-pointer"
            href="https://www.linkedin.com/in/filipe-leoni/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="34"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
