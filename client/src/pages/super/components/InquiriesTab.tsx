import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle } from "lucide-react";

export default function InquiriesTab() {
  const { data: inquiries, refetch } = trpc.admin.inquiries.list.useQuery();
  const updateInquiry = trpc.admin.inquiries.update.useMutation();
  const deleteInquiry = trpc.admin.inquiries.delete.useMutation();

  const handleMarkContacted = (id: number) => {
    updateInquiry.mutate(
      { id, status: "contacted" },
      {
        onSuccess: () => {
          toast.success("Marked as contacted!");
          refetch();
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    deleteInquiry.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success("Inquiry deleted!");
          refetch();
        },
      }
    );
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Visitor Inquiries</CardTitle>
        <CardDescription>Manage requests from your website contact form</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!inquiries || inquiries.length === 0 ? (
            <div className="text-slate-500 text-center py-8">No inquiries yet.</div>
          ) : (
            inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className={`p-4 rounded-lg border flex flex-col md:flex-row gap-4 justify-between items-start ${
                  inquiry.status === "new" ? "bg-amber-500/5 border-amber-500/20" : "bg-slate-950 border-slate-800"
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-white">{inquiry.fullName}</h3>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      inquiry.status === "new" ? "bg-amber-500/20 text-amber-500" : "bg-emerald-500/20 text-emerald-500"
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="text-sm text-slate-400">
                    <a href={`mailto:${inquiry.email}`} className="hover:text-amber-500 mr-4">{inquiry.email}</a>
                    <a href={`tel:${inquiry.phone}`} className="hover:text-amber-500">{inquiry.phone}</a>
                  </div>
                  {inquiry.projectDetails && (
                    <div className="mt-2 text-sm text-slate-300 bg-slate-900 p-3 rounded border border-slate-800">
                      {inquiry.projectDetails}
                    </div>
                  )}
                  <div className="text-xs text-slate-500 mt-2">
                    Received: {new Date(inquiry.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  {inquiry.status === "new" && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 flex-1 md:flex-auto"
                      onClick={() => handleMarkContacted(inquiry.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Done
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                    onClick={() => handleDelete(inquiry.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
