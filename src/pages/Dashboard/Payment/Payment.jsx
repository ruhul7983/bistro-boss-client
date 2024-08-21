
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";

// TODO: 
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const Payment = () => {
    return (
        <div>
            <SectionTitle heading={"Payment"} subHeading={"Please pay to eat"}></SectionTitle>
            <div>
                 <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                 </Elements>
            </div>
        </div>
    );
};

export default Payment;