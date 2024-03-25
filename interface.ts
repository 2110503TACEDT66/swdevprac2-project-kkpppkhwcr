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
    availableReservationPeriod:Period[],
    tags: string[],
    id: string
}

export interface Period{
    startTime:string,
    endTime:string
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

export interface Reservation{
    reservorId: string,
    restaurantId: string,
    reservationDate: string,
    reservationPeriod: {
        startTime: string,
        endTime: string
    },
    _id: string,
    restaurant?: Restaurant
}

export interface ReservationsResponse{
    success: boolean,
    data:Reservation[]
}