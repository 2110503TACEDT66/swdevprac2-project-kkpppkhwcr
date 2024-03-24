"use client"
import Carousel from "react-material-ui-carousel"
import { Restaurant, RestaurantsResponse } from "../../interface"
import RestuarantCard from "./RestaurantCard"
import { useEffect, useRef, useState } from "react"
import RestaurantCardsGroup from "./RestaurantCardsGroup"

export default function({
    restaurantsResponse,
    tag
}:{
    restaurantsResponse: RestaurantsResponse,
    tag: string
}){
    const [carouselIndex, setCarouselIndex] = useState(0);
    let initialRestaurantsGroup: (Restaurant[]|undefined)[] = []
    const totalPage= Math.ceil(restaurantsResponse.pagination.total/3);

    for(let i=0;i<totalPage;i++){
        initialRestaurantsGroup.push(undefined)
    }
    initialRestaurantsGroup[0]=restaurantsResponse.data

    const [restaurantsGroup, setRestaurantsGroup] = useState(initialRestaurantsGroup)

    function indexToPage(index:number){
        return index+1
    }
    
    async function fetchRestaurants(currentIndex: number){
        if(restaurantsGroup[currentIndex+1]==undefined){
            let oldRestaurantsGroup = Array.from(restaurantsGroup);
            // let restaurantsResponse: RestaurantsResponse = await fetch(`/api/restaurants/?tag=${tag}&page=${index}`)
            let newRestaurantsResponse: RestaurantsResponse = await fetch(`/api/restaurants/?tag=${tag}&page=${indexToPage(currentIndex+1)}`)
            // let newRestaurantsResponse: RestaurantsResponse = await fetch(`/api/restaurants/?page=${indexToPage(currentIndex+1)}`)
            .then((res)=>res.json())
            oldRestaurantsGroup[currentIndex+1]=newRestaurantsResponse.data;
            // console.log(newRestaurantsResponse.data)
            setRestaurantsGroup(oldRestaurantsGroup)
        }
    }

    useEffect(()=>{
        fetchRestaurants(0)
        
    },[])

    return (
        <Carousel 
            className="w-full h-full" 
            autoPlay={false} 
            index={carouselIndex}
            onChange={(newIndex,prevIndex)=>{
                if (newIndex) setCarouselIndex(newIndex)
                fetchRestaurants(newIndex!)
            }}
            animation="slide"
            navButtonsAlwaysVisible={true}
            // swipe={false}
        >
                {/* <RestuarantCard 
                    className="w-1/4"
                    restaurant={restaurantsResponse.data[0]}
                ></RestuarantCard> */}
                {
                    Array.from(Array(totalPage).keys()).map((index)=>{
                        return (
                            // <RestuarantCard key={restaurant.id} restaurant={restaurant}></RestuarantCard>
                            <RestaurantCardsGroup 
                                key={index}
                                index={index}
                                restaurants={restaurantsGroup[index]}
                                tag={tag}
                                currentIndex={carouselIndex}
                            ></RestaurantCardsGroup>
                        )
                    })
                }
            </Carousel>
    )
}