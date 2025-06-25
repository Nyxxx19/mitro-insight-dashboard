
import {
  BarChart,
  User,
  Database,
  Users,
  FileText,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart,
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
    icon: BarChart,
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

const mitroSubmenu = [
  {
    title: "Data Mitra",
    url: "/mitro/data",
  },
  {
    title: "Laporan Mitra",
    url: "/mitro/laporan",
  },
  {
    title: "Transaksi Mitra",
    url: "/mitro/transaksi",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-white border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">Admin Dashboard</h1>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    <a href={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      <Database className="w-5 h-5" />
                      <span className="font-medium">Mitro BUMDes</span>
                      <ChevronRight className="w-4 h-4 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {mitroSubmenu.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url} className="text-gray-600 hover:text-blue-600">
                              {subItem.title}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
