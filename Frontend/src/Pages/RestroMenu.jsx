import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MenuCard } from "../Components/MenuCard";
import { useCart } from "../Components/Addtocart";
import { FiShoppingCart } from "react-icons/fi";

export function RestroMenu() {

    const navigate = useNavigate();
    const params = useParams();

    const [menu, setMenu] = useState([]);
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);


    const { addToCart, cart, removefromcart } = useCart();  // Destructure addToCart and cart

    const fooditems = async () => {
        await axios.get(`http://localhost:4444/user/getMenu/restaurant/${params.id}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            console.log(res.data.restaurants);
            setMenu(res.data.restaurants);
            setName(res.data.restaurants[0].restroname);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fooditems();
    }, []);

    // Calculate the total quantity of items in the cart
    const getTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div>
            {/* Header Section with Restaurant Name and Cart */}
            <div className="flex justify-between items-center p-4 shadow-md bg-white">
                <h1 className="text-2xl font-bold">{name} Menu</h1>

                <div className="relative">
                    <FiShoppingCart
                        className="text-3xl cursor-pointer"
                        onClick={() => navigate(`/cart/${name}/${params.id}`)}  // Navigate to cart when clicked
                    />
                    {/* Badge showing total quantity of items in the cart */}
                    {getTotalQuantity() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            {getTotalQuantity()}
                        </span>
                    )}
                </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-4 gap-4 p-4">
                {menu.map((menu, index) => (
                    <MenuCard key={index} data={menu} Addtocart={addToCart} setShow={setShow} removefromcart={removefromcart}/>
                ))}
            </div>
        </div>
    );
}
