import { URL } from "url";
import RestuarantCard from "./RestaurantCard";
import { RestaurantsResponse } from "../../interface";
import Carousel from "react-material-ui-carousel";
import ClientRestaurantWithTag from "./ClientRestaurantWithTag";

export default async function({
    tag
}:{
    tag:string
}){
    // const backendURL = new URL(`/api/v1/restaurants/?tags[in]=${tag}`,process.env.NEXT_PUBLIC_BACKEND_URL)
    const backendURL = new URL(`/api/v1/restaurants/`,process.env.NEXT_PUBLIC_BACKEND_URL)
    const restaurants: RestaurantsResponse = await fetch(backendURL.href)
    .then(
        (response)=>response.json()
    );
    console.log(restaurants)
    return (
        <div>
            <ClientRestaurantWithTag tag={tag} restaurants={restaurants}></ClientRestaurantWithTag>
        </div>
    )
}