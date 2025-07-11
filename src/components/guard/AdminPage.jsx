import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function AdminPage(props) {
    const userSelector = useSelector((state) => state.user);

    if (userSelector.user !== "admin") {
        return <Navigate to="/" />;
    }
    return <>{props.children}</>;
}

export default AdminPage