import { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoRemoveCircleOutline } from "react-icons/io5"; // Import minus icon

export function MenuCard({ data, Addtocart, removefromcart, setShow }) {
    const [count, setCount] = useState(0); // Initialize count

    // Effect to sync count with cart when component mounts
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const cartitem = cart ? cart.find((item) => item._id === data._id) : null;
        if (cartitem) {
            setCount(cartitem.quantity);
        }
    }, [data._id]); // Runs when data._id changes

    const handleAddToCart = () => {
        setCount(count + 1);
        Addtocart(data);
        setShow(true); // Show notification for item added
    };

    const handleRemoveFromCart = () => {
        if (count > 0) {
            setCount(count - 1);
            removefromcart(data); // Call remove from cart function
            setShow(true); // Show notification for item removed
        }
    };

    return (
        <div className="h-auto w-80 bg-white shadow-lg rounded-lg p-4 transition-shadow duration-500 ease-in-out flex flex-col hover:shadow-2xl duration-500 ease-in-out cursor-pointer ml-5 mt-3">
            <img src={data.image} alt="restro" className="h-48 w-full rounded-lg mb-2 object-cover" />

            <div className="flex justify-between items-center">
                <h1 className="mt-2 text-lg font-semibold text-gray-800">{data.nameitem}</h1>

                <div className="flex items-center">
                    {count > 0 && (
                        <>
                            <IoRemoveCircleOutline 
                                className="mt-3 text-xl cursor-pointer text-red-600" 
                                onClick={handleRemoveFromCart} 
                            />
                            <h1 className="mt-2 mx-2 font-bold">{count}</h1> {/* Only shown if count > 0 */}
                        </>
                    )}
                    <IoAddCircleOutline 
                        className="mt-3 text-xl cursor-pointer text-red-600" 
                        onClick={handleAddToCart} 
                    />
                </div>
            </div>

            <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">{data.description}</p>
                <p className="text-sm text-gray-500 font-bold">${data.price}</p>
            </div>
        </div>
    );
}
