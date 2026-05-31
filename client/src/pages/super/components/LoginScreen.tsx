import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function LoginScreen({ onLogin, loading }: { onLogin: (u: string, p: string) => void, loading: boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-amber-500" />
          </div>
          <CardTitle className="text-2xl text-white">Super Admin</CardTitle>
          <CardDescription className="text-slate-400">Restricted Access</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); onLogin(username, password); }} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-950 border-slate-800 text-white h-12"
              disabled={loading}
              required
            />
            <Input
              type="password"
              placeholder="Enter secure password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-950 border-slate-800 text-white h-12"
              disabled={loading}
            />
            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white h-12"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Unlock Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
