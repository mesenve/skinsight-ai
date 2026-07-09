import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function AppShell({
  children,
  title,
  subtitle,
  breadcrumb,
}: AppShellProps) {
  return (
    <div className="mesh-bg min-h-screen">
      <Sidebar />
      <div className="lg:pl-[17.5rem]">
        <Header title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
        <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
