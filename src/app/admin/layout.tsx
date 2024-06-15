import { Sidebar } from "~/components/sidebar";
import { SiteHeader } from "~/components/site-header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <SiteHeader />
        {children}
      </div>
    </div>
  );
}
