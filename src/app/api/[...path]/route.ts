import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest,{
    params
}:{
    params:{
        path:string[]
    }
}){
    const searchParams = req.nextUrl.searchParams.toString()
    // const query = searchParams.get('query')
    const backendURL = new URL("api/v1/"+params.path.join("/")+"?"+searchParams,process.env.NEXT_PUBLIC_BACKEND_URL)
    // console.log(backendURL)
    const res = await fetch(backendURL.href,{
        headers:req.headers as any
    })
    return res;
}

export async function POST(req:NextRequest,{
    params
}:{
    params:{
        path:string[]
    }
}){
    const searchParams = req.nextUrl.searchParams.toString()
    const backendURL = new URL("api/v1/"+params.path.join("/")+"?"+searchParams,process.env.NEXT_PUBLIC_BACKEND_URL)
    const requestBodyText = await req.text() ;
    const res = await fetch(backendURL.href,{
        method:"POST",
        headers:req.headers as any,
        body: requestBodyText
    })
    return res;
}


export async function PUT(req:NextRequest,{
    params
}:{
    params:{
        path:string[]
    }
}){
    const searchParams = req.nextUrl.searchParams.toString()
    const backendURL = new URL("api/v1/"+params.path.join("/")+"?"+searchParams,process.env.NEXT_PUBLIC_BACKEND_URL)
    const requestBodyText = await req.text() ;
    const res = await fetch(backendURL.href,{
        method:"PUT",
        headers:req.headers as any,
        body: requestBodyText
    })
    return res;
}