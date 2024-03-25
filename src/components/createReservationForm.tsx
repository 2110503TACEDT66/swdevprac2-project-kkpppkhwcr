"use client"
import { TextField, Button, Autocomplete } from "@mui/material";
import { Formik, useFormik } from "formik";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Period, Restaurant } from "../../interface";

export default function({
    token
}:{
    token: string
}){
    const [restaurantsList,setRestaurantsList] = useState<string[]>([]);
    const [reservationPeriodsList,setReservationPeriodsList] = useState<string[]>([]);
    const formik = useFormik({
        initialValues:{
            restaurantName: "",
            reservationDate: null as (Dayjs|null),
            reservationPeriod: ""
        },
        async onSubmit(values,{setSubmitting, setErrors}){
            const result = await fetch("/api/v1/reservations",{
                method:"POST",
                headers:{
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formik.values)
            })
            if(!result.ok){
                setErrors({
                    restaurantName:"Wrong restaurant name or unavailable period"
                })
            }
            return;
        }
    })
    async function onRestaurantNameChange(_e:SyntheticEvent<Element, Event>, value: string|null){
        if(!value || value.trim()==""){
            return
        }
        value = value.trim();
        const restaurantsResponse = await fetch(`/api/restaurants?name[regex]=${value}&select=name`)
        .then((res)=>{
            return res.json()
        })
        const newRestaurantsList = restaurantsResponse.data.map((restaurant: Restaurant)=>{
            return restaurant.name
        })
        setRestaurantsList(newRestaurantsList)
    }
    async function onReservationPeriodChange(_e:SyntheticEvent<Element, Event>|null, value: string|null,restaurantName?:string|null){
        console.log(formik.values.restaurantName)
        const restaurantsResponse = await fetch(`/api/restaurants?name=${formik.values.restaurantName||restaurantName}&select=availableReservationPeriod`)
        .then((res)=>{
            return res.json()
        })
        const newReservationPeriodsList = restaurantsResponse.data[0].availableReservationPeriod.map((period: Period)=>{
            return period.startTime+"-"+period.endTime
        })
        setReservationPeriodsList(newReservationPeriodsList)
    }
    return (
        <div className="h-full flex items-center justify-center m-2">
            <form  onSubmit={formik.handleSubmit} className="flex flex-col gap-2 w-2/3 sm:w-1/2 bg-white rounded-2xl p-2">
                <Autocomplete
                    disablePortal
                    sx={{
                        width:"100%",
                        alignSelf:"center"
                    }}
                    options={restaurantsList}
                    filterOptions={(options, state) => options}
                    // sx={{ width: 300 }}
                    renderInput={(params) => <TextField 
                        {...params} 
                        label="Restaurant Name" 
                        InputProps={{
                            ...params.InputProps,
                            // type: 'search',
                        }}
                    />}
                    value={formik.values.restaurantName}
                    onInputChange={onRestaurantNameChange}
                    onChange={async (e,value)=>{
                        console.log("on change triggered")
                        formik.setFieldValue("restaurantName",value)
                        await onReservationPeriodChange(null,"",value);
                    }}
                    freeSolo
                    autoSelect
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="reservation date"
                        value={formik.values.reservationDate}
                        onChange={formik.handleChange}
                    ></DatePicker>
                </LocalizationProvider>
                <Autocomplete
                    disablePortal
                    sx={{
                        width:"100%",
                        alignSelf:"center"
                    }}
                    options={reservationPeriodsList}
                    filterOptions={(options, state) => options}
                    // sx={{ width: 300 }}
                    renderInput={(params) => <TextField 
                        {...params} 
                        label="Reservation Period" 
                        InputProps={{
                            ...params.InputProps,
                            // type: 'search',
                        }}
                    />}
                    value={formik.values.reservationPeriod}
                    onInputChange={onReservationPeriodChange}
                    onChange={(e,value)=>{
                        formik.setFieldValue("reservationPeriod",value)
                    }}
                    freeSolo
                    autoSelect
                />
                <Button 
                    type="submit"
                    disabled={formik.isSubmitting}
                >
                    reserve now!
                </Button>
            </form>
        </div>
    )
}