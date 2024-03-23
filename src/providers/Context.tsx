"use client"
import { createContext } from "react";
import { Session, User } from "../../interface";
export const context = createContext<Session|undefined>(undefined);
export default async function({
    session,
    children
}:{
    session: Session|undefined,
    children: React.ReactNode
}){
    
    return (
        <context.Provider value={session}>
            {children}
        </context.Provider>
    )
}