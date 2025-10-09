import { Menu, Bell } from "lucide-react"; 
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator, // ⬅️ NEW: Added for visual separation in the menu
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

// ⬅️ NEW: Define initials for the fallback avatar
const userInitials = "AA";

export default function TopBar({ toggleSidebar }) {
  const [search, setSearch] = useState("");
  // ⬅️ NEW: State to manage avatar image load status
  const [imageFailed, setImageFailed] = useState(false);

  // ⬅️ NEW: A simple inline component for the Avatar
  const Avatar = () => (
    <div
      className="h-8 w-8 rounded-full flex items-center justify-center 
                 text-sm font-bold bg-gray-600 text-gray-100 border-2 border-gray-500 
                 overflow-hidden cursor-pointer shadow-md"
    >
      {!imageFailed ? (
        <img
          src="/avatar.png"
          alt="User Avatar"
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)} // Set state on load failure
        />
      ) : (
        // Fallback initials 
        <span>{userInitials}</span>
      )}
    </div>
  );

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
          className="h-8 block" 
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
        
        {/* 2. Profile Avatar Dropdown Menu */}
        <DropdownMenu>
            {/* Trigger is the Avatar component */}
            <DropdownMenuTrigger asChild>
                <div className="rounded-full ring-2 ring-transparent transition-all duration-150 ease-in-out hover:ring-blue-500"> 
                    <Avatar />
                </div>
            </DropdownMenuTrigger>
            
            {/* Dropdown Content */}
            <DropdownMenuContent align="end" className="w-56 bg-gray-700 text-white border-gray-600">
                <DropdownMenuItem className="opacity-70 font-semibold cursor-default hover:bg-gray-700">
                    <span className="truncate">user.name@company.com</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-600" />
                <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/notifications">Notifications</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-600" />
                <DropdownMenuItem className="text-red-400 hover:text-red-300">
                    <button className="w-full text-left">Logout</button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        
      </div>
      
    </header>
  );
}