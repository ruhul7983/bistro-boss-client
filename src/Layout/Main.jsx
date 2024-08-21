import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes("login");
    const isRegister = location.pathname.includes("register");
    return (
        <div>
            {
            isLogin ||isRegister || <Navbar></Navbar>

            }
            <Outlet></Outlet>
            {
            isLogin||isRegister ||  <Footer></Footer>

            }
           
        </div>
    );
};

export default Main;