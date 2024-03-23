import { URL } from "url";
import RestuarantCard from "./RestuarantCard";
import { restaurantsResponse } from "../../interface";

export default async function({
    tag
}:{
    tag:string
}){
    const backendURL = new URL(`/api/v1/restaurants/?tags[in]=${tag}`,process.env.NEXT_PUBLIC_BACKEND_URL)
    const restaurants: restaurantsResponse = await fetch(backendURL.href)
    .then(
        (response)=>response.json()
    );
    console.log(restaurants)
    return (
        <div className="flex justify-evenly align-center gap-3">
            {/* <RestuarantCard 
                className="w-1/4"
                restaurantId="65e2f0e726b5d784a4f23e7e"
                restaurantName="เจ๊ไก่"
            ></RestuarantCard> */}
            {
                restaurants.data.map((restaurant)=>{
                    console.log(restaurant)
                    return (
                        <RestuarantCard key={restaurant.id} restaurant={restaurant}></RestuarantCard>
                    )
                })
            }
        </div>
    )
}