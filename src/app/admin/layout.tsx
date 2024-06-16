import { Sidebar } from "~/components/sidebar";
import { SiteHeader } from "~/components/site-header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Sidebar />
      <div className="flex flex-col md:pl-64">
        <SiteHeader />
        {children}
      </div>
    </div>
  );
}
