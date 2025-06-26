import {
  BarChart3,
  ChevronRight,
  Database,
  FileText,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: BarChart3,
    },
    {
      title: "User",
      url: "/user",
      icon: User,
    },
    {
      title: "Produk",
      url: "/produk",
      icon: Database,
    },
    {
      title: "Supplier",
      url: "/supplier",
      icon: Users,
    },
    {
      title: "Sales",
      url: "/sales",
      icon: TrendingUp,
    },
    {
      title: "Transaksi",
      url: "/transaksi",
      icon: FileText,
    },
    {
      title: "Data",
      url: "/data",
      icon: Database,
    },
    {
      title: "Laporan",
      url: "/laporan",
      icon: FileText,
    },
  ];

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Database className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Dashboard Admin</span>
                  <span className="truncate text-xs">BUMDes Management</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Mitra BUMDes</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible defaultOpen={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Mitra BUMDes">
                  <CollapsibleTrigger className="w-full">
                    <Database />
                    <span>Mitra BUMDes</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarMenuButton>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/mitra">
                          <span>Kelola Mitra</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/mitra/laporan">
                          <span>Laporan Mitra</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
