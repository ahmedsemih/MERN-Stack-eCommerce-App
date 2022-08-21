import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Box } from '@chakra-ui/react';
import '../payment.css';

import CheckoutForm from "../components/ChackoutForm";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const Payment = () => {

    const [clientSecret, setClientSecret] = useState("");
    const { state } = useLocation();

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: state.price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [state]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Box className="payment" display='flex' justifyContent='center' p={{ base: 0, md: 5 }} >
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm address={state.address} />
                </Elements>
            )}
        </Box>
    )
}

export default Payment;