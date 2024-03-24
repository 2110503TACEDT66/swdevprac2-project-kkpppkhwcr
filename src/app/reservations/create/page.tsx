import CreateReservationForm from "@/components/createReservationForm";
import useServerSession from "@/hooks/useServerSession";
import { TextField, Button } from "@mui/material";
import { Formik } from "formik";
import { notFound, redirect } from "next/navigation";

export default async function(){
    const session = await useServerSession();
    if(session==undefined){
        // redirect("/login")
    }
    return (
      <main>
        <CreateReservationForm token={session!.token}></CreateReservationForm>
      </main>
    )
}