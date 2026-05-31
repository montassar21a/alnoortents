/* ============================================================
   AL NOOR TENTS — Admin Panel (/super)
   Comprehensive content management system
   ============================================================ */

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Lock, LogOut, Save, Plus, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Query data
  const settings = trpc.admin.settings.get.useQuery(undefined, { enabled: isAuthenticated });
  const testimonials = trpc.admin.testimonials.list.useQuery(undefined, { enabled: isAuthenticated });
  const inquiries = trpc.admin.inquiries.list.useQuery(undefined, { enabled: isAuthenticated });
  const notifications = trpc.admin.notifications.list.useQuery({ limit: 50 }, { enabled: isAuthenticated });
  const statistics = trpc.admin.statistics.get.useQuery(undefined, { enabled: isAuthenticated });
  const menuItems = trpc.admin.menu.list.useQuery(undefined, { enabled: isAuthenticated });

  // Mutations
  const verifyPassword = trpc.admin.auth.verifyPassword.useMutation();
  const updateSettings = trpc.admin.settings.update.useMutation();
  const createTestimonial = trpc.admin.testimonials.create.useMutation();
  const deleteTestimonial = trpc.admin.testimonials.delete.useMutation();
  const updateInquiry = trpc.admin.inquiries.update.useMutation();
  const deleteInquiry = trpc.admin.inquiries.delete.useMutation();
  const updateStatistics = trpc.admin.statistics.update.useMutation();
  const reorderMenu = trpc.admin.menu.reorder.useMutation();

  // ============================================================
  // AUTHENTICATION
  // ============================================================

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyPassword.mutateAsync({ password });
      setIsAuthenticated(true);
      setPassword("");
      toast.success("Authenticated successfully!");
    } catch (error) {
      toast.error("Invalid password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    toast.success("Logged out");
  };

  // ============================================================
  // LOGIN SCREEN
  // ============================================================

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-white">
              <Lock className="w-5 h-5" />
              Al Noor Tents Admin
            </CardTitle>
            <CardDescription>Enter admin password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  disabled={loading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ============================================================
  // ADMIN DASHBOARD
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-500">Al Noor Tents Admin</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800 border-slate-700">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* ============================================================
              SETTINGS TAB
              ============================================================ */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
                <CardDescription>Manage your website configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings.data && (
                  <SettingsForm
                    data={settings.data}
                    onSave={(data) => {
                      updateSettings.mutate(data, {
                        onSuccess: () => {
                          toast.success("Settings updated!");
                          settings.refetch();
                        },
                      });
                    }}
                    loading={updateSettings.isPending}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============================================================
              MENU TAB
              ============================================================ */}
          <TabsContent value="menu" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Navigation Menu</CardTitle>
                <CardDescription>Drag to reorder menu items</CardDescription>
              </CardHeader>
              <CardContent>
                {menuItems.data && (
                  <MenuManager
                    items={menuItems.data}
                    onReorder={(items) => {
                      reorderMenu.mutate(
                        {
                          items: items.map((item, index) => ({
                            id: item.id,
                            order: index,
                          })),
                        },
                        {
                          onSuccess: () => {
                            toast.success("Menu reordered!");
                            menuItems.refetch();
                          },
                        }
                      );
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============================================================
              TESTIMONIALS TAB
              ============================================================ */}
          <TabsContent value="testimonials" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Client Testimonials</CardTitle>
                <CardDescription>Manage customer reviews</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AddTestimonialForm
                  onAdd={(data) => {
                    createTestimonial.mutate(data, {
                      onSuccess: () => {
                        toast.success("Testimonial added!");
                        testimonials.refetch();
                      },
                    });
                  }}
                  loading={createTestimonial.isPending}
                />

                <div className="space-y-2 mt-6">
                  {testimonials.data?.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="flex justify-between items-start bg-slate-700 p-3 rounded border border-slate-600"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">{testimonial.authorName}</p>
                        <p className="text-xs text-slate-400 truncate">{testimonial.textEn}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          deleteTestimonial.mutate(
                            { id: testimonial.id },
                            {
                              onSuccess: () => {
                                toast.success("Testimonial deleted!");
                                testimonials.refetch();
                              },
                            }
                          );
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============================================================
              INQUIRIES TAB
              ============================================================ */}
          <TabsContent value="inquiries" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Visitor Inquiries</CardTitle>
                <CardDescription>Manage contact requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {inquiries.data?.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="bg-slate-700 p-4 rounded border border-slate-600 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{inquiry.fullName}</p>
                          <p className="text-sm text-slate-400">{inquiry.email}</p>
                          <p className="text-sm text-slate-400">{inquiry.phone}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            inquiry.status === "new"
                              ? "bg-amber-900 text-amber-200"
                              : inquiry.status === "contacted"
                              ? "bg-blue-900 text-blue-200"
                              : "bg-green-900 text-green-200"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </div>
                      {inquiry.projectDetails && (
                        <p className="text-sm text-slate-300">{inquiry.projectDetails}</p>
                      )}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            updateInquiry.mutate(
                              { id: inquiry.id, status: "contacted" },
                              {
                                onSuccess: () => {
                                  toast.success("Status updated!");
                                  inquiries.refetch();
                                },
                              }
                            );
                          }}
                        >
                          Mark Contacted
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            deleteInquiry.mutate(
                              { id: inquiry.id },
                              {
                                onSuccess: () => {
                                  toast.success("Inquiry deleted!");
                                  inquiries.refetch();
                                },
                              }
                            );
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============================================================
              STATISTICS TAB
              ============================================================ */}
          <TabsContent value="statistics" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Update company statistics</CardDescription>
              </CardHeader>
              <CardContent>
                {statistics.data && (
                  <StatisticsForm
                    data={statistics.data}
                    onSave={(data) => {
                      updateStatistics.mutate(data, {
                        onSuccess: () => {
                          toast.success("Statistics updated!");
                          statistics.refetch();
                        },
                      });
                    }}
                    loading={updateStatistics.isPending}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============================================================
              NOTIFICATIONS TAB
              ============================================================ */}
          <TabsContent value="notifications" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>System and inquiry notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {notifications.data?.slice(0, 20).map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded border ${
                        notif.isRead
                          ? "bg-slate-700 border-slate-600"
                          : "bg-amber-900 border-amber-700"
                      }`}
                    >
                      <p className="font-medium text-sm">{notif.title}</p>
                      <p className="text-xs text-slate-400">{notif.message}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(notif.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ============================================================
// FORM COMPONENTS
// ============================================================

function SettingsForm({
  data,
  onSave,
  loading,
}: {
  data: any;
  onSave: (data: any) => void;
  loading: boolean;
}) {
  const [formData, setFormData] = useState(data);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formData);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Website Title</label>
          <Input
            value={formData.websiteTitle || ""}
            onChange={(e) => setFormData({ ...formData, websiteTitle: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <Input
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">WhatsApp Link</label>
          <Input
            value={formData.whatsapp || ""}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium">Address</label>
          <Textarea
            value={formData.address || ""}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Instagram</label>
          <Input
            value={formData.instagram || ""}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Facebook</label>
          <Input
            value={formData.facebook || ""}
            onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
      </div>
      <Button type="submit" className="bg-amber-600 hover:bg-amber-700" disabled={loading}>
        <Save className="w-4 h-4 mr-2" />
        {loading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}

function AddTestimonialForm({
  onAdd,
  loading,
}: {
  onAdd: (data: any) => void;
  loading: boolean;
}) {
  const [formData, setFormData] = useState({
    textEn: "",
    textAr: "",
    authorName: "",
    authorRole: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({ textEn: "", textAr: "", authorName: "", authorRole: "" });
      }}
      className="space-y-3 p-4 bg-slate-700 rounded border border-slate-600"
    >
      <div>
        <label className="text-sm font-medium">Testimonial (English)</label>
        <Textarea
          value={formData.textEn}
          onChange={(e) => setFormData({ ...formData, textEn: e.target.value })}
          placeholder="Client feedback..."
          className="bg-slate-600 border-slate-500 text-white mt-1"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Testimonial (Arabic)</label>
        <Textarea
          value={formData.textAr}
          onChange={(e) => setFormData({ ...formData, textAr: e.target.value })}
          placeholder="تعليق العميل..."
          className="bg-slate-600 border-slate-500 text-white mt-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Author Name</label>
          <Input
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            placeholder="Client name"
            className="bg-slate-600 border-slate-500 text-white mt-1"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Role/Company</label>
          <Input
            value={formData.authorRole}
            onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
            placeholder="e.g., Event Organizer"
            className="bg-slate-600 border-slate-500 text-white mt-1"
          />
        </div>
      </div>
      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={loading}>
        <Plus className="w-4 h-4 mr-2" />
        {loading ? "Adding..." : "Add Testimonial"}
      </Button>
    </form>
  );
}

function StatisticsForm({
  data,
  onSave,
  loading,
}: {
  data: any;
  onSave: (data: any) => void;
  loading: boolean;
}) {
  const [formData, setFormData] = useState(data);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formData);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Projects Completed</label>
          <Input
            type="number"
            value={formData.projectsCompleted || 0}
            onChange={(e) =>
              setFormData({ ...formData, projectsCompleted: parseInt(e.target.value) })
            }
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Years of Experience</label>
          <Input
            type="number"
            value={formData.yearsOfExperience || 0}
            onChange={(e) =>
              setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) })
            }
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Happy Clients</label>
          <Input
            type="number"
            value={formData.happyClients || 0}
            onChange={(e) =>
              setFormData({ ...formData, happyClients: parseInt(e.target.value) })
            }
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Countries Served</label>
          <Input
            type="number"
            value={formData.countriesServed || 0}
            onChange={(e) =>
              setFormData({ ...formData, countriesServed: parseInt(e.target.value) })
            }
            className="bg-slate-700 border-slate-600 text-white mt-1"
          />
        </div>
      </div>
      <Button type="submit" className="bg-amber-600 hover:bg-amber-700" disabled={loading}>
        <Save className="w-4 h-4 mr-2" />
        {loading ? "Saving..." : "Save Statistics"}
      </Button>
    </form>
  );
}

function MenuManager({
  items,
  onReorder,
}: {
  items: any[];
  onReorder: (items: any[]) => void;
}) {
  const [menuItems, setMenuItems] = useState(items);

  return (
    <div className="space-y-2">
      {menuItems.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center gap-3 bg-slate-700 p-3 rounded border border-slate-600"
        >
          <GripVertical className="w-5 h-5 text-slate-400 cursor-grab" />
          <div className="flex-1">
            <p className="font-medium">{item.labelEn}</p>
            <p className="text-xs text-slate-400">{item.href}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const newItems = [...menuItems];
              if (index > 0) {
                [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
                setMenuItems(newItems);
                onReorder(newItems);
              }
            }}
          >
            ↑
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const newItems = [...menuItems];
              if (index < newItems.length - 1) {
                [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                setMenuItems(newItems);
                onReorder(newItems);
              }
            }}
          >
            ↓
          </Button>
        </div>
      ))}
    </div>
  );
}
