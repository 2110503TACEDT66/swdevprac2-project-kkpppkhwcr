import Image from "next/image";
import Link from "next/link";

export default function(){
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
            <Link href="/api/auth/signin" className="h-full m-2 radius-2 hover:bg-[lightblue]">
                Sign in
            </Link>
            <Link href="/api/auth/signup" className="h-full m-2">
                Create account
            </Link>
        </div>
    )
}