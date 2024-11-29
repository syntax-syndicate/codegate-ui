import { Link, useLocation } from "react-router-dom";
import { HomeIcon, SettingsIcon, StacklokLogo } from "./Icons";
import { tv } from "tailwind-variants";

const linkStyles = tv({
  base: "text-lg flex gap-2 items-center font-medium hover:text-gray-300 transition-all",
  variants: {
    isActive: {
      true: "text-brand hover:text-brand-dark",
      false: "text-gray-800",
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export function Header() {
  const location = useLocation();

  return (
    <header className="h-16 gap-4 flex w-full bg-teal-25 opacity-1 border-b-blue-200 border-b ">
      <div className="flex p-4 gap-4 border-r border-r-blue-200">
        <StacklokLogo />
        <h1 className="text-2xl w-max flex font-semibold">CodeGate UI</h1>
      </div>
      <div className="container mx-auto flex items-center gap-4">
        <nav className="flex gap-10 ">
          <Link
            to="/"
            className={linkStyles({
              isActive: location.pathname === "/",
            })}
          >
            <HomeIcon />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/settings"
            className={linkStyles({
              isActive: location.pathname === "/settings",
            })}
          >
            <SettingsIcon />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
