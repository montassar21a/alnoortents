import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Lock, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (login(password)) {
        setPassword("");
      } else {
        setError("Invalid password");
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg p-8 border border-border">
          {/* Header */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
              <Lock size={24} style={{ color: "oklch(0.72 0.12 75)" }} />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2 text-foreground">Admin Panel</h1>
          <p className="text-center text-muted-foreground mb-8">Enter your password to access the admin panel</p>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3">
              <AlertCircle size={18} className="text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full btn-gold py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            This is a secure admin area. Only authorized users should access this page.
          </p>
        </div>
      </div>
    </div>
  );
}
