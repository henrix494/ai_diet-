"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { title } from "process";
const NavBarV2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const t = useTranslations("NavBar");
  const navBarLinks = [
    { title: t("home"), link: "/" },
    { title: t("recipes"), link: "/dashboard" },
    { title: t("favorites"), link: "/favorite" },
  ];

  return (
    <nav className="bg-gray-50 shadow-md font-bold">
      <div className="flex justify-between items-center p-4 lg:p-6 text-black">
        {/* Logo */}
        <div>
          <Link href={"/"} className="text-2xl font-bold">
            {t("title").toUpperCase()}
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-10 items-center">
          {isSignedIn ? (
            <>
              {navBarLinks.map((item) => (
                <Link
                  className="hover:text-orange-500 transition-all"
                  key={item.title}
                  href={item.link}
                >
                  {item.title}
                </Link>
              ))}
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Link
              className="border-2 rounded-xl px-4 py-2 hover:bg-gray-100 transition-all"
              href="/sign-in"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Hamburger Menu */}
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col gap-4 p-4 bg-gray-50">
          {isSignedIn ? (
            <>
              {navBarLinks.map((item) => (
                <Link
                  className="hover:text-orange-500 transition-all"
                  key={item.title}
                  href={item.link}
                >
                  {item.title}
                </Link>
              ))}
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Link
              className="border-2 rounded-xl px-4 py-2 hover:bg-gray-100 transition-all"
              href="/sign-in"
            >
              Sign in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBarV2;
