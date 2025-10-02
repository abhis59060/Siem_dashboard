import { X } from "lucide-react";

export default function Sidebar({ toggleSidebar }) {
  return (
    <div className="flex flex-col h-full p-4">
      {/* Close button for mobile */}
      <button onClick={toggleSidebar} className="md:hidden self-end mb-4 text-white">
        <X size={24} />
      </button>

      {/* Logo/Title */}
      

      {/* Navigation Links removed */}
    </div>
  );
}