import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { LayersIcon, TokensIcon } from "@radix-ui/react-icons"
import Link from "next/link"
  
  export default function HomeNavbar() {
    return (
        <Menubar className="h-full flex flex-row justify-between border-0 rounded-none">
        
        <div></div>

        <div>
            <Link href="/" className="font-semibold">HOME</Link>
        </div>
        
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">Dropdown</MenubarTrigger>
          <MenubarContent>
            
            <MenubarItem><TokensIcon className="mr-2" /> <Link href="/authadmin/login">Admin Panel</Link></MenubarItem>
            <MenubarItem><LayersIcon className="mr-2" /> <Link href="/cart">Cart</Link></MenubarItem>
            
            <MenubarSeparator />
            <MenubarItem inset className="text-xs font-semibold">About this home page</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

      </Menubar>
    )
  }
  