import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  TokensIcon,
  LayersIcon,
  GearIcon,
  PersonIcon,
  CodeSandboxLogoIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { userLogout } from "../lib/actions";

const AdminSidebar = ({ data }: { data: any }) => {
  const menuLink = data?.data[0]?.attributes?.items?.data;
  return (
    <div className="flex">
      <Command className="border shadow-md rounded-none w-full">
        <CommandInput placeholder="Type a command or search..." />

        <CommandList className="pb-24">
          <CommandEmpty>No results found.</CommandEmpty>

          {/* LINKS  */}
          <CommandGroup heading="Links">

            <CommandItem className="flex justify-center sm:justify-start items-center p-0 sm:p-1 mb-1">
              <Link href="/admin/dashboard">
                <TokensIcon className="h-6 w-6 py-1 px-0" />
              </Link>
              <span className="truncate w-full">
                <Link href="/admin/dashboard" className="">Dashboard</Link>
              </span>
            </CommandItem>

          </CommandGroup>

          <CommandSeparator />

          {/* MODULES  */}
          <CommandGroup heading="Modules">
            {
              menuLink.map((curElem: any, index: any) => {
                return (
                  <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>

                      <CommandItem className="flex justify-center sm:justify-start items-center p-0 sm:p-1 mb-1">
                        <Link href={`/admin${curElem?.attributes?.url}`} target={curElem?.attributes?.target}>
                          <TokensIcon className="h-6 w-6 py-1 px-0" />
                        </Link>
                        <span className="truncate w-full">
                          <Link href={`/admin${curElem?.attributes?.url}`} target={curElem?.attributes?.target}>{curElem?.attributes?.title}</Link>
                        </span>
                      </CommandItem>

                    </DropdownMenuTrigger>

                    {
                      curElem?.attributes?.children?.data?.length <= 0
                      ?
                      ""
                      :
                      <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Submenu</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {
                        // curElem?.attributes?.items?.data?.length > 0 
                        // ? 
                        curElem?.attributes?.children?.data?.map((curElemx: any, indexx: any) => {
                          return (
                            <>
                              <DropdownMenuItem key={indexx}><Link href={`/admin${curElemx?.attributes?.url}`}>{curElemx?.attributes?.title}</Link></DropdownMenuItem>
                            </>
                          )
                        }) 
                        // :      
                        // <DropdownMenuItem className="text-wrap">No items added yet...</DropdownMenuItem>   
                      }
                      </DropdownMenuContent>
                    }
                    
                  </DropdownMenu>
                )
              })
            }
            


          </CommandGroup>


          <CommandSeparator />

          {/* SETTINGS  */}
          <CommandGroup heading="Settings">

            <CommandItem className="flex justify-center sm:justify-start items-center p-0 sm:p-1 mb-1">
              <button onClick={() => {userLogout()}}>
                <GearIcon className="h-6 w-6 py-1 px-0" />
              </button>
              <span className="truncate w-full">
              <button onClick={() => {userLogout()}}>Logout</button>
              </span>
            </CommandItem>

















          </CommandGroup>
          
        </CommandList>
      </Command>
    </div>
  );
};

export default AdminSidebar;
