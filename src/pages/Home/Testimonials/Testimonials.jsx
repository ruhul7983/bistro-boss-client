import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

import '@smastrom/react-rating/style.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch("https://bistro-boss-server-nine-rho.vercel.app/reviews")
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [])
    return (
        <section>
            <SectionTitle heading={"what our client says"} subHeading={"testimonial"}></SectionTitle>

            <h1></h1>


            {/* Swiper */}
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="flex flex-col items-center my-5">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="text-center px-3">{review.details}</p>

                            <h1 className="text-amber-300 text-xl font-bold text-center">{review.name}</h1>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;