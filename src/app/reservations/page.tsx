import DeleteReservationButton from "@/components/DeleteReservationButton";
import RestaurantImage from "@/components/RestaurantImage";
import useServerSession from "@/hooks/useServerSession";
import getReservations from "@/utils/getReservations";
import getRestaurant from "@/utils/getRestaurant";
import getRestaurantImageSrc from "@/utils/getRestaurantImageSrc";
import getRestaurantUrl from "@/utils/getRestaurantUrl";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Typography } from "@mui/material";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ReservationsResponse, RestaurantResponse } from "../../../interface";

export default async function(){
    const session = await useServerSession();
    if(session==undefined){
        redirect("/login")
    }
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
            <div className="flex items-center justify-center gap-2 flex-col">
                {
                reservations.map((reservation,index)=>{

                    return (
                        <div key={index} className="flex h-20 items-center justify-center gap-3 p-2 rounded-2xl bg-white">
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
                            <div className="flex flex-col h-full justify-between">
                                <Link href={`/reservations/edit/${reservation._id}`}>
                                    <ModeEditIcon></ModeEditIcon>
                                </Link>
                                <DeleteReservationButton
                                    token={session.token}
                                    reservationId={reservation._id}
                                />
                            </div>
                        </div>
                    )
                })
                }
                {
                reservations.length<3 && 
                <Link href="/reservations/create" className="bg-white hover:bg-[lightblue] text-black hover:text-black p-2 rounded-2xl">
                    reserve now! 
                </Link>
                }
            </div>
        </div>
    )
}