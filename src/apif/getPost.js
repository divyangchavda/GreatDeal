export const getPost=async()=>{
    const response = await fetch('https://dummyjson.com/products?limit=194',{
    method:"GET"});
    return response.json();
};

    