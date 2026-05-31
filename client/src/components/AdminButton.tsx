import { useLocation } from "wouter";
import { Settings } from "lucide-react";

export default function AdminButton() {
  const [, navigate] = useLocation();

  return (
    <button
      onClick={() => navigate("/admin")}
      className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
      title="Admin Panel"
    >
      <Settings size={20} />
    </button>
  );
}
