import axios from "axios";
import { useCart } from "../Components/Addtocart";
import { CartCard } from "../Components/Cart";
import { useParams } from "react-router-dom";

export function CartPage(){

    const params = useParams();
    const {cart} = useCart();
    const {clearCart} = useCart();


    const getTotalPrice = () => {
        let price = 0;
        for(let i=0 ; i<cart.length; i++){
            price = price + cart[i].price * cart[i].quantity;
        }
        return price;
    }
    console.log(params);

    const handleOrder = async() => {

        const sendOrder = [];

    {cart.map((item) => (sendOrder.push({fooditem : item.nameitem,  quantity : item.quantity})))}

    console.log(sendOrder);

        const response = await axios.post(`http://localhost:3040/user/createorder/restaurant/${params.id}`, {

            restaurant : params.name,
            order : sendOrder,
            price : getTotalPrice(),
            status : "Pending"
        },{
            headers : {
                Authorization : `${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            console.log(res.data);
            
        })
        localStorage.setItem('cart', JSON.stringify([]));
        
    }

 
    return(
        <div>
            {cart.map((item, index) => (<CartCard key = {index} data = {item}/>))}
            <p>Total : {getTotalPrice()}</p>
            <button onClick={handleOrder}>Checkout</button>
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    )
}