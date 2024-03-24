"use client"
import Carousel from "react-material-ui-carousel"
import { RestaurantsResponse } from "../../interface"
import RestuarantCard from "./RestaurantCard"
import { useEffect, useRef, useState } from "react"
import RestaurantCardsGroup from "./RestaurantCardsGroup"

export default function({
    restaurants,
    tag
}:{
    restaurants: RestaurantsResponse,
    tag: string
}){
    const [carouselIndex, setCarouselIndex] = useState(0);
    useEffect(()=>{
        console.log(carouselIndex)
    },[carouselIndex])
    return (
        <Carousel 
            className="w-full" 
            autoPlay={false} 
            index={carouselIndex}
            onChange={(newIndex,prevIndex)=>{
                if (newIndex) setCarouselIndex(newIndex)
            }}
        >
                {/* <RestuarantCard 
                    className="w-1/4"
                    restaurantId="65e2f0e726b5d784a4f23e7e"
                    restaurantName="เจ๊ไก่"
                ></RestuarantCard> */}
                {
                    Array.from(Array(restaurants.count/3).keys()).map((index)=>{
                        console.log("index",index)
                        return (
                            // <RestuarantCard key={restaurant.id} restaurant={restaurant}></RestuarantCard>
                            <RestaurantCardsGroup 
                                key={index} 
                                index={index} 
                                restaurants={index==0?restaurants.data:undefined}
                                tag={tag}
                            ></RestaurantCardsGroup>
                        )
                    })
                }
            </Carousel>
    )
}