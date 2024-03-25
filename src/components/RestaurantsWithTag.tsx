import { RestaurantsResponse } from "../../interface";
import ClientRestaurantWithTag from "./ClientRestaurantWithTag";
import { Typography } from "@mui/material";

export default async function({
    tag
}:{
    tag:string
}){
    function makeFirstCharUppercase(str: string){
        return str.charAt(0).toUpperCase()+str.slice(1)
    }
    // const backendURL = new URL(`/api/v1/restaurants/`,process.env.NEXT_PUBLIC_BACKEND_URL)
    // console.log(backendURL.href)
    // const restaurants: RestaurantsResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+`/api/v1/restaurants/`,{
    const restaurants: RestaurantsResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+`/api/v1/restaurants/?tags[in]=${tag}`,{
        cache:"no-cache"
    })
    .then(
        (response)=>response.json()
    );
    // console.log(restaurants)
    return (
        <div>
            <Typography variant="h3" className="m-2">{makeFirstCharUppercase(tag)} Restaurant</Typography>
            <ClientRestaurantWithTag tag={tag} restaurantsResponse={restaurants}></ClientRestaurantWithTag>
        </div>
    )
}