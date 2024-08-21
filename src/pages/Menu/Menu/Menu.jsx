import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import dessertBg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaBg from "../../../assets/menu/pizza-bg.jpg";
import soupBg from "../../../assets/menu/soup-bg.jpg";
import saladBg from "../../../assets/menu/salad-bg.jpg";
import menuBg from "../../../assets/menu/banner3.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menus] = useMenu();
    const dessert = menus.filter(item => item.category === "dessert");
    const soup = menus.filter(item => item.category === "soup");
    const salad = menus.filter(item => item.category === "salad");
    const pizza = menus.filter(item => item.category === "pizza");
    const offered = menus.filter(item => item.category === "offered");

    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover img={menuBg} heading={"Our Menu"} subheading={"Would you like to try a dish?"}></Cover>
            <SectionTitle heading={"Don't miss"} subHeading={"Today's offer"}></SectionTitle>

            <MenuCategory title={'offered'} items={offered}></MenuCategory>

            <Cover img={dessertBg} heading={"Dessert"} subheading={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo fuga labore architecto similique consequatur maxime officiis nam eos recusandae cupiditate."}></Cover>
            <MenuCategory title={'dessert'} items={dessert}></MenuCategory>
            <Cover img={pizzaBg} heading={"Pizza"} subheading={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo fuga labore architecto similique consequatur maxime officiis nam eos recusandae cupiditate."}></Cover>
            <MenuCategory title={'pizza'} items={pizza}></MenuCategory>
            <Cover img={soupBg} heading={"Soup"} subheading={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo fuga labore architecto similique consequatur maxime officiis nam eos recusandae cupiditate."}></Cover>
            <MenuCategory title={'soup'} items={soup}></MenuCategory>
            <Cover img={saladBg} heading={"Salad"} subheading={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo fuga labore architecto similique consequatur maxime officiis nam eos recusandae cupiditate."}></Cover>
            <MenuCategory title={'salad'} items={salad}></MenuCategory>


        </div>
    );
};

export default Menu;