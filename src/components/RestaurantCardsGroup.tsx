import restaurants from "@/mock/Restaurant"
import { Restaurant, RestaurantsResponse } from "../../interface"
import RestaurantCard from "./RestaurantCard"

export default async function({
    index,
    restaurants,
    tag
}:{
    index: number,
    restaurants?: Restaurant[],
    tag: string
}){
    if(restaurants==undefined){
        let restaurantsResponse: RestaurantsResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+`/api/v1/restaurants/?tag=${tag}&page=${index}`)
        .then((res)=>res.json())
        restaurants=restaurantsResponse.data
    }
    return (
        <div className="flex justify-evenly align-center gap-3">
            {
                restaurants.map((restaurant)=>{
                    return (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant}></RestaurantCard>
                    )
                })
            }
        </div>
    )
}