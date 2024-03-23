async function gg(){
    const res = await fetch("http://localhost:6969/api/v1/restaurants",{
        method:"GET"
    });
    console.log("res",res)
}
gg();