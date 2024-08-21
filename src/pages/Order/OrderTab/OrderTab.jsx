import FoodCard from "../../../components/SectionTitle/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const OrderTab = ({ menu }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    return (
        <div >

            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className={"grid grid-cols-1 md:grid-cols-3"}>
                    {
                        menu.map(item => <FoodCard key={item._id} items={item}></FoodCard>)
                    }
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default OrderTab;