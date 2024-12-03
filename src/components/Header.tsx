import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="h-16 gap-4 flex w-full bg-teal-25 opacity-1 border-b-blue-200 border-b ">
      <nav className="flex p-4 gap-4">
        <Link to="/">
          <h1 className="text-2xl w-max flex font-semibold">
            CodeGate UI Dashboard
          </h1>
        </Link>
      </nav>
    </header>
  );
}
