import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Image as ImageIcon } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";

import { ProductsEditor } from "./ProductsEditor";
import { FeaturesEditor } from "./FeaturesEditor";
import { ProjectsEditor } from "./ProjectsEditor";
import { SectorsEditor } from "./SectorsEditor";

const SECTIONS = [
  { id: "hero", name: "Hero Section", desc: "Main top section with background image & CTAs" },
  { id: "marquee", name: "Marquee Strip", desc: "Scrolling ticker text" },
  { id: "what-we-build", name: "Our Products", desc: "Types of tents you build" },
  { id: "why-choose-us", name: "Why Choose Us", desc: "Company features and benefits" },
  { id: "stats", name: "Our Numbers", desc: "Stats and achievements" },
  { id: "projects", name: "Our Work", desc: "Gallery and projects section" },
  { id: "clients", name: "Our Clients", desc: "Who we work with" },
  { id: "contact", name: "Get In Touch", desc: "Contact form text" },
  { id: "footer", name: "Footer", desc: "Bottom of the website" },
];

export default function CMSTab() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const { data: settings, refetch: refetchSettings } = trpc.admin.settings.get.useQuery();
  const updateSettings = trpc.admin.settings.update.useMutation();

  const handleLogoChange = (url: string) => {
    updateSettings.mutate({ logoUrl: url }, {
      onSuccess: () => { toast.success("Logo updated!"); refetchSettings(); }
    });
  };

  const handleFaviconChange = (url: string) => {
    updateSettings.mutate({ favicon: url }, {
      onSuccess: () => { toast.success("Favicon updated!"); refetchSettings(); }
    });
  };

  return (
    <div className="space-y-8">
      {/* Brand Identity - Logo & Favicon */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-500" /> Brand Identity
          </CardTitle>
          <CardDescription>Upload your logo and favicon — these appear on the live website navbar and browser tab</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Website Logo</label>
              <p className="text-xs text-slate-500 mb-2">Shown in the navbar. Recommended: transparent PNG, max 200px height.</p>
              <ImageUpload value={settings?.logoUrl || ""} onChange={handleLogoChange} />
              {settings?.logoUrl && (
                <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
                  <img src={settings.logoUrl} alt="Current logo" className="h-10 object-contain" />
                  <span className="text-xs text-slate-500">Current logo preview</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Favicon</label>
              <p className="text-xs text-slate-500 mb-2">Browser tab icon. Recommended: 32x32px ICO or PNG.</p>
              <ImageUpload value={settings?.favicon || ""} onChange={handleFaviconChange} />
              {settings?.favicon && (
                <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
                  <img src={settings.favicon} alt="Current favicon" className="w-8 h-8 object-contain" />
                  <span className="text-xs text-slate-500">Current favicon preview</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Selector & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                activeSection === sec.id 
                  ? "bg-amber-500/10 border-amber-500/50 text-amber-500" 
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="font-medium">{sec.name}</div>
              <div className="text-xs opacity-70 mt-1">{sec.desc}</div>
            </button>
          ))}
        </div>
        <div className="lg:col-span-3 pb-12 space-y-6">
          <CMSForm sectionKey={activeSection} title={SECTIONS.find(s => s.id === activeSection)?.name || ""} />
          
          {/* Specialized editors for data-driven sections */}
          {activeSection === "hero" && <HeroSectionEditor />}
          {activeSection === "stats" && <StatsEditor />}
          {activeSection === "what-we-build" && <ProductsEditor />}
          {activeSection === "why-choose-us" && <FeaturesEditor />}
          {activeSection === "projects" && <ProjectsEditor />}
          {activeSection === "clients" && <SectorsEditor />}
        </div>
      </div>
    </div>
  );
}

function CMSForm({ sectionKey, title }: { sectionKey: string, title: string }) {
  const { data: content, refetch, isLoading } = trpc.admin.content.get.useQuery({ sectionKey });
  const updateContent = trpc.admin.content.update.useMutation();

  const [formData, setFormData] = useState({ title: "", description: "", contentEn: "", contentAr: "" });

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || "",
        description: content.description || "",
        contentEn: content.contentEn || "",
        contentAr: content.contentAr || "",
      });
    } else {
      setFormData({ title: "", description: "", contentEn: "", contentAr: "" });
    }
  }, [content, sectionKey]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent.mutate({ sectionKey, ...formData }, {
      onSuccess: () => {
        toast.success(`${title} updated successfully!`);
        refetch();
      }
    });
  };

  if (isLoading) return <div className="text-slate-400 p-8 text-center border border-slate-800 rounded-lg">Loading {title}...</div>;

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Edit {title}</CardTitle>
        <CardDescription>Text content for this section — connects directly to the live website</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Main Heading</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-950 border-slate-800"
              placeholder="e.g. WHAT WE BUILD"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Subheading / Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-950 border-slate-800 h-24"
              placeholder="From arched elegance to geodesic innovation..."
            />
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <label className="text-sm font-medium text-slate-300">Extra Content (Optional JSON data)</label>
            <Textarea
              value={formData.contentEn}
              onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
              className="bg-slate-950 border-slate-800 h-48 font-mono text-sm"
              placeholder="Store bullet points or JSON array here if needed by the component"
            />
          </div>

          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 w-full" disabled={updateContent.isPending}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes to Website
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function HeroSectionEditor() {
  const { data: hero, refetch, isLoading } = trpc.admin.hero.get.useQuery();
  const updateHero = trpc.admin.hero.update.useMutation();

  const [formData, setFormData] = useState({
    titleEn: "", titleAr: "", subtitleEn: "", subtitleAr: "",
    labelEn: "", labelAr: "",
    cta1TextEn: "", cta1TextAr: "", cta1Link: "",
    cta2TextEn: "", cta2TextAr: "", cta2Link: "",
    imageUrl: "", iconColor: "",
  });

  useEffect(() => {
    if (hero) {
      setFormData({
        titleEn: hero.titleEn || "",
        titleAr: hero.titleAr || "",
        subtitleEn: hero.subtitleEn || "",
        subtitleAr: hero.subtitleAr || "",
        labelEn: hero.labelEn || "",
        labelAr: hero.labelAr || "",
        cta1TextEn: hero.cta1TextEn || "",
        cta1TextAr: hero.cta1TextAr || "",
        cta1Link: hero.cta1Link || "",
        cta2TextEn: hero.cta2TextEn || "",
        cta2TextAr: hero.cta2TextAr || "",
        cta2Link: hero.cta2Link || "",
        imageUrl: hero.imageUrl || "",
        iconColor: hero.iconColor || "",
      });
    }
  }, [hero]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero.mutate(formData, {
      onSuccess: () => { toast.success("Hero section updated!"); refetch(); }
    });
  };

  if (isLoading) return <div className="text-slate-400 p-8 text-center border border-slate-800 rounded-lg">Loading hero section...</div>;

  return (
    <Card className="bg-slate-900 border-slate-800 mt-6">
      <CardHeader>
        <CardTitle>Hero Section Settings</CardTitle>
        <CardDescription>Background image, title, subtitle, and call-to-action buttons</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          {/* Background Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Hero Background Image</label>
            <p className="text-xs text-slate-500 mb-2">Full-screen background behind the hero content. Recommended: 1920x1080px+</p>
            <ImageUpload value={formData.imageUrl} onChange={(url) => setFormData({ ...formData, imageUrl: url })} />
          </div>

          {/* Bilingual Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Title (English)</label>
              <Textarea value={formData.titleEn} onChange={e => setFormData({ ...formData, titleEn: e.target.value })} className="bg-slate-950 border-slate-800 h-20" placeholder="Premium Tent Solutions&#10;For Every Occasion" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Title (Arabic)</label>
              <Textarea value={formData.titleAr} onChange={e => setFormData({ ...formData, titleAr: e.target.value })} className="bg-slate-950 border-slate-800 h-20" dir="rtl" />
            </div>
          </div>

          {/* Bilingual Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Subtitle (English)</label>
              <Textarea value={formData.subtitleEn} onChange={e => setFormData({ ...formData, subtitleEn: e.target.value })} className="bg-slate-950 border-slate-800 h-20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Subtitle (Arabic)</label>
              <Textarea value={formData.subtitleAr} onChange={e => setFormData({ ...formData, subtitleAr: e.target.value })} className="bg-slate-950 border-slate-800 h-20" dir="rtl" />
            </div>
          </div>

          {/* Section Label */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Label (English)</label>
              <Input value={formData.labelEn} onChange={e => setFormData({ ...formData, labelEn: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Premium Tent Solutions" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Label (Arabic)</label>
              <Input value={formData.labelAr} onChange={e => setFormData({ ...formData, labelAr: e.target.value })} className="bg-slate-950 border-slate-800" dir="rtl" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="border-t border-slate-800 pt-6">
            <h4 className="text-md font-bold text-white mb-4">Call-to-Action Buttons</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 1 Text (English)</label>
                <Input value={formData.cta1TextEn} onChange={e => setFormData({ ...formData, cta1TextEn: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="CALL NOW" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 1 Text (Arabic)</label>
                <Input value={formData.cta1TextAr} onChange={e => setFormData({ ...formData, cta1TextAr: e.target.value })} className="bg-slate-950 border-slate-800" dir="rtl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 1 Link</label>
                <Input value={formData.cta1Link} onChange={e => setFormData({ ...formData, cta1Link: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="tel:+97433555918" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 2 Text (English)</label>
                <Input value={formData.cta2TextEn} onChange={e => setFormData({ ...formData, cta2TextEn: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="CONTACT US ON WHATSAPP" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 2 Text (Arabic)</label>
                <Input value={formData.cta2TextAr} onChange={e => setFormData({ ...formData, cta2TextAr: e.target.value })} className="bg-slate-950 border-slate-800" dir="rtl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 2 Link</label>
                <Input value={formData.cta2Link} onChange={e => setFormData({ ...formData, cta2Link: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="https://wa.me/97433555918" />
              </div>
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Accent Icon Color (Hex)</label>
            <div className="flex items-center gap-3">
              <input type="color" value={formData.iconColor || "#c9a84c"} onChange={e => setFormData({ ...formData, iconColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer bg-transparent border border-slate-800" />
              <Input value={formData.iconColor} onChange={e => setFormData({ ...formData, iconColor: e.target.value })} className="bg-slate-950 border-slate-800 w-32 font-mono" placeholder="#c9a84c" />
            </div>
          </div>

          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 w-full" disabled={updateHero.isPending}>
            <Save className="w-4 h-4 mr-2" /> Save Hero Section
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function StatsEditor() {
  const { data: stats, refetch, isLoading } = trpc.admin.statistics.get.useQuery();
  const updateStats = trpc.admin.statistics.update.useMutation();

  const [formData, setFormData] = useState({
    projectsCompleted: 0, yearsOfExperience: 0, happyClients: 0, countriesServed: 0,
  });

  useEffect(() => {
    if (stats) {
      setFormData({
        projectsCompleted: stats.projectsCompleted || 0,
        yearsOfExperience: stats.yearsOfExperience || 0,
        happyClients: stats.happyClients || 0,
        countriesServed: stats.countriesServed || 0,
      });
    }
  }, [stats]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStats.mutate(formData, {
      onSuccess: () => { toast.success("Statistics updated!"); refetch(); }
    });
  };

  if (isLoading) return <div className="text-slate-400 p-8 text-center border border-slate-800 rounded-lg">Loading statistics...</div>;

  return (
    <Card className="bg-slate-900 border-slate-800 mt-6">
      <CardHeader>
        <CardTitle>Our Numbers — Statistics</CardTitle>
        <CardDescription>These numbers appear in the stats section of your homepage</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Projects Completed</label>
              <Input type="number" value={formData.projectsCompleted} onChange={e => setFormData({ ...formData, projectsCompleted: parseInt(e.target.value) || 0 })} className="bg-slate-950 border-slate-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Years of Experience</label>
              <Input type="number" value={formData.yearsOfExperience} onChange={e => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })} className="bg-slate-950 border-slate-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Happy Clients</label>
              <Input type="number" value={formData.happyClients} onChange={e => setFormData({ ...formData, happyClients: parseInt(e.target.value) || 0 })} className="bg-slate-950 border-slate-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Countries Served</label>
              <Input type="number" value={formData.countriesServed} onChange={e => setFormData({ ...formData, countriesServed: parseInt(e.target.value) || 0 })} className="bg-slate-950 border-slate-800" />
            </div>
          </div>
          <Button type="submit" className="bg-amber-600 hover:bg-amber-700 w-full" disabled={updateStats.isPending}>
            <Save className="w-4 h-4 mr-2" /> Save Statistics
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
