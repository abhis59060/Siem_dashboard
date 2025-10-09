import { Menu, Bell } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import Breadcrumb from "../ui/Breadcrumb"; // ⬅️ NEW: Import Breadcrumb component

const userInitials = "AA";

export default function TopBar({ toggleSidebar }) {
  const [search, setSearch] = useState("");
  const [imageFailed, setImageFailed] = useState(false);

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
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span>{userInitials}</span>
      )}
    </div>
  );

  return (
    <header className="bg-gray-800 p-4 flex flex-col w-full space-y-4">
      {/* Container for Hamburger Menu, Logo, and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
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

          <img src="/logo.png" alt="SIEM Logo" className="h-8 block" />
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-700 p-2 rounded w-1/3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-300 hover:text-white hover:bg-gray-700 
                       transition-colors duration-300 ease-in-out 
                       transform hover:rotate-6 hover:scale-105"
          >
            <Bell
              size={20}
              className="group-hover:animate-bounce hover:rotate-6 transition-transform"
            />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="rounded-full ring-2 ring-transparent transition-all duration-150 ease-in-out hover:ring-blue-500">
                <Avatar />
              </div>
            </DropdownMenuTrigger>
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
      </div>

      {/* Breadcrumb Navigation */}
      <Breadcrumb />
    </header>
  );
}