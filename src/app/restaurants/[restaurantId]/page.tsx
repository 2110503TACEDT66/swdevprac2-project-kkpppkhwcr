"use server"

import { Restaurant, RestaurantResponse } from "@/../interface"
import { notFound } from "next/navigation"
import { List, ListItem, ListItemButton,ListItemText, Typography  } from "@mui/material"
import getRestaurant from "@/utils/getRestaurant"
import RestaurantImage from "@/components/RestaurantImage"

export default async function({
    params
}:{
    params:{
        restaurantId: string
    }
}){
    const restaurantResponse: RestaurantResponse = await getRestaurant(params.restaurantId)
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
            <div className="bg-white text-black flex flex-row border-solid border-gray-400 border-2 p-2 rounded-2xl">
                <div>
                    <RestaurantImage
                        alt={restaurant.name}
                        src={`/api/restaurants/${params.restaurantId}/image`}
                        width={400}
                        height={400}
                        sizes={"100vw"}
                        className={`rounded-2xl aspect-square object-cover`}
                    ></RestaurantImage>
                </div>
                <div className="self-center m-2 flex flex-col gap-2">
                    <Typography variant="h2">{restaurant.name}</Typography>

                    <Typography variant="h5">Address</Typography>
                    <Typography variant="h6" className="ml-3">{restaurant.address}</Typography>

                    <Typography variant="h5">Open Hours</Typography>
                    <Typography variant="h6" className="ml-3">{restaurant.openingHours}-{restaurant.closingHours}</Typography>

                    <Typography variant="h5">Menus</Typography>
                    <List>
                    
                    {
                        restaurant.menu.map((menu,index)=>{
                            return (
                                <ListItem key={index}>
                                    <ListItemText primary={menu}></ListItemText>
                                </ListItem>
                            )
                        })
                    }
                    </List>

                    <Typography variant="h5">Available Reservation Periods</Typography>
                    <List>
                    {
                        restaurant.availableReservationPeriod.map(({startTime,endTime},index)=>{
                            const periodString = `${startTime}-${endTime}`;
                            const searchParams = new URLSearchParams({
                                restaurantName:restaurant.name,
                                reservationPeriod: periodString
                            })
                            return (
                                <ListItemButton 
                                    key={index}
                                    component="a" 
                                    href={`/reservations/create?${searchParams.toString()}`}
                                >
                                    <ListItemText key={index} primary={periodString} />
                                </ListItemButton>
                            )
                        })
                    }
                    </List>
                </div>
            </div>
        </main>
    )
}