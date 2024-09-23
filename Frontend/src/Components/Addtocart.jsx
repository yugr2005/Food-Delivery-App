import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {
        const savedCart =  localStorage.getItem('cart') ;
        return savedCart ?  JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart' , JSON.stringify(cart));
    }, [cart])

    const addToCart = (item) => {
        const exist = cart.find((cartItem) => cartItem._id === item._id);

        if (exist) {
            setCart(cart.map(cartItem =>
                cartItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]); // Fix item structure
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ addToCart, cart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    return useContext(CartContext); // Make sure to return the context
};
