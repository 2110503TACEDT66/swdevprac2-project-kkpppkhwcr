import useSession from "@/hooks/useSession";
import { useEffect, useState } from "react";
import { Reservation, ReservationsResponse, RestaurantResponse } from "../../../interface";
import Image from "next/image"
import { notFound } from "next/navigation";
import useServerSession from "@/hooks/useServerSession";
import getReservations from "@/utils/getReservations";
import getRestaurant from "@/utils/getRestaurant";
import getRestaurantImageSrc from "@/utils/getRestaurantImageSrc";
import { Typography } from "@mui/material";
import RestaurantImage from "@/components/RestaurantImage";
import Link from "next/link";
import getRestaurantUrl from "@/utils/getRestaurantUrl";

export default async function(){
    const session = await useServerSession();
    const reservationsResponse: ReservationsResponse = await getReservations(session?.token)
    .then((res: Response|null)=>{
        if(res==null||!res.ok){
            notFound();
        }
        return res.json()
    });
    const reservations = reservationsResponse.data;
    for(let reservation of reservations){
        const restaurantResponse: RestaurantResponse = await getRestaurant(reservation.restaurantId)
        .then((res)=>{
            return res.json()
        })
        const restaurant = restaurantResponse.data
        reservation.restaurant=restaurant
    }

    return (
        <div className="flex items-center justify-center text-black m-2">
            <div className="flex items-center justify-center bg-white rounded-2xl gap-2">
                {
                reservations.map((reservation,index)=>{

                    return (
                        <div key={index} className="flex h-20 items-center justify-center gap-3 p-2">
                            <Link 
                                href={getRestaurantUrl(reservation.restaurantId)}
                                className="h-full aspect-square"
                            >
                                <RestaurantImage
                                    alt={reservation.restaurant?.name||""}
                                    src={getRestaurantImageSrc(reservation.restaurantId)}
                                    width={10}
                                    height={10}
                                    sizes="25vw"
                                    // layout={'fill'}
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </Link>
                            <div className="">
                                <Typography>Restaurant: {reservation.restaurant?.name}</Typography>
                                <Typography>Reservation Date: {new Date(reservation.reservationDate).toLocaleDateString("en-UK")}</Typography>
                                <Typography>Reservation Time: {reservation.reservationPeriod.startTime}-{reservation.reservationPeriod.endTime}</Typography>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}