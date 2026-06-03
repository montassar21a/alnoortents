import React, { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, GripVertical, Eye, EyeOff, Save, Copy, Trash2 } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from "sonner";
import HeroSection from "@/components/HeroSection";
import WhatWeBuild from "@/components/WhatWeBuild";
import WhyAlNoor from "@/components/WhyAlNoor";
import { Button } from "@/components/ui/button";

const sectionComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  services: WhatWeBuild,
  about: WhyAlNoor,
};

function SortableItem({ id, section, onClick, isSelected, onToggleVisible, onDelete, onDuplicate }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={`flex items-center gap-2 p-3 mb-2 rounded border cursor-pointer ${isSelected ? 'border-[#c9a84c] bg-[#c9a84c]/10' : 'border-neutral-800 bg-neutral-900'}`} onClick={() => onClick(section)}>
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="h-5 w-5 text-neutral-500" />
      </div>
      <div className="flex-1 font-medium text-white capitalize">{section.sectionType}</div>
      <div className="flex gap-2">
        <button onClick={(e) => { e.stopPropagation(); onToggleVisible(section); }} className="p-1 hover:text-[#c9a84c]">
          {section.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-neutral-500" />}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDuplicate(section); }} className="p-1 hover:text-blue-400">
          <Copy className="h-4 w-4" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(section); }} className="p-1 hover:text-red-500">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function PageBuilder() {
  const utils = trpc.useUtils();
  const { data: sections, isLoading } = trpc.homepage.getSections.useQuery({ activeOnly: false });
  const updateSection = trpc.homepage.updateSection.useMutation({
    onSuccess: () => { toast.success("Saved"); utils.homepage.getSections.invalidate(); }
  });
  const createSection = trpc.homepage.createSection.useMutation({
    onSuccess: () => { toast.success("Created"); utils.homepage.getSections.invalidate(); }
  });
  const deleteSection = trpc.homepage.deleteSection.useMutation({
    onSuccess: () => { toast.success("Deleted"); utils.homepage.getSections.invalidate(); }
  });

  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [formData, setFormData] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id && sections) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newOrder = arrayMove(sections, oldIndex, newIndex);
      
      // Update all orders sequentially
      newOrder.forEach((section, index) => {
        updateSection.mutate({ id: section.id, orderIndex: index });
      });
    }
  };

  const selectSection = (section: any) => {
    setSelectedSection(section);
    setFormData(section.content);
  };

  const handleSaveContent = () => {
    if (!selectedSection) return;
    try {
      JSON.parse(formData); // Validate JSON
      updateSection.mutate({ id: selectedSection.id, content: formData });
    } catch (e) {
      toast.error("Invalid JSON format");
    }
  };

  const handleAddNew = () => {
    createSection.mutate({
      pageName: "home",
      sectionType: "hero",
      content: JSON.stringify({ line1: "New Hero", line2: "AWESOME", line3: "TENTS" }),
      orderIndex: sections ? sections.length : 0,
      isActive: true,
    });
  };

  if (isLoading) return <div className="p-8 text-white"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="flex h-screen bg-[#111] text-white overflow-hidden">
      {/* LEFT PANEL: Section List */}
      <div className="w-80 border-r border-neutral-800 flex flex-col">
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="font-bold text-lg text-[#c9a84c]">Page Builder</h2>
          <Button size="icon" variant="ghost" onClick={handleAddNew}><Plus className="h-5 w-5" /></Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections?.map(s => s.id) || []} strategy={verticalListSortingStrategy}>
              {sections?.map(section => (
                <SortableItem 
                  key={section.id} 
                  id={section.id} 
                  section={section} 
                  isSelected={selectedSection?.id === section.id}
                  onClick={selectSection}
                  onToggleVisible={(s) => updateSection.mutate({ id: s.id, isActive: !s.isActive })}
                  onDelete={(s) => deleteSection.mutate({ id: s.id })}
                  onDuplicate={(s) => createSection.mutate({ ...s, id: undefined, orderIndex: sections.length })}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* MIDDLE PANEL: Editor */}
      <div className="w-96 border-r border-neutral-800 flex flex-col">
        {selectedSection ? (
          <>
            <div className="p-4 border-b border-neutral-800">
              <h3 className="font-medium text-lg">Edit {selectedSection.sectionType}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <label className="block text-sm text-neutral-400 mb-2">Content (JSON)</label>
              <textarea 
                className="w-full h-[60vh] bg-neutral-900 border border-neutral-800 rounded p-4 font-mono text-sm text-green-400"
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
              />
              <Button className="w-full mt-4 bg-[#c9a84c] hover:bg-[#b09030] text-black" onClick={handleSaveContent}>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-500 p-8 text-center">
            Select a section to edit its content
          </div>
        )}
      </div>

      {/* RIGHT PANEL: Live Preview */}
      <div className="flex-1 flex flex-col bg-neutral-950 relative overflow-hidden">
        <div className="p-2 border-b border-neutral-800 flex justify-between items-center text-sm text-neutral-400 bg-neutral-900">
          <span>Live Preview</span>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ transform: "scale(0.8)", transformOrigin: "top center" }}>
          <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#111]">
            {sections?.map((section) => {
              const Component = sectionComponents[section.sectionType];
              if (!Component || (!section.isActive && section.id !== selectedSection?.id)) return null;
              
              let previewData = {};
              try {
                previewData = section.id === selectedSection?.id ? JSON.parse(formData) : JSON.parse(section.content);
              } catch (e) {}

              return (
                <div key={section.id} className={`relative ${section.id === selectedSection?.id ? 'ring-2 ring-[#c9a84c]' : ''}`}>
                  <Component data={previewData} />
                  {!section.isActive && section.id === selectedSection?.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm pointer-events-none z-50">
                      <span className="bg-neutral-900 px-4 py-2 rounded text-white font-medium">Hidden on Live Site</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
