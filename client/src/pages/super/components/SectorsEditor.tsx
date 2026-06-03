import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Save, Trash2, Edit } from "lucide-react";

export function SectorsEditor() {
  const { data: items, refetch, isLoading } = trpc.admin.sectors.list.useQuery();
  const createMutation = trpc.admin.sectors.create.useMutation();
  const updateMutation = trpc.admin.sectors.update.useMutation();
  const deleteMutation = trpc.admin.sectors.delete.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: "", titleAr: "", descEn: "", descAr: "", icon: "", isVisible: true, order: 0
  });

  const resetForm = () => {
    setFormData({ titleEn: "", titleAr: "", descEn: "", descAr: "", icon: "", isVisible: true, order: 0 });
    setEditingId(null);
    setIsCreating(false);
  };

  const handleEdit = (item: any) => {
    setFormData({
      titleEn: item.titleEn,
      titleAr: item.titleAr || "",
      descEn: item.descEn || "",
      descAr: item.descAr || "",
      icon: item.icon || "",
      isVisible: item.isVisible,
      order: item.order || 0
    });
    setEditingId(item.id);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...formData }, {
        onSuccess: () => { toast.success("Sector updated!"); resetForm(); refetch(); }
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => { toast.success("Sector created!"); resetForm(); refetch(); }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this sector?")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => { toast.success("Sector deleted!"); refetch(); }
      });
    }
  };

  if (isLoading) return <div className="text-slate-400">Loading sectors...</div>;

  return (
    <div className="space-y-6 mt-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Manage Clients/Sectors</h3>
        {!isCreating && !editingId && (
          <Button onClick={() => setIsCreating(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Sector
          </Button>
        )}
      </div>

      {(isCreating || editingId) && (
        <Card className="bg-slate-900 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Sector" : "Add New Sector"}</CardTitle>
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
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-300">Description (English)</label>
                  <Textarea value={formData.descEn} onChange={e => setFormData({ ...formData, descEn: e.target.value })} className="bg-slate-950 border-slate-800" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-300">Description (Arabic)</label>
                  <Textarea value={formData.descAr} onChange={e => setFormData({ ...formData, descAr: e.target.value })} className="bg-slate-950 border-slate-800" dir="rtl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Icon ClassName (Lucide)</label>
                  <Input value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="e.g. ShieldCheck" />
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
                  <Save className="w-4 h-4 mr-2" /> Save Sector
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items?.map((item) => (
          <Card key={item.id} className={`bg-slate-900 border-slate-800 ${!item.isVisible ? 'opacity-50' : ''}`}>
            <CardContent className="p-4 flex gap-4 items-center">
              <div className="flex-1">
                <div className="font-bold text-white text-lg">{item.titleEn}</div>
                <div className="text-sm text-slate-400 line-clamp-2">{item.descEn}</div>
                <div className="text-xs text-amber-500 mt-1">Icon: {item.icon}</div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(item)} className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"><Edit className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {items?.length === 0 && !isCreating && (
          <div className="col-span-full p-8 text-center border-2 border-dashed border-slate-800 rounded-lg text-slate-500">
            No sectors added yet.
          </div>
        )}
      </div>
    </div>
  );
}
