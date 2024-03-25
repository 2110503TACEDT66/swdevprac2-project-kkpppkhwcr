"use client"
import { Dayjs } from "dayjs"
import { useFormik } from "formik"
import { SyntheticEvent, useState } from "react";
import { Period, Restaurant, RestaurantsResponse } from "../../interface";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Autocomplete, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ({
    token,
    reservationId
}:{
    token:string,
    reservationId:string
}){
    
    const [restaurantsList,setRestaurantsList] = useState<string[]>([]);
    const [reservationPeriodsList,setReservationPeriodsList] = useState<string[]>([]);
    const [isAlerting,setIsAlerting] = useState<boolean>(false);
    const [alertMessages,setAlertMessage] = useState<{
        title:string|null,
        description: string|null
    }>({
        title:null,
        description:null
    });
    const formik = useFormik({
        initialValues:{
            restaurantName: "",
            reservationDate: null as (Dayjs|null),
            reservationPeriod: ""
        },
        async onSubmit(values,{setSubmitting, setErrors}){
            const {reservationPeriod,restaurantName,reservationDate} = formik.values
            const [startTime,endTime]=reservationPeriod.split("-")
            
            const restaurantResponse: RestaurantsResponse = await fetch(`/api/restaurants/?name=${restaurantName}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(res=>res.json())
            const restaurantId = restaurantResponse.data[0].id;
            let data = {
                restaurantId,
                reservationDate,
                reservationPeriod:{
                    startTime,
                    endTime
                }
            }
            // console.log(restaurantResponse,data)
            const result = await fetch(`/api/reservations/${reservationId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            const responseJson = await result.json();
            if(!result.ok||!responseJson.success){
                setAlertMessage({
                    title:"Error!",
                    description:responseJson.message||"Wrong restaurant name or unavailable period"
                })
                setIsAlerting(true);
                return
            }
            setAlertMessage({
                title:"Success!",
                description:"Successfully edit reservation"
            })
            setIsAlerting(true);
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
            <Dialog
                open={isAlerting}
                onClose={()=>setIsAlerting(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {alertMessages.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {alertMessages.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>setIsAlerting(false)}>Ok</Button>
                </DialogActions>
            </Dialog>
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
                        onChange={(value)=>{
                            formik.setFieldValue("reservationDate",value)
                        }}
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