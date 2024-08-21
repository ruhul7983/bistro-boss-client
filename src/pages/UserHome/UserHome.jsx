import useAuth from "../../hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
            user home {user?.displayName}
        </div>
    );
};

export default UserHome;