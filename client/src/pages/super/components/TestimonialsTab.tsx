import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Save, Trash2, Edit } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";

export default function TestimonialsTab() {
  const { data: testimonials, refetch, isLoading } = trpc.admin.testimonials.list.useQuery();
  const createMutation = trpc.admin.testimonials.create.useMutation();
  const updateMutation = trpc.admin.testimonials.update.useMutation();
  const deleteMutation = trpc.admin.testimonials.delete.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    textEn: "", textAr: "", authorName: "", authorRole: "", authorImage: "", isVisible: true, order: 0
  });

  const resetForm = () => {
    setFormData({ textEn: "", textAr: "", authorName: "", authorRole: "", authorImage: "", isVisible: true, order: 0 });
    setEditingId(null);
    setIsCreating(false);
  };

  const handleEdit = (item: any) => {
    setFormData({
      textEn: item.textEn,
      textAr: item.textAr || "",
      authorName: item.authorName,
      authorRole: item.authorRole || "",
      authorImage: item.authorImage || "",
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
        onSuccess: () => {
          toast.success("Testimonial updated!");
          resetForm();
          refetch();
        }
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Testimonial created!");
          resetForm();
          refetch();
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast.success("Testimonial deleted!");
          refetch();
        }
      });
    }
  };

  if (isLoading) return <div className="text-slate-400">Loading testimonials...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Client Testimonials</h2>
          <p className="text-slate-400">Manage what your clients say about you.</p>
        </div>
        {!isCreating && !editingId && (
          <Button onClick={() => setIsCreating(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add New Testimonial
          </Button>
        )}
      </div>

      {(isCreating || editingId) && (
        <Card className="bg-slate-900 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Testimonial" : "Create New Testimonial"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Client Name *</label>
                  <Input required value={formData.authorName} onChange={e => setFormData({ ...formData, authorName: e.target.value })} className="bg-slate-950 border-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Client Role/Company</label>
                  <Input value={formData.authorRole} onChange={e => setFormData({ ...formData, authorRole: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="e.g. CEO of X" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-300">Review Text (English) *</label>
                  <Textarea required value={formData.textEn} onChange={e => setFormData({ ...formData, textEn: e.target.value })} className="bg-slate-950 border-slate-800" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-300">Review Text (Arabic)</label>
                  <Textarea value={formData.textAr} onChange={e => setFormData({ ...formData, textAr: e.target.value })} className="bg-slate-950 border-slate-800" dir="rtl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Client Photo (Optional)</label>
                  <ImageUpload value={formData.authorImage} onChange={url => setFormData({ ...formData, authorImage: url })} />
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
                  <Save className="w-4 h-4 mr-2" /> Save Testimonial
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials?.map((item) => (
          <Card key={item.id} className={`bg-slate-900 border-slate-800 ${!item.isVisible ? 'opacity-50' : ''}`}>
            <CardContent className="p-5 flex flex-col h-full">
              <div className="flex-1 mb-4 text-slate-300 italic text-sm">"{item.textEn}"</div>
              <div className="flex items-center mt-auto border-t border-slate-800 pt-4">
                {item.authorImage ? (
                  <img src={item.authorImage} alt={item.authorName} className="w-10 h-10 rounded-full mr-3 object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-800 mr-3 flex items-center justify-center text-slate-500 font-bold">{item.authorName.charAt(0)}</div>
                )}
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{item.authorName}</div>
                  <div className="text-xs text-slate-500">{item.authorRole}</div>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(item)} className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"><Edit className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {testimonials?.length === 0 && !isCreating && (
          <div className="col-span-full p-8 text-center border-2 border-dashed border-slate-800 rounded-lg text-slate-500">
            No testimonials added yet.
          </div>
        )}
      </div>
    </div>
  );
}
