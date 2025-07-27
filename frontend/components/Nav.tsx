'use client';

import Link from "next/link";
import { useState ,useEffect} from "react";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
const links = [
  { href: "/auth/login", name: "Sign In" },
  { href: "/Allquiz", name: "Available Quizzes" },
  { href: "/process", name: "Create Quiz" },
];

interface UserInfo{
username: string;
email: string;
avatar: string | null;
}
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<UserInfo | null>(null)
  const [message,setMessage] = useState("")
   
  const router = useRouter()
const fetchUserInfo = async () => {
  try {
    const res = await fetch('api/getprofile', { credentials: "include" });
    if (res.ok) {
      const profile = await res.json();
      setData(profile);
    } else {
      setData(null); // explicitly clear it when unauthorized
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    setData(null);
  }
};

//useffect so whenever the route mount it will fetch the data immediately
  useEffect(()=>{
    fetchUserInfo();
  },[])
  const handleSignOut = async()=>{
    try {
       const response  = await fetch('api/logout/',{
      method:"POST",
      credentials:"include"
    })
      const data = await response.json();

      if(data.ok){
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="w-full bg-slate-800 h-16 flex items-center justify-between px-6 md:px-20 shadow-md relative">
      {/* Logo */}
      <p className="text-white font-bold text-3xl font-main">
        <Link href="/">Kwezz</Link>
      </p>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="text-white font-semibold text-lg font-main hover:text-slate-400 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

    <div className="w-10 h-10 flex items-center justify-center ">
  {data === null ? (
    // 1. While loading or unauthenticated — keep space but show nothing
    <div className="w-9 h-9 rounded-full" />
  ) : data.avatar && !data.avatar.includes("avatar/default") ? (
    // 2. User is logged in and has avatar
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src={data.avatar}
          alt="Avatar"
          className="rounded-full h-9 w-9 object-cover cursor-pointer"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-slate-800 text-white border border-slate-600 rounded-md shadow-lg w-48">
        <DropdownMenuLabel className="text-white font-semibold text-sm px-3 py-2">
          <div className="flex items-center space-x-2">
            <img
              src={data.avatar}
              alt="Avatar"
              className="rounded-full h-9 w-9 object-cover cursor-pointer"
            />
            <span>{data.username}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-600" />
        <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer px-3 py-2">
          <Link href="/profile" className="flex items-center space-x-2 w-full">
            <FaUser />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer px-3 py-2">
          <button
            onClick={handleSignOut}
            className="cursor-pointer flex items-center space-x-2 w-full text-left"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    // 3. Authenticated but no avatar (fallback icon + placeholder)
 
      
      <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <FaUser className="text-white" />   
      
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-slate-800 text-white border border-slate-600 rounded-md shadow-lg w-48">
        <DropdownMenuLabel className="flex  text-white font-semibold text-sm px-3 py-2">
          <FaUser className="text-white" />
          <div className="text-white px-3">{data.username}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-600" />
        <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer px-3 py-2">
          <Link href="/profile" className="flex items-center space-x-2 w-full">
            <FaUser />   
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer px-3 py-2">
          <button
            onClick={handleSignOut}
            className="cursor-pointer flex items-center space-x-2 w-full text-left"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
     
  )}
</div>



        {/* Hamburger Button (Mobile Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-slate-800 flex flex-col items-center py-4 space-y-4 md:hidden shadow-lg z-50">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="text-white text-lg font-semibold hover:text-slate-400"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Nav;
