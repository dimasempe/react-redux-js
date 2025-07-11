import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function GuestPage(props) {
  const userSelector = useSelector((state) => state.user);

  if (userSelector.username) {
    return <Navigate to="/" />;
  }
  return <>{props.children}</>;
}

export default GuestPage;
