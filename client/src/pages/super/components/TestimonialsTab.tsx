import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

export default function TestimonialsTab() {
  const { data: testimonials, refetch } = trpc.admin.testimonials.list.useQuery();
  const createTestimonial = trpc.admin.testimonials.create.useMutation();
  const deleteTestimonial = trpc.admin.testimonials.delete.useMutation();

  const [formData, setFormData] = useState({ textEn: "", authorName: "", authorRole: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    createTestimonial.mutate(formData, {
      onSuccess: () => {
        toast.success("Testimonial added!");
        setFormData({ textEn: "", authorName: "", authorRole: "" });
        refetch();
      }
    });
  };

  const handleDelete = (id: number) => {
    deleteTestimonial.mutate({ id }, {
      onSuccess: () => {
        toast.success("Testimonial deleted!");
        refetch();
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>Add New Testimonial</CardTitle>
          <CardDescription>Add reviews from your clients</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">Client Review</label>
                <Textarea
                  required
                  value={formData.textEn}
                  onChange={(e) => setFormData({ ...formData, textEn: e.target.value })}
                  className="bg-slate-950 border-slate-800"
                  placeholder="The tents were amazing..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Client Name</label>
                <Input
                  required
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Company / Role</label>
                <Input
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  className="bg-slate-950 border-slate-800"
                  placeholder="e.g. Wedding Planner"
                />
              </div>
            </div>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 w-full md:w-auto" disabled={createTestimonial.isPending}>
              <Plus className="w-4 h-4 mr-2" /> Add Testimonial
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>Existing Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testimonials?.map(t => (
              <div key={t.id} className="flex justify-between items-start p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">{t.authorName} <span className="text-slate-500 text-sm font-normal">({t.authorRole})</span></p>
                  <p className="text-slate-400 text-sm mt-1">"{t.textEn}"</p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10" onClick={() => handleDelete(t.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
