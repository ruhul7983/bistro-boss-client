import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const FoodCard = ({ items }) => {
    const { image, price, recipe, name, _id } = items;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [,refetch] = useCart();
    const handleAddToCart = food => {
        console.log(food);
        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                name, image, price
            }
            axiosSecure.post("/carts",cartItem)
            .then(res=>{
                console.log(res.data);
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} has been added to user cart`,
                        showConfirmButton: false,
                        timer: 3000
                      });
                      refetch();
                }
            })
        } else {
            Swal.fire({
                title: "You are not login",
                text: "Please login to add to cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className="bg-slate-900 text-white absolute right-5 rounded-sm px-2 top-2  py-1">$ {price}</p>
            <div className="card-body text-center">
                <h2 className="card-title flex flex-col justify-center">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(items)} className="btn btn-outline  border-0 border-b-4 border-orange-300">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;