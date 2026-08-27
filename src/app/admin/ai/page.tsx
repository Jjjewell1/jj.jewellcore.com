"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Bot, CheckCircle2, XCircle, Loader2, Save, Plug, RotateCcw } from "lucide-react";

export default function AiSettingsPage() {
  const [host, setHost] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "ok" | "error" | "loading">("loading");
  const [statusError, setStatusError] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/ai-settings");
      const data = await res.json();
      setHost(data.ollamaHost || "");
      setModel(data.ollamaModel || "");
      setModels(data.models || []);
      setStatus(data.status || "idle");
      setStatusError(data.error || null);
    } catch {
      setStatus("error");
      setStatusError("Failed to load settings");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const testConnection = async () => {
    setTesting(true);
    setStatus("loading");
    setStatusError(null);
    try {
      const res = await fetch("/api/admin/ai-settings");
      const data = await res.json();
      setModels(data.models || []);
      setStatus(data.status || "error");
      setStatusError(data.error || null);
    } catch (err) {
      setStatus("error");
      setStatusError(err instanceof Error ? err.message : "Connection failed");
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/ai-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ollamaHost: host, ollamaModel: model }),
      });
      if (res.ok) {
        setSaved(true);
        await load();
        setTimeout(() => setSaved(false), 3000);
      } else {
        const d = await res.json().catch(() => ({}));
        setStatusError(d.error || "Save failed");
      }
    } catch (err) {
      setStatusError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    await fetch("/api/admin/ai-settings", { method: "DELETE" });
    await load();
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg gradient-bg text-white">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI Settings</h2>
          <p className="text-sm text-muted-foreground">Configure the Ollama endpoint and model used by the site chatbot.</p>
        </div>
      </div>

      <div
        className={`mb-6 flex items-center gap-3 rounded-lg border p-4 ${
          status === "ok"
            ? "border-green-500/30 bg-green-500/10"
            : status === "error"
            ? "border-destructive/30 bg-destructive/10"
            : "border-border bg-muted/40"
        }`}
      >
        {status === "loading" && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        {status === "ok" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
        {status === "error" && <XCircle className="h-5 w-5 text-destructive" />}
        {status === "idle" && <Plug className="h-5 w-5 text-muted-foreground" />}
        <div className="flex-1">
          <p className="text-sm font-medium">
            {status === "ok" && "Connected to Ollama"}
            {status === "error" && "Connection error"}
            {status === "loading" && "Checking connection..."}
            {status === "idle" && "Not yet connected"}
          </p>
          <p className="text-xs text-muted-foreground">
            {statusError || (models.length ? `${models.length} model(s) available` : "No models reported")}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={testConnection} disabled={testing}>
          {testing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plug className="h-4 w-4 mr-2" />}
          Test
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Endpoint Configuration</CardTitle>
          <CardDescription>
            Enter the Ollama base URL (e.g. https://ollama.jewellcore.com). The protocol and trailing slashes are normalized automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="host">Ollama Host URL</Label>
              <Input
                id="host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="https://ollama.jewellcore.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="hermes3:8b"
                list="ollama-models"
                required
              />
              <datalist id="ollama-models">
                {models.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
              {models.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {models.map((m) => (
                    <Badge
                      key={m}
                      variant={m === model ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => setModel(m)}
                    >
                      {m}
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">Click a badge or pick from the list to set the active model.</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" className="gradient-bg text-white" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Settings
              </Button>
              <Button type="button" variant="ghost" onClick={handleReset} disabled={saving}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to env defaults
              </Button>
              {saved && (
                <span className="text-sm text-green-500 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Saved
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
