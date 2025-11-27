"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { title } from "process";
const NavBarV2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const t = useTranslations("NavBar");
  const pathname = usePathname() || "/";
  // strip leading locale segment if present (en/he)
  const stripLocale = (path: string) => {
    const parts = path.split("/");
    if (parts.length > 1 && (parts[1] === "en" || parts[1] === "he")) {
      const rest = parts.slice(2).join("/");
      return rest ? `/${rest}` : "/";
    }
    return path;
  };
  const basePath = stripLocale(pathname);
  const [isLangOpen, setIsLangOpen] = useState(false);
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
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              aria-haspopup="true"
              aria-expanded={isLangOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 20a10 10 0 100-20 10 10 0 000 20zm1-3.5v-1.09a6.5 6.5 0 002.69-1.4l.78.78A8 8 0 0111 16.5zM6.5 14a6.5 6.5 0 004.17-1.4l-.64-.64A5 5 0 016.5 14zM4.5 9a5.5 5.5 0 01.5-2.5h2a8 8 0 00-2.5 2.5zM10 5.5c.76 0 1.5.1 2.2.29l.64-.64A6.5 6.5 0 0010 3.5v2z" />
              </svg>
              <span className="hidden sm:inline">{t("change-leng")}</span>
            </button>

            {/* Dropdown */}
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-30">
                <Link
                  href={`/en${basePath === "/" ? "" : basePath}`}
                  onClick={() => setIsLangOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  English
                </Link>
                <Link
                  href={`/he${basePath === "/" ? "" : basePath}`}
                  onClick={() => setIsLangOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  עברית
                </Link>
              </div>
            )}
          </div>
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
