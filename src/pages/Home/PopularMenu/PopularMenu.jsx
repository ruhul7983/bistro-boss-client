import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
    const [menus] = useMenu();
    const popular = menus.filter(item=>item.category ==="popular");
    // const [menus,setMenu] = useState([]);
    // useEffect(()=>{
    //     fetch("menu.json")
    //     .then(res=>res.json())
    //     .then(data=>{
    //         const popularItems = data.filter(item=>item.category ==='popular');
    //         setMenu(popularItems);
    //     });
    // },[])
    return (
        <section className="my-5">
            <SectionTitle heading={"Check it out"} subHeading={"From our menu"}></SectionTitle>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {
                    popular.map(menu=><MenuItem key={menu._id} menu={menu}></MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;