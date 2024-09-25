import { useState } from "react"
import { Inputbox } from "../Components/Inputbox";
import axios from "axios";

export function AddMenu(){

    const[nameitem, setNameitem] = useState("");
    const[price, setPrice] = useState("");
    const[description, setDescription] = useState("");

    async function handleAddItem() {
        const response = await axios.post('http://localhost:4444/user/additem', {
            
            nameitem : nameitem,
            price : price,
            description : description,
        },
        {
        headers : {
            Authorization : `${localStorage.getItem('token')}`
        }
        })
        .then((res) => {
            console.log(res.data);
            alert(res.data.msg);
        })
    }

    return(
        <div>
            <Inputbox className="" type="text" placeholder="Name of Item" value={nameitem} onChange={(e) => {
                setNameitem(e.target.value)
            }}/> 
            <Inputbox className="" type="number" placeholder="Price of Item" value={price} onChange={(e) => {
                setPrice(Number(e.target.value))
            }}/> 
            <Inputbox className="" type="text" placeholder="Description of Item" value={description} onChange={(e) => {
                setDescription(e.target.value)
            }}/> 

            <button onClick={handleAddItem}>Add item</button>
        </div>
    )
}