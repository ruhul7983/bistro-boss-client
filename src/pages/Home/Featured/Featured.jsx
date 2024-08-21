import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item text-white pt-2 ">
            <SectionTitle heading={"check it out"} subHeading={"feature item"}></SectionTitle>
            <div className="md:flex justify-center items-center md:py-20 md:px-36 gap-x-3">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div>
                    <p>March 20, 2023</p>
                    <p className="uppercase">WHERE CAN I GET SOME?</p>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                    </p>
                    <button className="btn btn-outline border-0 border-b-4">
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Featured;