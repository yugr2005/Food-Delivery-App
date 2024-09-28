import { useNavigate } from "react-router-dom"

export function RestroCard({data}){

    const navigate = useNavigate();
    const url =  encodeURIComponent(data._id);

    return(
        <>
        <div onClick={() => {navigate(`${url}`)}} className="h-auto w-80 bg-white shadow-md rounded-lg p-3 hover:shadow-xl flex flex-col hover:rounded-xl transition-all duration-300 ease-in-out cursor-pointer ml-5 mt-3">

            
            <img src={data.image} alt="restro" className="h-48 w-90 rounded-lg"/>
            <h1 className="mt-4 text-lg font-semibold text-gray-800">{data.username}</h1>

            <div className="flex justify-between items-center">
            <p className="mt-2 text-sm text-gray-500">{data.category}</p>
            <p className="text-sm mt-2 text-gray-500">{data.address}</p>
            </div>

        </div>
            
        </>
    )
}