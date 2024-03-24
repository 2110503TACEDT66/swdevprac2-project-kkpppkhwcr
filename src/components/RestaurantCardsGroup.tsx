"use client"
import { useEffect, useState } from "react"
import { Restaurant, RestaurantsResponse } from "../../interface"
import RestaurantCard from "./RestaurantCard"

export default function({
    index,
    restaurants,
    tag,
    currentIndex
}:{
    index: number,
    restaurants?: Restaurant[]|undefined,
    tag: string,
    currentIndex: number
}){
    return (
        <div className="flex justify-evenly align-center gap-3">
            {
                restaurants?.map((restaurant)=>{
                    return (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant}></RestaurantCard>
                    )
                })
            }
        </div>
    )
}