import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Menu, X, LayoutDashboard, Settings, MessageSquare, Edit3, Users, BarChart3, ShoppingBag, Eye, Star, Phone, ExternalLink, ArrowRight } from "lucide-react";
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
            {activeTab === "dashboard" && <DashboardContent onNavigate={setActiveTab} />}
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardContent({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { data: stats } = trpc.admin.statistics.get.useQuery();
  const { data: inquiries } = trpc.admin.inquiries.list.useQuery();
  const { data: testimonials } = trpc.admin.testimonials.list.useQuery();
  const { data: products } = trpc.admin.products.list.useQuery();
  const { data: projects } = trpc.admin.projects.list.useQuery();
  const { data: settings } = trpc.admin.settings.get.useQuery();

  const quickActions = [
    { tab: "cms", label: "Edit Homepage", icon: Edit3, desc: "Update sections, logo & content" },
    { tab: "inquiries", label: "View Inquiries", icon: MessageSquare, desc: "Check new messages & leads" },
    { tab: "testimonials", label: "Manage Reviews", icon: Users, desc: "Add/edit client testimonials" },
    { tab: "settings", label: "Site Settings", icon: Settings, desc: "Security, social & SMTP config" },
  ];

  const recentInquiries = inquiries?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back{settings?.websiteTitle ? ` to ${settings.websiteTitle}` : ''}</h2>
          <p className="text-slate-400 mt-1">Here's what's happening with your website today.</p>
        </div>
        <a href="/" target="_blank" className="flex items-center gap-2 text-sm text-amber-500 hover:underline">
          <ExternalLink className="w-4 h-4" /> View Live Site
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <BarChart3 className="w-5 h-5 text-amber-500" />
            <span className="text-3xl font-bold text-white">{stats?.projectsCompleted ?? 0}</span>
          </div>
          <p className="text-sm text-slate-400 font-medium">Projects Done</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            <span className="text-3xl font-bold text-white">{products?.length ?? 0}</span>
          </div>
          <p className="text-sm text-slate-400 font-medium">Products</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <Star className="w-5 h-5 text-purple-400" />
            <span className="text-3xl font-bold text-white">{testimonials?.length ?? 0}</span>
          </div>
          <p className="text-sm text-slate-400 font-medium">Testimonials</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/5 border border-green-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <Eye className="w-5 h-5 text-green-400" />
            <span className="text-3xl font-bold text-white">{projects?.length ?? 0}</span>
          </div>
          <p className="text-sm text-slate-400 font-medium">Projects in Gallery</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Recent Inquiries</h3>
            <button onClick={() => onNavigate("inquiries")} className="text-xs text-amber-500 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          {recentInquiries.length > 0 ? (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800/50">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{inq.fullName}</p>
                    <p className="text-xs text-slate-500 truncate">{inq.email} · {inq.phone}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${inq.status === 'new' ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-400'}`}>
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm py-6 text-center">No inquiries yet.</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.tab}
                onClick={() => onNavigate(action.tab)}
                className="flex items-start gap-3 p-4 rounded-lg bg-slate-950/50 border border-slate-800/50 hover:border-amber-500/30 hover:bg-slate-800/50 transition-all text-left group"
              >
                <action.icon className="w-5 h-5 text-amber-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">{action.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
