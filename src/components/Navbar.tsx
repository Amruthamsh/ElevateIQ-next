"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMoreVertical } from "react-icons/fi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full h-16 sm:h-20 backdrop-filter backdrop-blur-xl bg-opacity-20 border-b flex items-center justify-center">
      <div className="max-w-7xl w-full flex items-center justify-between p-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center">
          {/* <Image src="/Image/logo.png" alt="Logo Alt Text" width={50} height={50} className="rounded-full" /> */}
          <h6 className="font-bold ml-2 text-sm sm:text-lg">ElevateIQ</h6>
        </div>

        {/* Menu for larger screens */}
        <ul className="hidden sm:flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-base">
          <li>
            <Link
              className="text-fuchsia-500 hover:text-fuchsia-500 transition-colors"
              href="/"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-fuchsia-500 transition-colors"
              href="/Gameit"
            >
              GAMEIT
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-fuchsia-500 transition-colors"
              href="/skillhive"
            >
              SKILLHIVE
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-fuchsia-500 transition-colors"
              href="/ByteBriefs"
            >
              BYTEBRIEFS
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-fuchsia-500 transition-colors"
              href="/Whappning"
            >
              WHAPPNING
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-fuchsia-500 transition-colors"
              href="/Jobbit"
            >
              JOBBIT
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-fuchsia-500 transition-colors"
              href="/Careercompus"
            >
              CAREERCOMPUS
            </Link>
          </li>
        </ul>

        {/* Hamburger icon for mobile view */}
        <div className="sm:hidden">
          <FiMoreVertical
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <ul className="absolute top-16 right-4 bg-blue-950 rounded-lg shadow-lg p-4 flex flex-col gap-2 text-xs sm:text-base">
            <li>
              <Link href="/Home">
                <button className="w-full text-fuchsia-500 hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">
                  HOME
                </button>
              </Link>
            </li>
            <li>
              <Link href="/Gameit">
                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">
                  GAMEIT
                </button>
              </Link>
            </li>
            <li>
              <Link href="/Skillhive">
                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">
                  SKILLHIVE
                </button>
              </Link>
            </li>
            <li>
              <Link href="/ByteBriefs">
                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">
                  BYTEBRIEFS
                </button>
              </Link>
            </li>
            <li>
              <Link href="/Whappning">
                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">
                  WHAPPNING
                </button>
              </Link>
            </li>
            <li>
              <Link href="/Jobbit">
                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">
                  JOBBIT
                </button>
              </Link>
            </li>
            <li>
              <Link href="/Careercompus">
                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">
                  CAREERCOMPUS
                </button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
