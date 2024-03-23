"use client"
// import { supabase } from "@/app/supabase/supabase";
import { Button, TextField } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { Formik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],"Password and confirm password aren't the same"
      )
      .required('Confirm password is required'),
  });

export default function(){
    return (
      <main>
        <div className="h-full flex items-center justify-center">
            <Formik
                initialValues={{
                    email:"",
                    password:"",
                    confirmPassword:""
                }}
                validationSchema={validationSchema}
                onSubmit={async (values,{setSubmitting, setErrors})=>{
                    const result = await fetch("/api/auth/login",{
                        method:"POST",
                        body: JSON.stringify(values)
                    })
                    console.log(await result.text())
                    if(!result.ok){
                        setErrors({
                            email:"Wrong username or password"
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
                        <form  onSubmit={handleSubmit} className="flex flex-col gap-2 w-2/3 sm:w-1/2">
                            <TextField 
                                name="email" 
                                placeholder="your email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                            <TextField 
                                name="password" 
                                placeholder="your password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                            />
                            <TextField 
                                name="confirmPassword" 
                                placeholder="confirm password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword}
                            />
                            <Button 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Sign Up
                            </Button>
                        </form>
                    )
                }
            </Formik>
        </div>
        </main>
    )
}