import { useContext, useEffect, useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SectionTitle/SocialLogin/SocialLogin";

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const [disabled,setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathName || '/';

    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])

    

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email,password)
        .then(user=>{
            console.log(user.user);
            Swal.fire({
                title: "User Logged in successful",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
              navigate(from,{replace:true});
        })
        .catch(err=>{
            console.log(err.message);
        })
    }
    const handleValidate = (e)=>{

        const captchaValue = e.target.value;

        if(validateCaptcha(captchaValue)==true){
       
            setDisabled(false);
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen ">
            <Helmet>
                <title>Bistro | Login</title>
            </Helmet>
            <div className="hero-content  flex-col lg:flex-row">
                <div className="text-center md:w-1/3 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleValidate} type="text" name="captcha" placeholder="Captcha" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                    <div className="text-center mb-3">
                        <p>Not yet Register? <Link className="text-blue-500" to={"/register"}>Register Here</Link></p>
                        <small></small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;