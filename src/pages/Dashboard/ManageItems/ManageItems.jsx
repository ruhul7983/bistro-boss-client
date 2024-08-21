import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const [menus, ,refetch] = useMenu();
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
                
                axiosSecure.delete(`/menus/${_id}`)
                .then(res=>{
                    if(res.data.deletedCount>0){
                        console.log(_id);
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        });
    }
   
    return (
        <div>
            <SectionTitle heading={"manage items"} subHeading={"Edit or Delete Items here"}></SectionTitle>
            <div className="text-black rounded text-center w-4/5 mx-auto my-3 bg-slate-300 p-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl">Total Orders: </h1>
                    <h1 className="text-3xl">Total Price: </h1>
                    <button className="btn btn-primary">Pay</button>

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
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                menus.map((item, index) => <tr key={item._id}>
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
                                    <td>$ {item.price}</td>
                                    <th>
                                        <Link to={`/dashboard/update-item/${item._id}`} className="btn text-black btn-lg btn-accent "> <FaEdit></FaEdit></Link>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn text-red-600 btn-ghost btn-lg"> <FaTrash></FaTrash></button>
                                    </th>
                                </tr>
                                )
                            }


                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;