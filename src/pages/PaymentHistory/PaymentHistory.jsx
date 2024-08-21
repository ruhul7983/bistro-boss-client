import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments =[]} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <SectionTitle heading={"Payment History"} subHeading={"Your history?"}></SectionTitle>
            <div className="text-black rounded text-center w-4/5 mx-auto my-3 bg-slate-300 p-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl">Total Orders: </h1>
                    <h1 className="text-3xl">Total Price: </h1>


                </div>
                {/* table */}
                <div className="overflow-x-auto ">
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
                            {
                                payments.map((item,index) => <tr key={item._id}>
                                    <th>
                                        <label className="text-black">
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={"item.image"}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-black"> 
                                        {item.transactionId}
                                        <br />
                                    </td>
                                    <td className="text-black">{item.price}</td>
                                    
                                </tr>)
                            }

                        </thead>
                        <tbody>
                            {/* row 1 */}





                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default PaymentHistory;