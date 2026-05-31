import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const SECTIONS = [
  { id: "hero", name: "Hero Section", desc: "Main top section of the website" },
  { id: "marquee", name: "Marquee Strip", desc: "Scrolling ticker text" },
  { id: "what-we-build", name: "Our Products", desc: "Types of tents you build" },
  { id: "why-choose-us", name: "Why Choose Us", desc: "Company features and benefits" },
  { id: "stats", name: "Our Numbers", desc: "Stats and achievements" },
  { id: "projects", name: "Our Work", desc: "Gallery and projects section" },
  { id: "clients", name: "Our Clients", desc: "Who we work with" },
  { id: "testimonials", name: "Testimonials Header", desc: "Client reviews section header" },
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
      <div className="lg:col-span-3">
        <CMSForm sectionKey={activeSection} title={SECTIONS.find(s => s.id === activeSection)?.name || ""} />
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
        <CardDescription>This text connects directly to the live website</CardDescription>
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
