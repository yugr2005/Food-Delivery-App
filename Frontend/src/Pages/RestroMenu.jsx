import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { MenuCard } from "../Components/MenuCard";
import { useCart } from "../Components/Addtocart";


export function RestroMenu() {

    const navigate = useNavigate();

    const params = useParams();
    const[menu, setMenu] = useState([]);
    const[name, setName] = useState("");
    const[show, setShow] = useState(false);

    const {addToCart} = useCart();
    const {cart} = useCart();
    const {clearCart} = useCart();

    const fooditems = async () => {
        await axios.get(`http://localhost:4444/user/getMenu/restaurant/${params.id}`, {
            headers : {
                Authorization : `${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            console.log(res.data.restaurants);
            setMenu(res.data.restaurants);
            setName(res.data.restaurants[0].restroname)
            
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fooditems();

    } , [])

    const getTotalPrice = () => {
        let price = 0;
        for(let i=0 ; i<cart.length; i++){
            price = price + cart[i].price * cart[i].quantity;
        }
        return price;
    }

    return(
        <div>
            <h1>{params.id} Menu</h1>
            {menu.map((menu, index) => (<MenuCard key={index} data={menu} Addtocart={addToCart} setShow={setShow}/>))}
        

            <button onClick={() => {navigate(`/cart/${name}/${params.id}`)}} >Place Order</button>

            {show ? <div>Item added to cart</div> : null}
    
        </div>

        
    )
}