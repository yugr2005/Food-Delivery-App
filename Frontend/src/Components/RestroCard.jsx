import { useNavigate } from "react-router-dom"

export function RestroCard({data}){

    const navigate = useNavigate();
    const url =  encodeURIComponent(data._id);

    return(
        <div>
            <h1>{data.username}</h1>
            <p>{data.address}</p>

            <button onClick={() => {navigate(`${url}`)}} >Order here</button>
        </div>
    )
}