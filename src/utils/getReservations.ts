"use server"
import { Reservation, ReservationsResponse } from "../../interface"
import relativeToAbsolute from "./relativeToAbsolute"

export default async function getReservations(token?: string): Promise<Response|null>{
    if(token==undefined){
        return null
    }
    return await fetch(relativeToAbsolute("/api/v1/reservations"),{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}