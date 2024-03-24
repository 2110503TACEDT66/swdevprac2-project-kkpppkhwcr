"use server"

import { Restaurant, RestaurantResponse, RestaurantsResponse } from "@/../interface"
import { notFound } from "next/navigation"
import Image from "next/image"
import { useRouter } from "next/router"
import { ListItemButton,ListItemText, Typography  } from "@mui/material"

export default async function({
    params
}:{
    params:{
        restaurantId: string
    }
}){
    const restaurantResponse: RestaurantResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+"/api/v1/restaurants/"+params.restaurantId)
    .then((res)=>{
        if(!res.ok){
            notFound()
        }
        return res
    })
    .then((res)=>res.json())
    console.log(restaurantResponse)

    const restaurant: Restaurant = restaurantResponse.data;
    return (
        <main className="w-full h-full flex items-center justify-center">
            <div className="flex flex-row border-solid border-gray-400 border-2 p-2 rounded-2xl">
                <div>
                    <Image
                        alt={restaurant.name}
                        src={`/api/restaurants/${params.restaurantId}/image`}
                        width={400}
                        height={400}
                        sizes={"100vw"}
                        className={`rounded-2xl aspect-square object-cover`}
                        // onError={() => {
                        //     setImgSrc(`/img/pure_logo.jpg`);
                        // }}
                        // onLoad={()=>{
                        //     setImageLoaded(true);
                        // }}
                    ></Image>
                </div>
                <div className="self-center m-2 flex flex-col gap-2">
                    <Typography variant="h2">{restaurant.name}</Typography>
                    <Typography variant="h5">Address</Typography>
                    <Typography variant="h6" className="ml-3">{restaurant.address}</Typography>
                    <Typography variant="h5">Open Hours</Typography>
                    <Typography variant="h6" className="ml-3">{restaurant.openingHours}-{restaurant.closingHours}</Typography>
                    <Typography variant="h5">Available Reservation Periods</Typography>
                    <ListItemButton 
                        component="a" 
                        href=""
                    >
                    {
                        restaurant.availableReservationPeriod.map(({startTime,endTime})=>{
                            return (
                                <ListItemText primary={`${startTime}-${endTime}`} />
                            )
                        })
                    }
                    </ListItemButton>

                </div>
            </div>
        </main>
    )
}