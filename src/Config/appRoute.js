import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "../Context";

const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();

  const navigate = useNavigate();

  return (isPrivate && !Boolean(userDetails.token) ? (
    <Navigate to="/auth/login" />
  ) : (
    <Component />
  )
  );
};

export default AppRoute;
