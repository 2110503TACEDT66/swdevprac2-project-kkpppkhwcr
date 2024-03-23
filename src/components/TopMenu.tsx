"use client"
import Image from "next/image";
import Link from "next/link";
import { Button, Menu, MenuItem } from '@mui/material';
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes"
import useSession from "@/hooks/useSession";

export default function(){
    const session = useSession();
    console.log(session)
    // const {data:session}=useSession();
    const [anchorEl,setAnchorEl] = useState<HTMLButtonElement|null>(null);
    const {theme, setTheme} = useTheme();
    // console.log(session)
    function handleClick(e:React.MouseEvent<HTMLButtonElement>){
        setAnchorEl(e.currentTarget);
    }
    function handleClose(){
        setAnchorEl(null);
    }
    function themeOnClick(theme:string):MouseEventHandler<HTMLLIElement>{
        return function(e: React.MouseEvent<HTMLLIElement>){
            setTheme(theme);
            handleClose()
            console.log(theme)
        }
    }
    return (
        <div className="h-[50px] w-full flex flex-row gap-2 items-center">
            <Link href="/" className="h-full mr-auto">
                <div className="h-full">
                    <Image
                        alt="Bing Resy"
                        src="/img/logo.png"
                        width={0}
                        height={0}
                        className="object-contain h-full w-auto"
                        sizes="100vw"
                    />
                </div>
            </Link>
            {
                session?
                <Link 
                    // href="/api/auth/signout" 
                    href="/signout"
                    className="h-full m-2 radius-2 hover:bg-[lightblue]"
                    prefetch={true}
                >
                    <Button className="h-full w-full text-inherit">Sign out</Button>
                </Link>:<Link 
                    // href="/api/auth/signin" 
                    href="/login"
                    className="h-full m-2 radius-2 hover:bg-[lightblue]"
                    prefetch={true}
                >
                    <Button className="h-full w-full text-inherit">Sign in</Button>
                </Link>
            }
            {
                !session && <Link 
                    // href="/api/auth/signup" 
                    href="/register"
                    className="h-full m-2"
                    prefetch={true}
                >
                    <Button className="h-full w-full text-inherit">Create account</Button>
                </Link>
            }
            <Button
                // aria-haspopup={true}
                className="h-full text-inherit"
                onClick={handleClick}
            >
                Themes
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={themeOnClick("light")}>Light</MenuItem>
                <MenuItem onClick={themeOnClick("dark")}>Dark</MenuItem>
            </Menu>
        </div>
    )
    // return (
    //     <div>
    //         gg
    //     </div>
    // )
}