import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { LogOut, Save, Plus, Trash2, Menu, X } from "lucide-react";

export default function AdminDashboard() {
  const { logout, adminContent, updateContent } = useAdmin();
  const [activeTab, setActiveTab] = useState("contact");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingStats, setEditingStats] = useState(adminContent.stats || {});
  const [editingTestimonials, setEditingTestimonials] = useState(adminContent.testimonials || []);
  const [newTestimonial, setNewTestimonial] = useState({ text: "", author: "", role: "" });
  const [contactInfo, setContactInfo] = useState({
    phone: adminContent.phone || "+97433555918",
    email: adminContent.email || "info@alnoortents.com",
    address: adminContent.address || "Dubai, United Arab Emirates",
    whatsapp: adminContent.whatsapp || "https://wa.me/97433555918",
    instagram: adminContent.instagram || "https://instagram.com/alnoortents",
    facebook: adminContent.facebook || "https://facebook.com/alnoortents",
  });

  const handleSaveContact = () => {
    updateContent("phone", contactInfo.phone);
    updateContent("email", contactInfo.email);
    updateContent("address", contactInfo.address);
    updateContent("whatsapp", contactInfo.whatsapp);
    updateContent("instagram", contactInfo.instagram);
    updateContent("facebook", contactInfo.facebook);
    alert("Contact information saved!");
  };

  const handleSaveStats = () => {
    updateContent("stats", editingStats);
    alert("Statistics saved!");
  };

  const handleAddTestimonial = () => {
    if (newTestimonial.text && newTestimonial.author) {
      const updated = [
        ...editingTestimonials,
        { id: Date.now(), ...newTestimonial },
      ];
      setEditingTestimonials(updated);
      updateContent("testimonials", updated);
      setNewTestimonial({ text: "", author: "", role: "" });
      alert("Testimonial added!");
    }
  };

  const handleDeleteTestimonial = (id: number) => {
    const updated = editingTestimonials.filter((t: any) => t.id !== id);
    setEditingTestimonials(updated);
    updateContent("testimonials", updated);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-card border-r border-border transition-all duration-300 overflow-hidden`}
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage your content</p>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { id: "contact", label: "Contact Info" },
            { id: "stats", label: "Statistics" },
            { id: "testimonials", label: "Testimonials" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-gold/20 text-gold font-medium"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-foreground hover:text-gold transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="w-6" />
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Contact Info Tab */}
          {activeTab === "contact" && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>

              <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <input
                    type="text"
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">WhatsApp URL</label>
                  <input
                    type="text"
                    value={contactInfo.whatsapp}
                    onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Instagram URL</label>
                  <input
                    type="text"
                    value={contactInfo.instagram}
                    onChange={(e) => setContactInfo({ ...contactInfo, instagram: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Facebook URL</label>
                  <input
                    type="text"
                    value={contactInfo.facebook}
                    onChange={(e) => setContactInfo({ ...contactInfo, facebook: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>

                <button onClick={handleSaveContact} className="w-full btn-gold mt-6 flex items-center justify-center gap-2">
                  <Save size={18} />
                  Save Contact Information
                </button>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === "stats" && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Statistics</h2>

              <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Projects Completed</label>
                    <input
                      type="number"
                      value={editingStats.projects || 0}
                      onChange={(e) => setEditingStats({ ...editingStats, projects: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
                    <input
                      type="number"
                      value={editingStats.years || 0}
                      onChange={(e) => setEditingStats({ ...editingStats, years: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Happy Clients</label>
                    <input
                      type="number"
                      value={editingStats.clients || 0}
                      onChange={(e) => setEditingStats({ ...editingStats, clients: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Countries Served</label>
                    <input
                      type="number"
                      value={editingStats.countries || 0}
                      onChange={(e) => setEditingStats({ ...editingStats, countries: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                </div>

                <button onClick={handleSaveStats} className="w-full btn-gold mt-6 flex items-center justify-center gap-2">
                  <Save size={18} />
                  Save Statistics
                </button>
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Testimonials</h2>

              {/* Add new testimonial */}
              <div className="bg-card p-6 rounded-lg border border-border mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Add New Testimonial</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Testimonial Text</label>
                    <textarea
                      value={newTestimonial.text}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                      placeholder="Enter testimonial text..."
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 min-h-24 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Author Name</label>
                      <input
                        type="text"
                        value={newTestimonial.author}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, author: e.target.value })}
                        placeholder="Author name..."
                        className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Author Role</label>
                      <input
                        type="text"
                        value={newTestimonial.role}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                        placeholder="e.g., Wedding Planner, Abu Dhabi"
                        className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleAddTestimonial}
                    className="w-full btn-gold flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Add Testimonial
                  </button>
                </div>
              </div>

              {/* List existing testimonials */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Existing Testimonials</h3>
                {editingTestimonials.map((testimonial: any) => (
                  <div key={testimonial.id} className="bg-card p-4 rounded-lg border border-border">
                    <p className="text-foreground mb-3 italic">"{testimonial.text}"</p>
                    <p className="text-sm font-semibold text-gold mb-1">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground mb-3">{testimonial.role}</p>
                    <button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="flex items-center gap-2 text-destructive hover:text-destructive/80 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
