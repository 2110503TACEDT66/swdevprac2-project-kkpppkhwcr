import { headers } from "next/headers";

export async function GET(req:Request,{
    params
}:{
    params:{
        path:string[]
    }
}){
    const backendURL = new URL("api/v1/"+params.path.join("/"),process.env.NEXT_PUBLIC_BACKEND_URL)
    // console.log(req.headers.)
    const res = await fetch(backendURL.href,{
        headers:req.headers as any
    })
    return res;
}

export async function POST(req:Request,{
    params
}:{
    params:{
        path:string[]
    }
}){
    const backendURL = new URL("api/v1/"+params.path.join("/"),process.env.NEXT_PUBLIC_BACKEND_URL)
    const requestBodyText = await req.text() ;
    const res = await fetch(backendURL.href,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: requestBodyText
    })
    return res;
}