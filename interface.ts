export interface RestaurantData{
    imgSrc: string,
    name: string
}
export interface User{
    username:string,
    email:string,
    role:string,
    joinedAt:string,
    phone:string[]
}

export interface Session{
    user: User,
    token: string
}

export interface Restaurant{
    name: string,
    address: string,
    menu: string[],
    openingHours: string,
    closingHours: string,
    availableReservationPeriod:[{
        startTime:string,
        endTime:string
    }],
    tags: string[],
    id: string
}

interface BaseRestaurantResponse{
    success:boolean,
    count:number,
    pagination:{
        limit:number,
        total:number,
        next:{
            page:number
        },
        prev:{
            page:number
        }
    },
}

export interface RestaurantsResponse extends BaseRestaurantResponse{
    data: Restaurant[]
}

export interface RestaurantResponse extends BaseRestaurantResponse{
    data: Restaurant
}