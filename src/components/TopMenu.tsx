"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function(){
    const {data:session}=useSession();
    console.log(session)
    return (
        <div className="h-[50px] w-full flex flex-row gap-2">
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
                    href="/api/auth/signout" 
                    className="h-full m-2 radius-2 hover:bg-[lightblue]"
                    prefetch={true}
                >
                    Sign out
                </Link>:<Link 
                    href="/api/auth/signin" 
                    className="h-full m-2 radius-2 hover:bg-[lightblue]"
                    prefetch={true}
                >
                    Sign in
                </Link>
            }
            {
                !session && <Link 
                    href="/api/auth/signup" 
                    className="h-full m-2"
                    prefetch={true}
                >
                    Create account
                </Link>
            }
        </div>
    )
}