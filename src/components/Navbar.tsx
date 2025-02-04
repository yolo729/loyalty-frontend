import { useState, useEffect } from "react";
import { Dropdown } from "rsuite";
import "rsuite/styles/index.less";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import cubeLeg from "../assets/logo.png";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "wesite_rewards",
    label: "WESTSIDE REWARDS",
  },
  {
    href: "#ABOUT US",
    label: "ABOUT US",
  },
  {
    href: "#MENUS",
    label: "MENUS",
  },
  {
    href: "#LOCATIONS",
    label: "LOCATIONS",
  },
  {
    href: "#DEPARTMENTS",
    label: "DEPARTMENTS",
  },
  {
    href: "#MARIA’S HOMEMADE",
    label: "MARIA’S HOMEMADE",
  },
  {
    href: "#TESTIMONIALS",
    label: "TESTIMONIALS",
  },
  {
    href: "#CONTACKS",
    label: "CONTACKS",
  },
];

export const Navbar = () => {
  const [userInfo, setUserInfo] = useState({
    Token: "",
    user_id: "",
    user_name: "",
  });

  const logouts = () => {
    localStorage.clear();
  };

  const [token, setToken] = useState(
    localStorage.getItem("accessToken") ? true : false
  );
  useEffect(() => {
    const Token = localStorage.getItem("accessToken");
    const user_id = localStorage.getItem("userId");
    const user_name = localStorage.getItem("userName");
    if (Token) {
      setToken(true);
      setUserInfo({
        Token: Token,
        user_id: user_id || "",
        user_name: user_name || "",
      });
    }
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="top-0 z-40 w-full dark:border-b-slate-700">
      <NavigationMenu className="h-40 bg-white mx-auto">
        <NavigationMenuList className="container  h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a href="/" className="ml-2 font-bold text-xl flex">
              <img
                src={cubeLeg}
                className="w-[150px] md:w-[250px] lg:w-[300px] object-contain"
                alt="About services"
              />
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
            {!token ? (
              <a
                key="SIGNIN"
                href="signin"
                onClick={() => setIsOpen(false)}
                className={buttonVariants({ variant: "ghost" })}
              >
                SIGNIN
              </a>
            ) : (
              <div>
                <Dropdown title={userInfo.user_name} noCaret>
                  <a href="profile">
                    <Dropdown.Item>Setting</Dropdown.Item>
                  </a>
                  <a href="/" onClick={logouts}>
                    <Dropdown.Item>Log out</Dropdown.Item>
                  </a>
                </Dropdown>
              </div>
            )}
          </nav>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
