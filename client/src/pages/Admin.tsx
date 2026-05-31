import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export default function Admin() {
  const { isAuthenticated } = useAdmin();

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}
