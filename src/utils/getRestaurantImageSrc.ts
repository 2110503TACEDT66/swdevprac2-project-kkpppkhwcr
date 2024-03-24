enum Endpoint{
    backend,
    frontend
}
export default function(id: string, endpoint: Endpoint){
    if(endpoint==Endpoint.backend){
        return process.env.NEXT_PUBLIC_BACKEND_URL+`/api/v1/restaurants/${id}/image`;
    }
    return `/api/restaurants/${id}/image`
}