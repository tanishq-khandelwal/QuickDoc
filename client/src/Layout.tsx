import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar /> {/* Sidebar content */}

        <main className="flex-1">
          <SidebarTrigger /> {/* Trigger to toggle sidebar */}
          {children} {/* Main content */}
        </main>
      </div>
     
    </SidebarProvider>
  );
}
