import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];

const DashboardSidebar = () => {
  return (
    <Sidebar className="overflow-hidden">
      <SidebarHeader className="mx-auto pr-6">
        <div style={{ transform: "scale(1.8)" }}>
          <Link href={"/"}>
            <Image
              src={"/logo1.png"}
              width={100}
              height={50}
              alt="Write Code"
              priority
              quality={100}
            />
          </Link>
        </div>
      </SidebarHeader>
      {/* <SidebarSeparator /> */}

      <SidebarContent>
        <Button className="cursor-pointer mx-4 mb-8" variant={"outline"}>
          Create Project
        </Button>

        <div className="px-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href={'/'}>DashBoard</Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </div>

        <SidebarGroup>
            <SidebarGroupLabel>Resent Project</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
