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

    const { addToCart, cart, removefromcart } = useCart(); // Destructure addToCart and cart

    const fooditems = async () => {
        await axios.get(`https://backend-g24oxukfs-yug-patels-projects-fdb0c28e.vercel.app/user/getMenu/restaurant/${params.id}`, {
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
    };

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
            <div className="flex justify-between items-center h-20 px-8 bg-gradient-to-r from-red-500 to-orange-400 shadow-lg text-white">
                <h1 className="text-3xl font-bold">{name} Menu</h1>
    
                <div className="relative">
                    <FiShoppingCart
                        className="text-3xl cursor-pointer transition-transform transform hover:scale-125 duration-200"
                        onClick={() => navigate(`/cart/${name}/${params.id}`)} // Navigate to cart when clicked
                    />
                    {/* Badge showing total quantity of items in the cart */}
                    {getTotalQuantity() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-slate-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            {getTotalQuantity()}
                        </span>
                    )}
                </div>
            </div>
    
            {/* Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {menu.map((menuItem, index) => (
                    <MenuCard 
                        key={index} 
                        data={menuItem} 
                        Addtocart={addToCart} 
                        removefromcart={removefromcart} 
                        setShow={setShow} // Include setShow if needed for notifications
                    />
                ))}
            </div>
        </div>
    );
}
