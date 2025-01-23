import { Link } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import { DropdownMenu } from "./HoverPopover";
import { Separator, ButtonDarkMode, OptionsSchema } from "@stacklok/ui-kit";
import { WorkspacesSelection } from "@/features/workspace/components/workspaces-selection";
import { BookOpenText, Download, ShieldCheck } from "lucide-react";
import { Continue, Copilot, Discord, Github, Youtube } from "./icons";

const CERTIFICATE_MENU_ITEMS: OptionsSchema<"menu">[] = [
  {
    icon: <ShieldCheck />,
    id: "about-certificate-security",
    href: "/certificates/security",
    textValue: "About certificate security",
  },
  {
    icon: <Download />,
    id: "download-certificates",
    href: "/certificates",
    textValue: "Download certificates",
  },
];

const HELP_MENU_ITEMS: OptionsSchema<"menu">[] = [
  {
    textValue: "Setup",
    id: "setup",
    items: [
      {
        icon: <Continue />,
        id: "continue-setup",
        href: "/help/continue-setup",
        textValue: "Set up in Continue",
      },
      {
        icon: <Copilot />,
        id: "copilot-setup",
        href: "/help/copilot-setup",
        textValue: "Set up in Copilot",
      },
    ],
  },
  {
    textValue: "Resources",
    id: "resources",
    items: [
      {
        icon: <BookOpenText />,
        id: "documentation",
        href: "https://docs.codegate.ai/",
        textValue: "Documentation",
      },
      {
        icon: <Discord />,
        id: "discord",
        href: "https://discord.gg/stacklok",
        textValue: "Discord",
      },
      {
        icon: <Github />,
        id: "github",
        href: "https://github.com/stacklok/codegate",
        textValue: "GitHub",
      },
      {
        icon: <Youtube />,
        id: "youtube",
        href: "https://www.youtube.com/@Stacklok",
        textValue: "YouTube",
      },
    ],
  },
];

export function Header({ hasError }: { hasError?: boolean }) {
  return (
    <header
      aria-label="App header"
      className="shrink-0 h-16 px-3 items-center flex w-full bg-gray-25 border-b-gray-200 border-b"
    >
      <div className="flex items-center gap-2 flex-1">
        {!hasError && (
          <>
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-8" />
          </>
        )}

        <nav className="flex ml-2">
          <Link to="/">
            <h1 className="text-2xl text-primary font-title w-max flex font-semibold">
              CodeGate Dashboard
            </h1>
          </Link>
        </nav>
        <Separator orientation="vertical" className="h-8 ml-4" />
        <WorkspacesSelection />
      </div>
      <div className="flex items-center gap-4 mr-16">
        <DropdownMenu title="Certificates" items={CERTIFICATE_MENU_ITEMS} />

        <DropdownMenu title="Help" items={HELP_MENU_ITEMS} />

        <ButtonDarkMode />
      </div>
    </header>
  );
}
