"use client"
import { TextField, Button, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import { SyntheticEvent, useState } from "react";

export default function({
    token
}:{
    token: string
}){
    const [restaurantsList,setRestaurantsList] = useState<string[]>([]);
    async function onRestaurantNameChange(e:SyntheticEvent<Element, Event>, value: string|null){
        if(!value || value.trim()==""){
            return
        }
        value = value.trim();
        const restaurantsResponse = await fetch(`/api/restaurants?name[regex]=${value}&select=name`)
        .then((res)=>{
            return res.json()
        })
        const newRestaurantsList = restaurantsResponse.data.map((obj: any)=>{
            return obj.name
        })
        setRestaurantsList(newRestaurantsList)
        // console.log("triggered ",restaurantsList,e,value)
    }
    return (
        <div className="h-full flex items-center justify-center">
            <Formik
            initialValues={{
                restaurantName: "",
                reservationDate: "",
                reservationPeriod: {
                    startTime:"",
                    endTime:""
                }
            }}
            onSubmit={async (values,{setSubmitting, setErrors})=>{
                const result = await fetch("/api/v1/reservations",{
                    method:"POST",
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(values)
                })
                console.log(await result.text())
                if(!result.ok){
                    setErrors({
                        restaurantName:"Wrong restaurant name or unavailable period"
                    })
                }
                return;
            }}
            
            >
            {({
                values,
                errors,
                touched,    
                handleChange,    
                handleBlur,    
                handleSubmit,    
                isSubmitting,    
            }) => (
                    <form  onSubmit={handleSubmit} className="flex flex-col gap-2 w-2/3 sm:w-1/2 bg-white">
                        <Autocomplete
                            disablePortal
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
                            value={values.restaurantName}
                            onInputChange={onRestaurantNameChange}
                            onChange={handleChange}
                            freeSolo
                            autoSelect
                        />

                        <Button 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            reserve now!
                        </Button>
                    </form>
                )
                }
            </Formik>
        </div>
    )
}