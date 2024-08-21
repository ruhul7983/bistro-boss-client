import { useState } from "react";
import orderCover from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
    const categories = ['salad', 'pizza', 'dessert', 'drinks', 'soup'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menus] = useMenu();
    const dessert = menus.filter(item => item.category === "dessert");
    const soup = menus.filter(item => item.category === "soup");
    const salad = menus.filter(item => item.category === "salad");
    const pizza = menus.filter(item => item.category === "pizza");
    const drinks = menus.filter(item => item.category === "drinks");
    return (
        <div>
            <Helmet>
                <title>Bistro | Order Food</title>
            </Helmet>
            <Cover img={orderCover} heading={"Order Food"} subheading={" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem perspiciatis officiis ratione ut animi officia!"}></Cover>

            <Tabs className={"text-center"} defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>
                    <Tab>Soup</Tab>
                </TabList>
                <TabPanel >
                    <OrderTab menu={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab menu={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab menu={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab menu={drinks}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab menu={soup}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;