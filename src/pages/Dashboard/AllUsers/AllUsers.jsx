import { FaTrash, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data;
        }
    })
    const handleDeleteUser = (_id) => {
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
                axiosSecure.delete(`/users/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount === 1) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        } else {
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

    const handleMakeAdmin = (user) => {
        console.log(user._id);
                    Swal.fire({
                        title: "Are you sure to make admin?",
                        text: "You need to change this from database",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Make Admin!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axiosSecure.patch(`/users/admin/${user._id}`,)
                                .then(res => {
                                    if (res.data.modifiedCount > 0) {
                                        refetch();
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: `${user.name} now role as admin`,
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                    }
                                })

                        }
                    });   
            
    }
    return (
        <div>
            <SectionTitle heading={"Manage Users"} subHeading={"How Many Users you have?"}></SectionTitle>
            <div className="text-black rounded text-center w-4/5 mx-auto my-3 bg-slate-300 p-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl">Total Users: {users.length}</h1>

                </div>
                {/* table */}
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-black">
                                <th>

                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users.map((item, index) => <tr key={item._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <h1>{item.name}</h1>
                                        </div>
                                    </td>
                                    <td>
                                        {item.email}
                                        <br />
                                    </td>
                                    <td>{
                                        item.role === "admin" ? "Admin" : <button onClick={() => handleMakeAdmin(item)} className="btn btn-success"><FaUsers></FaUsers></button>
                                    }</td>
                                    <th>
                                        <button onClick={() => handleDeleteUser(item._id)} className="btn text-red-600 btn-ghost "> <FaTrash></FaTrash></button>
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

export default AllUsers;