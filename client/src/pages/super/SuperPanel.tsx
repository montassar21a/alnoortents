import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Menu, X, LayoutDashboard, Settings, MessageSquare, Edit3, Users } from "lucide-react";
import LoginScreen from "./components/LoginScreen";
import SettingsTab from "./components/SettingsTab";
import InquiriesTab from "./components/InquiriesTab";
import TestimonialsTab from "./components/TestimonialsTab";
import CMSTab from "./components/CMSTab";

export default function SuperPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const verifyPassword = trpc.admin.auth.verifyPassword.useMutation();

  const handleLogin = async (username: string, password: string) => {
    try {
      await verifyPassword.mutateAsync({ username, password });
      setIsAuthenticated(true);
      toast.success("Welcome back!");
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success("Logged out safely");
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} loading={verifyPassword.isPending} />;
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "cms", label: "Homepage Editor", icon: Edit3 },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare },
    { id: "testimonials", label: "Testimonials", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-800 h-16">
          <span className="font-bold text-amber-500 tracking-wider">SUPER ADMIN</span>
          <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Logout Securely
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="font-semibold text-lg capitalize">{activeTab.replace("-", " ")}</h1>
          </div>
          <a href="/" target="_blank" className="text-xs text-amber-500 hover:underline">
            View Live Site ↗
          </a>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto space-y-6 pb-20">
            {activeTab === "settings" && <SettingsTab />}
            {activeTab === "inquiries" && <InquiriesTab />}
            {activeTab === "testimonials" && <TestimonialsTab />}
            {activeTab === "cms" && <CMSTab />}
            {activeTab === "dashboard" && (
              <div className="text-slate-400">
                Welcome to the new Super Admin panel. Select a tab from the left to manage your website.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
