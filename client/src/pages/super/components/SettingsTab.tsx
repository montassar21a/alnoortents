import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";

export default function SettingsTab() {
  const { data: settings, refetch } = trpc.admin.settings.get.useQuery();
  const updateSettings = trpc.admin.settings.update.useMutation();

  const [formData, setFormData] = useState<any>(null);

  // Initialize form data when settings load
  useEffect(() => {
    if (settings && !formData) {
      setFormData(settings);
    }
  }, [settings, formData]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    updateSettings.mutate(formData, {
      onSuccess: () => {
        toast.success("Settings updated successfully!");
        refetch();
      },
      onError: (err) => {
        toast.error("Failed to update settings: " + err.message);
      }
    });
  };

  if (!formData) return <div className="text-slate-400">Loading settings...</div>;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      {/* SECURITY */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>Security & Login</CardTitle>
          <CardDescription>Change your Super Admin credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Admin Username</label>
              <Input
                value={formData.adminUsername || ""}
                onChange={(e) => setFormData({ ...formData, adminUsername: e.target.value })}
                className="bg-slate-950 border-slate-800"
                placeholder="admin"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Admin Password</label>
              <Input
                type="password"
                value={formData.adminPassword || ""}
                onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                className="bg-slate-950 border-slate-800"
                placeholder="Leave blank to keep current"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GENERAL */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>Website Configuration</CardTitle>
          <CardDescription>Manage your company details, logo, and social links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Website Title</label>
              <Input
                value={formData.websiteTitle || ""}
                onChange={(e) => setFormData({ ...formData, websiteTitle: e.target.value })}
                className="bg-slate-950 border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Notification Email (For inquiries)</label>
              <Input
                type="email"
                value={formData.notificationEmail || ""}
                onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.value })}
                className="bg-slate-950 border-slate-800"
              />
            </div>
            
            {/* Logo and Favicon */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Website Logo</label>
              <ImageUpload
                value={formData.logoUrl || ""}
                onChange={(url) => setFormData({ ...formData, logoUrl: url })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Favicon</label>
              <ImageUpload
                value={formData.favicon || ""}
                onChange={(url) => setFormData({ ...formData, favicon: url })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Phone Number</label>
              <Input
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-slate-950 border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">WhatsApp Link</label>
              <Input
                value={formData.whatsapp || ""}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="bg-slate-950 border-slate-800"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300">Address</label>
              <Textarea
                value={formData.address || ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-slate-950 border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Instagram Link</label>
              <Input
                value={formData.instagram || ""}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="bg-slate-950 border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Facebook Link</label>
              <Input
                value={formData.facebook || ""}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="bg-slate-950 border-slate-800"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* COOKIES */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>Cookie Banner Consent</CardTitle>
          <CardDescription>GDPR / User Tracking Cookie Acceptance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="enableCookieBanner"
              checked={formData.enableCookieBanner}
              onCheckedChange={(checked) => setFormData({ ...formData, enableCookieBanner: checked === true })}
            />
            <label htmlFor="enableCookieBanner" className="text-sm font-medium leading-none text-white cursor-pointer">
              Enable Cookie Consent Banner on Homepage
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Cookie Banner Text (English)</label>
              <Textarea
                value={formData.cookieBannerTextEn || ""}
                onChange={(e) => setFormData({ ...formData, cookieBannerTextEn: e.target.value })}
                className="bg-slate-950 border-slate-800 h-24"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Cookie Banner Text (Arabic)</label>
              <Textarea
                value={formData.cookieBannerTextAr || ""}
                onChange={(e) => setFormData({ ...formData, cookieBannerTextAr: e.target.value })}
                className="bg-slate-950 border-slate-800 h-24"
                dir="rtl"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMTP SETTINGS */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>Email Sending (SMTP)</CardTitle>
          <CardDescription>Configure how your website sends inquiry notification emails</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">SMTP Host</label>
              <Input
                value={formData.smtpHost || ""}
                onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                className="bg-slate-950 border-slate-800"
                placeholder="smtp.hostinger.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">SMTP Port</label>
              <Input
                type="number"
                value={formData.smtpPort || ""}
                onChange={(e) => setFormData({ ...formData, smtpPort: parseInt(e.target.value) })}
                className="bg-slate-950 border-slate-800"
                placeholder="465"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">SMTP User (Email)</label>
              <Input
                value={formData.smtpUser || ""}
                onChange={(e) => setFormData({ ...formData, smtpUser: e.target.value })}
                className="bg-slate-950 border-slate-800"
                placeholder="info@alnoortents.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">SMTP Password</label>
              <Input
                type="password"
                value={formData.smtpPass || ""}
                onChange={(e) => setFormData({ ...formData, smtpPass: e.target.value })}
                className="bg-slate-950 border-slate-800"
                placeholder="Email password"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="bg-amber-600 hover:bg-amber-700 text-white w-full h-12 text-lg font-bold sticky bottom-4"
        disabled={updateSettings.isPending}
      >
        <Save className="w-5 h-5 mr-2" />
        {updateSettings.isPending ? "Saving Changes..." : "SAVE ALL SETTINGS"}
      </Button>
    </form>
  );
}
