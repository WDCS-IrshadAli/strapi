import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import {
    GearIcon,
    PersonIcon,
    RocketIcon,
    TokensIcon,
  } from "@radix-ui/react-icons"
import Link from "next/link"
import { userLogout } from "../lib/actions"
import { useSession } from "next-auth/react"
  
  export default function AdminNavbar() {
    const {data: session} = useSession();
    console.log("SESSION DATA = ", session);
    
    return (
      <>
      
        <Menubar className="h-full flex flex-row justify-between border-0 rounded-none">
        
        <div></div>

        <div>
            <Link href="/admin/dashboard" className="font-semibold">LOGO</Link>
        </div>
        
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">Hello {session?.user?.name}</MenubarTrigger>
          <MenubarContent>
            
            <MenubarItem><TokensIcon className="mr-2" /> <Link href="/admin/dashboard">Dashboard</Link></MenubarItem>
            <MenubarItem><GearIcon className="mr-2" /> <button onClick={() => userLogout()}>Logout</button></MenubarItem>
            
            <MenubarSeparator />
            <MenubarItem inset className="text-xs font-semibold">About this admin page</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

      </Menubar>
      </>
    )
  }
  