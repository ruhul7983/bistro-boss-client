import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMG_BB_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;
const UpdateItem = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const item = useLoaderData();
    console.log(item);
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] };
        console.log(imageFile);
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url,
            }
            await axiosSecure.patch(`/menus/${item._id}`, menuItem)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Product Updated Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })

        }
    }
    const category = ["Salad", "Pizza", "Dessert", "Drinks", "Popular", "Soup"];

    return (
        <div>
            <SectionTitle heading={"Refresh Info"} subHeading={"Update Item"}></SectionTitle>
            <div className="text-black rounded text-center w-full md:w-4/5 mx-auto my-3 bg-slate-300 p-4">
                <div className="flex justify-between w-full">

                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Recipe Name</span>
                            </label>
                            <input {...register("name")} defaultValue={item.name} type="text" placeholder="Recipe Name" className="input text-white input-bordered w-full" required />
                        </div>

                        <div className="flex flex-col md:flex-row gap-x-2">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-black">Category</span>
                                </label>
                                <select defaultValue={item.category} className="select text-white select-bordered w-full" {...register("category")}>
                                    <option disabled selected value={""}>Select category</option>
                                    {
                                        category.map(item => <option key={item} value={item.toLowerCase()}>{item}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-black">Price</span>
                                </label>
                                <input {...register("price")} defaultValue={item.price} type="number" placeholder="Price" className="input text-white input-bordered w-full" required />
                            </div>
                        </div>


                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Recipe Details</span>
                            </label>
                            {/* <input {...register("name")} type="text" placeholder="Recipe Name" className="input text-white input-bordered w-full" required /> */}
                            <textarea defaultValue={item.recipe}  {...register("recipe")} name="recipe" className="input text-white input-bordered w-full" placeholder="Recipe Details" rows="4"></textarea>
                        </div>

                        <input {...register("image")}  type="file" className="file-input file-input-bordered file-input-md w-full mt-3 text-white" />
                        <button className="btn mt-3">Update item <FaUtensils></FaUtensils></button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default UpdateItem;