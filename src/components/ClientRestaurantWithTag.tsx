"use client"
import { Restaurant, RestaurantsResponse } from "../../interface"
import { useEffect, useState } from "react"
import RestaurantCardsGroup from "./RestaurantCardsGroup"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function({
    restaurantsResponse,
    tag
}:{
    restaurantsResponse: RestaurantsResponse,
    tag: string
}){
    const [carouselIndex, setCarouselIndex] = useState(0);
    let initialRestaurantsGroup: (Restaurant[]|undefined)[] = []
    const totalPage = Math.ceil(restaurantsResponse.pagination.total/3);

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
        <div className="w-[90%] self-center">
            <Slider 
                // className="w-full h-full" 
                // autoplay={true} 
                // draggable={true}
                // index={carouselIndex}
                beforeChange={(prevIndex:number,newIndex:number)=>{
                    if (newIndex) setCarouselIndex(newIndex)
                    fetchRestaurants(newIndex!)
                }}
                // accessibility={true}
                // arrows={true}
                slidesToShow= {1}
                slidesToScroll= {1}
                dots={true}
                infinite={false}
                speed= {500}
            >
                {
                    Array.from(Array(totalPage).keys()).map((index)=>{
                        return (
                            <RestaurantCardsGroup 
                                key={index}
                                index={index}
                                restaurants={restaurantsGroup[index]}
                                tag={tag}
                                currentIndex={carouselIndex}
                            ></RestaurantCardsGroup>
                            // <div key={index}>{index}</div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}