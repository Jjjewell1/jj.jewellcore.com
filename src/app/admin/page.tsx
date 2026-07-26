"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Briefcase, MessageSquare, FileText } from "lucide-react";

const stats = [
  { title: "Skills", value: "0", icon: Code, description: "Manage your skills" },
  { title: "Projects", value: "0", icon: Briefcase, description: "Manage your projects" },
  { title: "Experience", value: "0", icon: FileText, description: "Manage your experience" },
  { title: "Messages", value: "0", icon: MessageSquare, description: "View messages" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Welcome to the admin dashboard. Use the sidebar to manage your portfolio content.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
