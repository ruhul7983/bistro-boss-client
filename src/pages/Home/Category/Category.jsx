import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import slide5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section>
            <SectionTitle heading={"from 11am to 10pm"} subHeading={"order online"}></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><img src={slide1} alt="" /> <h1 className='text-4xl text-center text-white -mt-16 shadow-md'>Salads</h1></SwiperSlide>
                <SwiperSlide><img src={slide2} alt="" /> <h1 className='text-4xl text-center text-white -mt-16 shadow-md'>Soups</h1></SwiperSlide>
                <SwiperSlide><img src={slide3} alt="" /> <h1 className='text-4xl text-center text-white -mt-16 shadow-md'>Pizzas</h1></SwiperSlide>
                <SwiperSlide><img src={slide4} alt="" /> <h1 className='text-4xl text-center text-white -mt-16 shadow-md'>Salads</h1></SwiperSlide>
                <SwiperSlide><img src={slide5} alt="" /> <h1 className='text-4xl text-center text-white -mt-16 shadow-md'>Salads</h1></SwiperSlide>

            </Swiper>
        </section>
    );
};

export default Category;