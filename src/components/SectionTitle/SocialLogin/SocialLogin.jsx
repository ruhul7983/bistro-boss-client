import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(res=>{
            console.log(res.user);
            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName,
            }
            axiosPublic.post("/users",userInfo)
            .then(res=>{
                console.log(res.data);
                    navigate("/")
            })
        })
        .catch(err=>{
            console.log(err.message);
        })
    }
    return (
        <div>
            <div className="text-center -mt-4">
                <button onClick={handleGoogleSignIn} className="btn btn-accent">
                    <FaGoogle></FaGoogle>
                    Google 
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;