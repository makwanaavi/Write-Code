"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarSeparator,
} from "@/components/ui/sidebar";
// import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FileIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
  const pathname = usePathname();
  const resetProject = [
    {
      name: "Chat App",
      link: "/editor/fdfddf",
    },
  ];
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

        <div className="px-2 w-full">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link
                href={"/dashboard"}
                className={cn(
                  "w-full min-w-full block px-2 rounded-ms p-2",
                  pathname === "/dashboard" && "bg-white"
                )}
              >
                DashBoard
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Resent Project</SidebarGroupLabel>
          <SidebarMenu>
            {resetProject.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link href={item.link}>
                    <FileIcon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
