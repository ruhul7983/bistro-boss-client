import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu  = ()=>{
    // const [menus,setMenu] = useState([]);
    // const [loading,setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    // useEffect(()=>{
    //     fetch("https://bistro-boss-server-nine-rho.vercel.app/menus")
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setMenu(data);
    //         setLoading(false);
    //     });
    // },[])
    const {data :menus = [], refetch, isPending:loading} = useQuery({
        queryKey:['menu'],
        queryFn:async ()=>{
            const res = await axiosPublic.get("/menus");
            return res.data;
        }
    })

    return [menus,loading,refetch];
}


export default useMenu;