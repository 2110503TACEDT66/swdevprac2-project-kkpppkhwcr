"use client"
import Image from "next/image"
import Link from "next/link"
import { Restaurant } from "../../interface"
import { useEffect, useState } from "react"
// import {Skeleton} from "@nextui-org/react";
// import {Skeleton} from "@nextui-org/skeleton";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function({
    restaurant,
    className
}:{
    restaurant:Restaurant
    className?: string
}){
    const [imgSrc, setImgSrc] = useState(`/api/restaurants/${restaurant.id}/image`);
    const [imageLoaded,setImageLoaded] = useState(false);
    // useEffect(()=>{
        
    //     console.log("change to true")
    // })
    return (
        <div className={`${className} w-1/4 rounded-2xl p-2 border-solid border-2 border-grey text-black bg-white`}>
            <Link href={`/restaurants/${restaurant.id}`}>
                {
                    !imageLoaded &&
                    <div className="w-full">
                        <div className="w-full rounded-2xl overflow-hidden aspect-square">
                            <Skeleton className="w-full rounded-2xl aspect-square">
                            </Skeleton>
                        </div>
                        <Skeleton className="w-full h-5">
                        </Skeleton>
                        <Skeleton className="w-full h-5">
                        </Skeleton>
                    </div>
                }
                <Image
                    alt={restaurant.name}
                    src={imgSrc}
                    width={0}
                    height={0}
                    sizes={"100vw"}
                    className={`rounded-2xl aspect-square object-cover ${imageLoaded? 'w-full':'w-0 h-0'} `}
                    onError={() => {
                        setImgSrc(`/img/pure_logo.jpg`);
                    }}
                    onLoad={()=>{
                        setImageLoaded(true);
                    }}
                ></Image>
                <p className={`text-center ${imageLoaded? '':'hidden'}`}>{restaurant.name}</p>
                <p className={`bg-gray-300 rounded-2xl relative bottom-0 w-fit p-1 px-2 ${imageLoaded? '':'hidden'}`}>{restaurant.openingHours}-{restaurant.closingHours}</p>
            </Link>
        </div>
    )
}