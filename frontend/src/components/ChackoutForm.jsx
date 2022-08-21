import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { addOrder, deleteOrder } from "../services/OrderServices";
import { useUserContext } from "../contexts/UserContext";
import { useCartContext } from '../contexts/CartContext';

const ChackoutForm = ({ address }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cookies, setCookie, removeCookie] = useCookies(['cart']);

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [allProductData, setAllProductData] = useState([]);
    const [orderId, setOrderId] = useState("");
    const { currentUser } = useUserContext();
    const { cart, setCart } = useCartContext();

    useEffect(() => {

        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe, cart]);

    useEffect(() => {

        setAllProductData(cart);

        var productArray = []
        cart.forEach((product) => {
            productArray.push(product.id);
        });
        setProducts(productArray);

    }, [cart, cookies]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        addOrder(products, currentUser, address)
            .then((result) => {
                setOrderId(result.newOrder._id);
            });

        setCart([]);

        removeCookie('cart', { path: '/' });

        const baseUrl = window.location.origin;
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${baseUrl}/orders`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
            setCart(allProductData);
            setCookie('cart', allProductData, { path: '/' });
            deleteOrder(orderId);
        } else {
            setMessage("An unexpected error occurred.");
            setCart(allProductData);
            setCookie('cart', allProductData, { path: '/' });
            deleteOrder(orderId);
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>

            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}

export default ChackoutForm;