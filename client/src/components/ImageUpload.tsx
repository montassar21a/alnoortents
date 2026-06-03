import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      onChange(data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset input
      if (e.target) e.target.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-900 group max-w-sm">
          <img src={value} alt="Uploaded" className="w-full h-auto max-h-[200px] object-contain" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button type="button" variant="destructive" size="sm" onClick={handleRemove}>
              <X className="w-4 h-4 mr-2" /> Remove Image
            </Button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full max-w-sm h-32 border-2 border-slate-800 border-dashed rounded-lg cursor-pointer bg-slate-900 hover:bg-slate-800/50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400">
            {isUploading ? (
              <Loader2 className="w-8 h-8 mb-3 animate-spin text-amber-500" />
            ) : (
              <Upload className="w-8 h-8 mb-3 text-slate-500 group-hover:text-amber-500 transition-colors" />
            )}
            <p className="mb-2 text-sm">
              <span className="font-semibold text-amber-500">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
        </label>
      )}
    </div>
  );
}
