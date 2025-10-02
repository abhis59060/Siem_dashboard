import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function TopBar({ toggleSidebar }) {
  const [search, setSearch] = useState("");

  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between w-full">
      {/* Hamburger Menu Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="text-white"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-700 text-white">
          <DropdownMenuItem>
            <Link to="/" className="flex items-center">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/alerts" className="flex items-center">Alerts</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/reports" className="flex items-center">Reports</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/settings" className="flex items-center">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/security" className="flex items-center">Security</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-gray-700 p-2 rounded w-1/3 text-white"
      />

      {/* Profile/Notifications */}
      <div className="text-white">Profile / Notifications</div>
    </header>
  );
}