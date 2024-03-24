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
    restaurants?: Restaurant[],
    tag: string,
    currentIndex: number
}){
    const [restaurantsState,setRestaurantsState] = useState(restaurants);
    async function fetchRestaurants(){
        if(restaurants==undefined && Math.abs(currentIndex-index)<=1){
            // let restaurantsResponse: RestaurantsResponse = await fetch(`/api/restaurants/?tag=${tag}&page=${index}`)
            let restaurantsResponse: RestaurantsResponse = await fetch(`/api/restaurants/?page=${index+1}`)
            .then((res)=>res.json())
            setRestaurantsState(restaurantsResponse.data)
        }
    }
    useEffect(()=>{
        fetchRestaurants();
    },[currentIndex])
    
    return (
        <div className="flex justify-evenly align-center gap-3">
            {
                restaurantsState?.map((restaurant)=>{
                    return (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant}></RestaurantCard>
                    )
                })
            }
        </div>
    )
}