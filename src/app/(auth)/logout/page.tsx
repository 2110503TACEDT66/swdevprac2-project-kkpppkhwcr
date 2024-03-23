"use client"
import useSession from "@/hooks/useSession";
import { Button } from "@mui/material";

export default function(){
    const {session,deleteSession} = useSession();
    async function onClickLogout(){
        const res = await fetch("/api/auth/logout",{
            method:"GET"
        })
        deleteSession();
        console.log(session)
    }
    return (
        <main>
            <div className="flex w-full h-full align-center justify-center">
                <Button onClick={onClickLogout}>Sign Out</Button>
            </div>
        </main>
    )
}