import { Menu, Bell, User } from "lucide-react"; 
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
      
      {/* Container for Hamburger Menu and Logo */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-white bg-gray-700 border-gray-600 hover:bg-gray-600"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-700 text-white border-gray-600">
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

        {/* Logo Image */}
        <img 
          src="/logo.png" 
          alt="SIEM Logo" 
          className="h-8 w-auto" 
        />
      </div>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-gray-700 p-2 rounded w-1/3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />

      {/* Notifications and Profile Icons with Enhanced Animations */}
      <div className="flex items-center space-x-2">
        
        {/* 1. Notifications Icon (Bell) - Ringing Shake Animation */}
        <Button 
          variant="ghost" 
          size="icon"
          className="relative text-gray-300 hover:text-white hover:bg-gray-700 
                     transition-colors duration-300 ease-in-out 
                     transform hover:rotate-6 hover:scale-105" // ⬅️ UPDATED: Quick rotate and scale on hover
        >
          <Bell 
            size={20} 
            // ⬅️ NEW: Use 'animate-bounce' but on a shorter cycle for a 'ring' look
            className="group-hover:animate-bounce hover:rotate-6 transition-transform"
          />
          {/* Optional: Notification Badge */}
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>
        
        {/* 2. Profile Icon (User) - Quick Rotate and Scale */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-300 hover:text-white hover:bg-gray-700 
                     transition-all duration-300 ease-in-out 
                     transform hover:scale-110 hover:-rotate-6" // ⬅️ UPDATED: Scale up and slight reverse rotation
        >
          <User size={20} />
        </Button>
      </div>
      
    </header>
  );
}