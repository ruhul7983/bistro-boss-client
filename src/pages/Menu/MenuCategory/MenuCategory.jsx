import { Link } from "react-router-dom";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items,title }) => {
    return (
        <div>
            <div className="grid my-4 grid-cols-1 gap-4 md:grid-cols-2">
                {
                    items.map(item => <MenuItem key={item._id} menu={item}></MenuItem>)

                }
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn btn-outline  border-0 border-b-4 ">
                    Order Now
                </button>
            </Link>
        </div>
    );
};

export default MenuCategory;