import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <header className="flex-shrink-0 h-16 px-3 items-center flex w-full bg-teal-25 opacity-1 border-b-blue-200 border-b ">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-8 mx-3" />
      <nav className="mx-1 flex">
        <Link to="/">
          <h1 className="text-2xl w-max flex font-semibold">
            CodeGate UI Dashboard
          </h1>
        </Link>
      </nav>
    </header>
  );
}
