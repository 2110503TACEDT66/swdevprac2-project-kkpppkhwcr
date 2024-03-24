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
    menu: string,
    openningHours: string,
    closingHours: string,
    availableReservationPeriod:{
        startTime:string,
        endTime:string
    },
    tags: string[],
    id: string
}

export interface RestaurantsResponse{
    success:boolean,
    count:number,
    pagination:{
        limit:number,
        next:{
            page:number
        },
        prev:{
            page:number
        }
    },
    data: Restaurant[]
}