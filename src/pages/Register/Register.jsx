import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SectionTitle/SocialLogin/SocialLogin";

const Register = () => {
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const { createUser, updateUserProfiles } = useContext(AuthContext);



    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(user => {
                console.log(user.user);
                updateUserProfiles(data.name, data.photoUrl)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                        }
                        axiosPublic.post("/users", userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })

                        navigate("/");
                    })
                    .catch(err => {
                        console.log("error from update", err.message);
                    })
            })
            .catch(err => {
                console.log("error from mssage", err.message);
            })
    }

    return (

        <div className="hero bg-base-200 min-h-screen ">
            <Helmet>
                <title>Bistro | Register</title>
            </Helmet>
            <div className="hero-content  flex-col lg:flex-row-reverse">
                <div className="text-center md:w-1/3 lg:text-left">
                    <h1 className="text-5xl font-bold">Register Here!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" {...register("name")} placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input type="text" {...register("photoUrl")} placeholder="Photo Url" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" {...register("password", {
                                minLength: 6, maxLength: 20,
                                pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                            })} placeholder="password" className="input input-bordered" required />
                            {
                                errors.password?.type === 'minLength' && <span className="text-red-400">Minimum 6 letters</span>
                            }
                            {
                                errors.password?.type === 'maxLength' && <span className="text-red-400">Maximum 20 letters</span>
                            }
                            {
                                errors.password?.type === 'pattern' && <span className="text-red-400">Uppercase, Special and Numbers required</span>
                            }
                        </div>
                        <input className="btn btn-secondary" type="submit" value="Register" />
                    </form>
                    <SocialLogin></SocialLogin>
                    <div className="text-center mb-3">
                        <p>Already Have an Account? <Link className="text-blue-500" to={"/login"}>Login</Link></p>
                        <small></small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;