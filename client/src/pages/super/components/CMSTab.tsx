import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
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

  return (
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
        {activeSection === "marquee" && <MarqueeEditor />}
        {activeSection === "stats" && <StatsEditor />}
        {activeSection === "contact" && <ContactEditor />}
        {activeSection === "what-we-build" && <ProductsEditor />}
        {activeSection === "why-choose-us" && <FeaturesEditor />}
        {activeSection === "projects" && <ProjectsEditor />}
        {activeSection === "clients" && <SectorsEditor />}
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
            <label className="text-sm font-medium text-slate-300">Main Heading <span className="text-xs text-slate-500">(English)</span></label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-950 border-slate-800"
              placeholder="e.g. WHAT WE BUILD"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Subheading / Description <span className="text-xs text-slate-500">(English)</span></label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-950 border-slate-800 h-24"
              placeholder="From arched elegance to geodesic innovation..."
            />
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h4 className="text-sm font-semibold text-white">Extra Content</h4>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">English Content</label>
              <Textarea
                value={formData.contentEn}
                onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                className="bg-slate-950 border-slate-800 h-32 font-mono text-sm"
                placeholder="English version — JSON arrays, bullet points, or comma-separated values"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Arabic Content (محتوى عربي)</label>
              <Textarea
                value={formData.contentAr}
                onChange={(e) => setFormData({ ...formData, contentAr: e.target.value })}
                className="bg-slate-950 border-slate-800 h-32 font-mono text-sm"
                dir="rtl"
                placeholder="النسخة العربية — مصفوفات JSON أو نقاط أو قيم مفصولة بفواصل"
              />
            </div>
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
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Hero Section Settings</CardTitle>
        <CardDescription>Background image, title, subtitle, and call-to-action buttons</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Hero Background Image</label>
            <p className="text-xs text-slate-500 mb-2">Full-screen background behind the hero content. Recommended: 1920x1080px+</p>
            <ImageUpload value={formData.imageUrl} onChange={(url) => setFormData({ ...formData, imageUrl: url })} />
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="Hero background" className="w-full h-32 object-cover rounded-lg mt-2 border border-slate-800" />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Title <span className="text-xs text-slate-500">(English)</span></label>
              <Textarea value={formData.titleEn} onChange={e => setFormData({ ...formData, titleEn: e.target.value })} className="bg-slate-950 border-slate-800 h-20" placeholder="Premium Tent Solutions&#10;For Every Occasion" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Title <span className="text-xs text-slate-500">(Arabic)</span></label>
              <Textarea value={formData.titleAr} onChange={e => setFormData({ ...formData, titleAr: e.target.value })} className="bg-slate-950 border-slate-800 h-20" dir="rtl" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Subtitle <span className="text-xs text-slate-500">(English)</span></label>
              <Textarea value={formData.subtitleEn} onChange={e => setFormData({ ...formData, subtitleEn: e.target.value })} className="bg-slate-950 border-slate-800 h-20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Subtitle <span className="text-xs text-slate-500">(Arabic)</span></label>
              <Textarea value={formData.subtitleAr} onChange={e => setFormData({ ...formData, subtitleAr: e.target.value })} className="bg-slate-950 border-slate-800 h-20" dir="rtl" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Label <span className="text-xs text-slate-500">(English)</span></label>
              <Input value={formData.labelEn} onChange={e => setFormData({ ...formData, labelEn: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Premium Tent Solutions" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Label <span className="text-xs text-slate-500">(Arabic)</span></label>
              <Input value={formData.labelAr} onChange={e => setFormData({ ...formData, labelAr: e.target.value })} className="bg-slate-950 border-slate-800" dir="rtl" />
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <h4 className="text-md font-bold text-white mb-4">Call-to-Action Buttons</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 1 Text <span className="text-xs text-slate-500">(EN)</span></label>
                <Input value={formData.cta1TextEn} onChange={e => setFormData({ ...formData, cta1TextEn: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="CALL NOW" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 1 Text <span className="text-xs text-slate-500">(AR)</span></label>
                <Input value={formData.cta1TextAr} onChange={e => setFormData({ ...formData, cta1TextAr: e.target.value })} className="bg-slate-950 border-slate-800" dir="rtl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 1 Link</label>
                <Input value={formData.cta1Link} onChange={e => setFormData({ ...formData, cta1Link: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="tel:+97433555918" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 2 Text <span className="text-xs text-slate-500">(EN)</span></label>
                <Input value={formData.cta2TextEn} onChange={e => setFormData({ ...formData, cta2TextEn: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="CONTACT US ON WHATSAPP" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 2 Text <span className="text-xs text-slate-500">(AR)</span></label>
                <Input value={formData.cta2TextAr} onChange={e => setFormData({ ...formData, cta2TextAr: e.target.value })} className="bg-slate-950 border-slate-800" dir="rtl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">CTA 2 Link</label>
                <Input value={formData.cta2Link} onChange={e => setFormData({ ...formData, cta2Link: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="https://wa.me/97433555918" />
              </div>
            </div>
          </div>

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

function MarqueeEditor() {
  const { data: content, refetch, isLoading } = trpc.admin.content.get.useQuery({ sectionKey: "marquee" });
  const updateContent = trpc.admin.content.update.useMutation();

  const [itemsEn, setItemsEn] = useState<string[]>([]);
  const [itemsAr, setItemsAr] = useState<string[]>([]);
  const [newItemEn, setNewItemEn] = useState("");
  const [newItemAr, setNewItemAr] = useState("");

  useEffect(() => {
    if (content) {
      setItemsEn(content.contentEn ? content.contentEn.split(",").map(s => s.trim()).filter(Boolean) : []);
      setItemsAr(content.contentAr ? content.contentAr.split(",").map(s => s.trim()).filter(Boolean) : []);
    }
  }, [content]);

  const handleSave = () => {
    updateContent.mutate({
      sectionKey: "marquee",
      contentEn: itemsEn.join(", "),
      contentAr: itemsAr.join(", "),
    }, {
      onSuccess: () => { toast.success("Marquee updated!"); refetch(); }
    });
  };

  const addItemEn = () => {
    if (newItemEn.trim()) {
      setItemsEn([...itemsEn, newItemEn.trim().toUpperCase()]);
      setNewItemEn("");
    }
  };

  const addItemAr = () => {
    if (newItemAr.trim()) {
      setItemsAr([...itemsAr, newItemAr.trim()]);
      setNewItemAr("");
    }
  };

  const removeItemEn = (index: number) => setItemsEn(itemsEn.filter((_, i) => i !== index));
  const removeItemAr = (index: number) => setItemsAr(itemsAr.filter((_, i) => i !== index));

  if (isLoading) return <div className="text-slate-400 p-8 text-center border border-slate-800 rounded-lg">Loading marquee items...</div>;

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Marquee Strip Items</CardTitle>
        <CardDescription>Scrolling ticker text items — visible on the gold bar below the hero</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* English Items */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">English Items</h4>
          <div className="flex gap-2">
            <Input value={newItemEn} onChange={e => setNewItemEn(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addItemEn())}
              className="bg-slate-950 border-slate-800 flex-1" placeholder="e.g. ARCH TENTS" />
            <Button type="button" onClick={addItemEn} size="icon" className="bg-amber-600 hover:bg-amber-700 shrink-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {itemsEn.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-md text-xs text-white">
                {item}
                <button onClick={() => removeItemEn(i)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
            {itemsEn.length === 0 && <span className="text-xs text-slate-500">No items added yet.</span>}
          </div>
        </div>

        {/* Arabic Items */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Arabic Items (العربية)</h4>
          <div className="flex gap-2">
            <Input value={newItemAr} onChange={e => setNewItemAr(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addItemAr())}
              className="bg-slate-950 border-slate-800 flex-1" dir="rtl" placeholder="مثال: خيام القوس" />
            <Button type="button" onClick={addItemAr} size="icon" className="bg-amber-600 hover:bg-amber-700 shrink-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2" dir="rtl">
            {itemsAr.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-md text-xs text-white">
                {item}
                <button onClick={() => removeItemAr(i)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
            {itemsAr.length === 0 && <span className="text-xs text-slate-500">لا توجد عناصر مضافة بعد.</span>}
          </div>
        </div>

        <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700 w-full">
          <Save className="w-4 h-4 mr-2" /> Save Marquee Items
        </Button>
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
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Our Numbers — Statistics</CardTitle>
        <CardDescription>These numbers appear in the stats section of your homepage with animated counters</CardDescription>
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

function ContactEditor() {
  const { data: settings, refetch: refetchSettings } = trpc.admin.settings.get.useQuery();
  const updateSettings = trpc.admin.settings.update.useMutation();
  const { data: cms, refetch: refetchCms } = trpc.admin.content.get.useQuery({ sectionKey: "contact" });
  const updateCms = trpc.admin.content.update.useMutation();

  const handleSave = (field: string, value: any) => {
    updateSettings.mutate({ [field]: value }, {
      onSuccess: () => { toast.success("Contact info updated!"); refetchSettings(); }
    });
  };

  const handleCmsSave = () => {
    updateCms.mutate({
      sectionKey: "contact",
      title: cms?.title || undefined,
      description: cms?.description || undefined,
    }, {
      onSuccess: () => { toast.success("Contact section text updated!"); refetchCms(); }
    });
  };

  if (!settings) return <div className="text-slate-400 p-8 text-center border border-slate-800 rounded-lg">Loading contact info...</div>;

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Contact & Location Info</CardTitle>
        <CardDescription>Phone, email, address, social links, and map — shown in the contact section and footer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Phone Number</label>
            <Input value={settings.phone || ""} onChange={e => handleSave("phone", e.target.value)} className="bg-slate-950 border-slate-800" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <Input value={settings.email || ""} onChange={e => handleSave("email", e.target.value)} className="bg-slate-950 border-slate-800" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300">Address</label>
            <Textarea value={settings.address || ""} onChange={e => handleSave("address", e.target.value)} className="bg-slate-950 border-slate-800 h-20" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">WhatsApp Link</label>
            <Input value={settings.whatsapp || ""} onChange={e => handleSave("whatsapp", e.target.value)} className="bg-slate-950 border-slate-800" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Instagram</label>
            <Input value={settings.instagram || ""} onChange={e => handleSave("instagram", e.target.value)} className="bg-slate-950 border-slate-800" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Facebook</label>
            <Input value={settings.facebook || ""} onChange={e => handleSave("facebook", e.target.value)} className="bg-slate-950 border-slate-800" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
