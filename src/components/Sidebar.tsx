import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarUI side="left">
      <SidebarHeader className="bg-teal-25 py-6 text-sm font-bold px-4">
        History prompts
      </SidebarHeader>
      <SidebarContent className="bg-teal-25">
        <SidebarGroup>{children}</SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </SidebarUI>
  );
}
