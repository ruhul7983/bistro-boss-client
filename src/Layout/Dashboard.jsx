import { useState } from "react";
import { CiCalendar, CiMenuBurger } from "react-icons/ci";
import { FaAd, FaCalendar,  FaHome, FaList, FaShoppingCart,  FaUsers, FaUtensilSpoon } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [hide, setHide] = useState(false);
    const [cart] = useCart();
    // TODO: Done this latter
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <div  className={`w-64  ${hide ? 'hidden' : 'block'} min-h-screen bg-[#D1A054]`}>

                <ul className="menu p-4 text-black">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to="/dashboard/admin-home"><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/add-items"><FaUtensilSpoon></FaUtensilSpoon> Add Items</NavLink></li>
                                <li><NavLink to="/dashboard/manage-items"><FaList></FaList> Manage Items</NavLink></li>
                                <li><NavLink to="/dashboard/all-users"><FaUsers></FaUsers> All User</NavLink></li>

                            </> :
                            <>
                                <li><NavLink to="/dashboard/user-home"><FaHome></FaHome> User Home</NavLink></li>
                                <li><NavLink to="/dashboard/payment-history"><FaCalendar></FaCalendar> Payment History</NavLink></li>
                                <li><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart> My Cart +{cart.length}</NavLink></li>
                                <li><NavLink to="/dashboard/review"><FaAd></FaAd> Add Review</NavLink></li>
                                <li><NavLink to="/dashboard/review"><CiCalendar></CiCalendar> My Bookings</NavLink></li>
                            </>
                    }

                    {/* Shared NavLinks */}
                    <hr />
                    <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to="/order/salad"><CiMenuBurger></CiMenuBurger> Menu</NavLink></li>

                </ul>

            </div>
            <div>
                <button onClick={() => setHide(!hide)}> {hide ? <FaList></FaList> : "X"}</button>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;