import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarUI side="left" className="border-r-blue-200">
      <SidebarHeader className="bg-teal-25 py-6 pb-3 text-sm font-bold px-4">
        History Prompts
      </SidebarHeader>
      <SidebarContent className="bg-teal-25">
        <SidebarGroup>{children}</SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </SidebarUI>
  );
}
