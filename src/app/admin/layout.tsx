"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard, Code, Briefcase, MessageSquare, FileText, Bot } from "lucide-react";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "AI Settings", href: "/admin/ai", icon: Bot },
  { label: "Skills", href: "/admin/skills", icon: Code },
  { label: "Projects", href: "/admin/projects", icon: Briefcase },
  { label: "Experience", href: "/admin/experience", icon: FileText },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 border-r border-border bg-card/50 min-h-screen p-4 hidden md:block">
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-xl font-bold gradient-text">
              JJ
            </Link>
            <span className="text-muted-foreground text-sm">Admin</span>
          </div>

          <nav className="space-y-1">
            {adminNav.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1">
          <header className="border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            </div>
            <ThemeToggle />
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
