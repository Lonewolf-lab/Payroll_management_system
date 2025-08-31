import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  DollarSign,
  Calendar,
  Users,
  Settings,
  LogOut,
  Building2,
  Home
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const employeeMenuItems = [
  { title: "Dashboard", url: "/employee-dashboard", icon: Home },
  { title: "My Profile", url: "/employee-profile", icon: User },
  { title: "Salary Details", url: "/employee-salary", icon: DollarSign },
  { title: "Leave Management", url: "/employee-leave", icon: Calendar },
];

const adminMenuItems = [
  { title: "Dashboard", url: "/admin-dashboard", icon: Home },
  { title: "Manage Employees", url: "/admin-employees", icon: Users },
  { title: "Payroll Management", url: "/admin-payroll", icon: DollarSign },
  { title: "Leave Requests", url: "/admin-leave", icon: Calendar },
  { title: "Settings", url: "/admin-settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Determine if this is admin or employee based on current path
  const isAdmin = currentPath.includes("admin");
  const menuItems = isAdmin ? adminMenuItems : employeeMenuItems;

  const isActive = (path: string) => currentPath === path;
  const collapsed = state === "collapsed";

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className={collapsed ? "hidden" : "block"}>
            <h2 className="font-semibold text-sidebar-foreground">PayrollPro</h2>
            <p className="text-xs text-sidebar-foreground/60">
              {isAdmin ? "Admin Panel" : "Employee Portal"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={isActive(item.url) ? "bg-sidebar-accent text-sidebar-primary" : ""}
                  >
                    <button
                      onClick={() => navigate(item.url)}
                      className="flex items-center space-x-3 w-full text-left"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className={collapsed ? "sr-only" : ""}>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="w-4 h-4" />
          <span className={collapsed ? "sr-only" : "ml-3"}>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}