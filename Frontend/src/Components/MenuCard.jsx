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
        <div className="h-auto w-80 bg-white shadow-md rounded-lg p-3 hover:shadow-xl flex flex-col hover:rounded-xl transition-all duration-300 ease-in-out cursor-pointer ml-5 mt-3">
            <img src={data.image} alt="restro" className="h-48 w-90 rounded-lg" />

            <div className="flex justify-between items-center">
                <h1 className="mt-4 text-lg font-semibold text-gray-800">{data.nameitem}</h1>

                <div className="flex items-center">
                    {count > 0 && (
                        <>
                            <IoRemoveCircleOutline 
                                className="mt-3 size-6 cursor-pointer" 
                                onClick={handleRemoveFromCart} 
                            />
                            <h1 className="mt-2 mx-2">{count}</h1> {/* Only shown if count > 0 */}
                        </>
                    )}
                    <IoAddCircleOutline 
                        className="mt-3 size-6 cursor-pointer" 
                        onClick={handleAddToCart} 
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <p className="mt-2 text-sm text-gray-500">{data.description}</p>
                <p className="text-sm text-gray-500 mt-2 size-6 mr-1">${data.price}</p>
            </div>
        </div>
    );
}
