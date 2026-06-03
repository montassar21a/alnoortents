import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Save, Trash2, Edit } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";

export function ProjectsEditor() {
  const { data: items, refetch, isLoading } = trpc.admin.projects.list.useQuery();
  const createMutation = trpc.admin.projects.create.useMutation();
  const updateMutation = trpc.admin.projects.update.useMutation();
  const deleteMutation = trpc.admin.projects.delete.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: "", titleAr: "", categoryEn: "", categoryAr: "", imageUrl: "", isVisible: true, order: 0
  });

  const resetForm = () => {
    setFormData({ titleEn: "", titleAr: "", categoryEn: "", categoryAr: "", imageUrl: "", isVisible: true, order: 0 });
    setEditingId(null);
    setIsCreating(false);
  };

  const handleEdit = (item: any) => {
    setFormData({
      titleEn: item.titleEn,
      titleAr: item.titleAr || "",
      categoryEn: item.categoryEn || "",
      categoryAr: item.categoryAr || "",
      imageUrl: item.imageUrl || "",
      isVisible: item.isVisible,
      order: item.order || 0
    });
    setEditingId(item.id);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      toast.error("An image is required for projects.");
      return;
    }
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...formData }, {
        onSuccess: () => { toast.success("Project updated!"); resetForm(); refetch(); }
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => { toast.success("Project created!"); resetForm(); refetch(); }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => { toast.success("Project deleted!"); refetch(); }
      });
    }
  };

  if (isLoading) return <div className="text-slate-400">Loading projects...</div>;

  return (
    <div className="space-y-6 mt-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Manage Projects Portfolio</h3>
        {!isCreating && !editingId && (
          <Button onClick={() => setIsCreating(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </Button>
        )}
      </div>

      {(isCreating || editingId) && (
        <Card className="bg-slate-900 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Project" : "Add New Project"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Title (English) *</label>
                  <Input required value={formData.titleEn} onChange={e => setFormData({ ...formData, titleEn: e.target.value })} className="bg-slate-950 border-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Title (Arabic)</label>
                  <Input value={formData.titleAr} onChange={e => setFormData({ ...formData, titleAr: e.target.value })} className="bg-slate-950 border-slate-800" dir="rtl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Category (e.g. government, weddings) *</label>
                  <Input required value={formData.categoryEn} onChange={e => setFormData({ ...formData, categoryEn: e.target.value })} className="bg-slate-950 border-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Category (Arabic)</label>
                  <Input value={formData.categoryAr} onChange={e => setFormData({ ...formData, categoryAr: e.target.value })} className="bg-slate-950 border-slate-800" dir="rtl" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-300">Project Image *</label>
                  <ImageUpload value={formData.imageUrl} onChange={url => setFormData({ ...formData, imageUrl: url })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Order (Priority)</label>
                  <Input type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} className="bg-slate-950 border-slate-800" />
                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="isVisible" checked={formData.isVisible} onCheckedChange={(c) => setFormData({ ...formData, isVisible: c === true })} />
                    <label htmlFor="isVisible" className="text-sm font-medium text-white cursor-pointer">Visible on Website</label>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button type="button" variant="outline" onClick={resetForm} className="border-slate-700 hover:bg-slate-800 text-white">Cancel</Button>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Save className="w-4 h-4 mr-2" /> Save Project
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((item) => (
          <Card key={item.id} className={`bg-slate-900 border-slate-800 overflow-hidden ${!item.isVisible ? 'opacity-50' : ''}`}>
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.titleEn} className="w-full h-32 object-cover border-b border-slate-800" />
            ) : (
              <div className="w-full h-32 bg-slate-800 flex items-center justify-center text-slate-500 text-xs">No Image</div>
            )}
            <CardContent className="p-4 flex gap-2 items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm truncate">{item.titleEn}</div>
                <div className="text-xs text-amber-500 uppercase tracking-wider">{item.categoryEn}</div>
              </div>
              <div className="flex flex-col gap-1">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(item)} className="h-6 w-6 text-blue-400 hover:text-blue-300"><Edit className="h-3 w-3" /></Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)} className="h-6 w-6 text-red-400 hover:text-red-300"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {items?.length === 0 && !isCreating && (
          <div className="col-span-full p-8 text-center border-2 border-dashed border-slate-800 rounded-lg text-slate-500">
            No projects added yet.
          </div>
        )}
      </div>
    </div>
  );
}
