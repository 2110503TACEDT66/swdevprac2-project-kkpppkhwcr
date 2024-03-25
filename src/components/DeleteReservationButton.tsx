"use client"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import deleteReservation from "@/utils/deleteReservation";
import { useRouter } from "next/navigation";

export default function({
    token,
    reservationId
}:{
    token: string,
    reservationId: string
}){
    const [isAlerting,setIsAlerting] = useState<boolean>(false);
    const router = useRouter();
    async function onDeleteButtonClick(){
        setIsAlerting(false)
        const response = await deleteReservation(token,reservationId)
        router.refresh();
    }
    return (
        <>
            <Dialog
                open={isAlerting}
                onClose={()=>setIsAlerting(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete Reservation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this reservation?
                        This cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={onDeleteButtonClick}>Delete</Button>
                <Button onClick={()=>setIsAlerting(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <button onClick={()=>setIsAlerting(true)}>
                <DeleteIcon></DeleteIcon>
            </button>
        </>
    )
}