import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const signOut = () => {
        return logOut();    
    }
    const [cart] = useCart();
    const links = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={"/menu"}>Menu</Link></li>
        <li><Link to={"/order/salad"}>Order</Link></li>
        {
            user && isAdmin &&<li><Link to={"/dashboard/admin-home"}>Admin Dashboard</Link></li>
        }
        {
            user && !isAdmin &&<li><Link to={"/dashboard/user-home"}>User Home</Link></li>
        }
        <li>{user?.email}</li>
        <li>
            {
                user &&
                <Link to={"/dashboard/cart"}>
                <>
                    <FaShoppingCart />
                    <div className="badge badge-secondary">+{cart.length}</div>
                </>
            </Link>
            }
        </li>

    </>


    return (
        <div className="navbar fixed z-10 bg-opacity-30 text-white max-w-screen-xl bg-black">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <button onClick={signOut} className="btn">Logout</button> : <Link to={"/login"} className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;