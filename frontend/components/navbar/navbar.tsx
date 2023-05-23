import React, { useEffect, useState } from "react";
import {
  Navbar as MTNavbar,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  XMarkIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import LogoImg from "@public/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);

  const { pathname } = useRouter();

  const links = [
    { href: "/", title: "Головна" },
    { href: "/surveys", title: "Опитування" },
    { href: "/analytics", title: "Аналітика" },
    { href: "/about", title: "Про нас" },
  ];

  const closeNav = () => setOpenNav(false);

  useEffect(() => {
    const handleEffect = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }

      window.addEventListener("resize", handleEffect);
    };

    return () => window.removeEventListener("resize", handleEffect);
  }, []);

  const isAnalytic = true;

  return (
    <MTNavbar
      fullWidth
      className={`sticky top-0 z-50 border-0 bg-primary-blue py-1 bg-opacity-100`}
    >
      <div className="px-4 xl:px-20 flex items-center justify-between">
        <Link href="/" className="w-14 h-14">
          <Image src={LogoImg} alt="logo" />
        </Link>
        <div className="flex items-center gap-8">
          <ul className="hidden lg:flex gap-8 font-semibold">
            {links.map(({ href, title }) => {
              if (!isAnalytic && href === "/analytics") {
                return null;
              }

              return (
                <Link
                  key={title}
                  className={`hover:text-primary-yellow transition-all ${
                    href === pathname ? "text-primary-yellow" : "text-white"
                  }`}
                  href={href}
                >
                  {title}
                </Link>
              );
            })}
          </ul>
          <Menu>
            <MenuHandler>
              <UserCircleIcon className="cursor-pointer h-8 w-8" />
            </MenuHandler>
            <MenuList>
              <MenuItem>Редагувати профіль</MenuItem>
              <MenuItem>Вийти</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <IconButton
          color="yellow"
          variant="text"
          size="lg"
          className="ml-1 lg:hidden sm:ml-4"
        >
          {openNav ? (
            <XMarkIcon className="h-10 w-10" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </IconButton>
      </div>
    </MTNavbar>
  );
};
