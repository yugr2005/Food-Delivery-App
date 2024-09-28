import axios from "axios";
import { useCart } from "../Components/Addtocart";
import { CartCard } from "../Components/Cart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";

export function CartPage() {
  const params = useParams();
  const { cart, clearCart, removeItem } = useCart();  // Destructure both cart and clearCart


  // Calculate the total price of items in the cart
  const getTotalPrice = () => {
    let price = 0;
    for (let i = 0; i < cart.length; i++) {
      price = price + cart[i].price * cart[i].quantity;
    }
    return price.toFixed(2);
  };
  
  //Payment
  const stripe = useStripe();
const elements = useElements();
const[key, setKey] = useState("");



const clientKey = async () => {
    try {
        const price = Math.round(parseFloat(getTotalPrice()) * 100);  // Convert to cents

      const response = await axios.post(
        "http://localhost:4444/user/payment",
        {
          amount: price,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
    //   console.log(price);
      setKey(response.data.clientKey);
     
    //   console.log("Client Secret Key: ", response.data.clientKey);
    } catch (error) {
      console.error("Error fetching client key:", error);
    }
  };
  

useEffect(() => {
    clientKey()
},[cart])

const handleOrder = async () => {
    const sendOrder = cart.map((item) => ({
      fooditem: item.nameitem,
      quantity: item.quantity,
    }));
  
    if (!key) {
      alert("Invalid Payment");
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(key, {
        payment_method: {
          card: cardElement,
        },
      });
  
      if (error) {
        console.error("Payment failed:", error);
        alert("Payment failed. Please try again.");
        return;
      }
  
      if (paymentIntent.status === "succeeded") {
        const response = await axios.post(
          `http://localhost:4444/user/createorder/restaurant/${params.id}`,
          {
            restaurant: params.name,
            order: sendOrder,
            price: getTotalPrice(),
            status: "Pending",
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        // console.log(response.data);
        localStorage.setItem("cart", JSON.stringify([])); // Clear cart
        clearCart();
        alert("Order created successfully");
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };
  

  return (
    <div className="max-w-screen-lg mx-auto px-4">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 my-6 text-center">
        Cart Summary
      </h1>

      {/* Cart Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Items</h2>
          <div className="space-y-4">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <CartCard key={index} data={item} clearCart={clearCart} removeItem={removeItem}/>
              ))
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Subtotal</p>
              <p className="text-gray-800 font-semibold">${getTotalPrice()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Delivery Fee</p>
              <p className="text-gray-800 font-semibold">$1.49</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Taxes & Other Fees</p>
              <p className="text-gray-800 font-semibold">$20.82</p>
            </div>
            <hr className="my-4" />



            <div className="flex justify-between items-center text-lg font-bold">
              <p>Total</p>
              <p>
                ${(parseFloat(getTotalPrice()) + 1.49 + 20.82).toFixed(2)}
              </p>
              {/* <button onClick={removeItem}>Remove</button> */}
            </div>

            <CardElement />

            {/* Checkout Button */}
            <button
              onClick={handleOrder}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold transition-all hover:bg-gray-800"
            >
              <FaShoppingCart className="inline mr-2" /> Place Order
            </button>
          </div>
        </div>
      </div>

     
    </div>
  );
}
