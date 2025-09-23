import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import MainHeader from "@/components/layout/MainHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
        <div className="col-start-1 col-end-3 row-start-1 row-end-2">
          <MainHeader />
        </div>
        <div className="col-start-1 col-end-2 row-start-2 row-end-3">
          <AppSidebar />
        </div>
        <main className="col-start-2 col-end-3 row-start-2 row-end-3 p-4 overflow-auto">
          <SidebarTrigger />
          <div className="">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
