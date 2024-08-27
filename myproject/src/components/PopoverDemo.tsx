'use client';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import React from 'react'
import { useRouter } from "next/navigation";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { signOut, useSession } from "next-auth/react";   
 
type PopoverProps={
    element:React.ReactNode
}
export const PopoverDemo: React.FC<PopoverProps> = ({ element }) => {
    const router=useRouter();
    const { data: session } = useSession();
    console.log(session?.user.role)
    const handleNavigate = (path: string) => () => {
        router.push(path);
    };
    return (
        <div>
            <Popover>
                <PopoverTrigger>{element}</PopoverTrigger>
                <PopoverContent className="max-w-[200px] flex flex-col gap-2 justify-center  relative top-7">
                    {
                    session?.user.role==="admin" ?(
                    <div className="flex flex-col gap-2">
                    <Button onClick={handleNavigate('/admin/dashboard')} className="w-full">Dashboard</Button>                
                    <Button onClick={handleNavigate('/admin/manage-admins')} className="w-full">Manage Admin</Button>                

                    </div>
                    ):('')
                    }
                    <Button className="hover:bg-red-600 rounded-sm p-2 text-white transition duration-200 delay-75 ease-in" onClick={()=>signOut({callbackUrl:'/login'})}>Logout</Button>

                </PopoverContent>
            </Popover>

        </div>
    )
}

