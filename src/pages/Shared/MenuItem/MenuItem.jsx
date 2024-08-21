
const MenuItem = ({ menu }) => {
    const { image, price, recipe, name } = menu;

    return (
        <div>
            <div className="flex items-center space-x-2">
                <img style={{borderRadius:"0 200px 200px 200px"}} className="w-24" src={image} alt="" />
                <div>
                    <h1 className="uppercase font-semibold">{name} -------</h1>
                    <p>{recipe}</p>
                </div>
                <h1 className="text-yellow-500 font-semibold">${price}</h1>
            </div>
        </div>
    );
};

export default MenuItem;