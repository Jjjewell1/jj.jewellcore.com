"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Briefcase, MessageSquare, FileText, Upload, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const stats = [
  { title: "Skills", value: "0", icon: Code, description: "Manage your skills" },
  { title: "Projects", value: "0", icon: Briefcase, description: "Manage your projects" },
  { title: "Experience", value: "0", icon: FileText, description: "Manage your experience" },
  { title: "Messages", value: "0", icon: MessageSquare, description: "View messages" },
];

export default function AdminDashboard() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/settings").then(r => r.json()).then(d => {
      if (d.profileImage) setProfileImage(d.profileImage);
    });
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileImage: base64 }),
      });
      setProfileImage(base64);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Settings className="h-4 w-4" /> Profile Picture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center shrink-0">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold gradient-text">JJ</span>
              )}
            </div>
            <div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading} className="gap-2">
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Photo"}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Square images work best. Max 2MB.</p>
              {profileImage && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-red-500 hover:text-red-600"
                  onClick={async () => {
                    await fetch("/api/admin/settings", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ profileImage: "" }),
                    });
                    setProfileImage(null);
                  }}
                >
                  Remove Photo
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
}
