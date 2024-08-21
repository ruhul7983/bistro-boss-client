import { FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart,refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(_id);
                axiosSecure.delete(`/carts/${_id}`)
                .then(res=>{
                    if(res.data.deletedCount ===1){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }else{
                        Swal.fire({
                            title: "Not Deleted Successful",
                            text: "Your file is not deleted.",
                            icon: "warning"
                        });
                    }
                })
                
            }
        });
    }
    return (
        <div>
            <SectionTitle heading={"My Cart"} subHeading={"Wanna Add More?"}></SectionTitle>
            <div className="text-black rounded text-center w-4/5 mx-auto my-3 bg-slate-300 p-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl">Total Orders: {cart.length}</h1>
                    <h1 className="text-3xl">Total Price: {totalPrice}</h1>
                    {
                        !cart.length? <Link to={"/order/salad"}  className="btn btn-primary">Add to cart first</Link>
                        :<Link to={"/dashboard/payment"} className="btn btn-primary">Pay</Link>

                    }
                    
                </div>
                {/* table */}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-black">
                                <th>

                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                cart.map((item, index) => <tr key={item._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                        <br />
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn text-red-600 btn-ghost "> <FaTrash></FaTrash></button>
                                    </th>
                                </tr>)
                            }


                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default Cart;