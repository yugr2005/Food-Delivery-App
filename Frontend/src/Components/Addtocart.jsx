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

    const removefromcart = (item) => {
        setCart((prevCart) => {
            const exist = prevCart.find((cartItem) => cartItem._id === item._id);
    
            if (exist && exist.quantity === 1) {
                // If the item has only one left, remove it from the cart
                return prevCart.filter(cartItem => cartItem._id !== item._id);
            } else {
                // Otherwise, decrease its quantity
                return prevCart.map(cartItem => cartItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
                );
            }
        });
      };

    const removeItem = (item) => {
        setCart((prevCart) => {
            return prevCart.filter((cartItem) => cartItem._id !== item._id);
        })
        
    }

    return (
        <CartContext.Provider value={{ addToCart, cart, clearCart, removefromcart, removeItem }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    return useContext(CartContext); // Make sure to return the context
};
