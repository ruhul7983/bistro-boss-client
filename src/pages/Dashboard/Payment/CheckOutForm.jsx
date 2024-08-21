import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckOutForm = () => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart,refetch] = useCart();
    const { user } = useAuth();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const navigate = useNavigate();
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Something 1");

        if (!stripe || !elements) {
            return;
        }
        console.log("Something 2");

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        console.log("Something 3");

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');

        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,

                }
            }
        }
        )
        if (confirmError) {
            console.log("Error payment");
        } else {
            console.log("Payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    data: new Date(),
                    cartId: cart.map(item => item._id),
                    menuId: cart.map(item => item.menuId),
                    transactionId: paymentIntent.id,
                    status: 'pending',
                }
                axiosSecure.post("/payments", payment)
                    .then(res => {
                        console.log(res.data);
                    })
                    refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your payment is successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/order/salad");
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>Total Price : {totalPrice}</p>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button disabled={!stripe || !clientSecret} className="btn btn-outline " type="submit" >
                Pay
            </button>
            <p className="text-red-500">{error}</p>
        </form>
    );
};

export default CheckOutForm;