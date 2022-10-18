import { getToken } from "../helper/tokens";
import { Navigate } from "react-router-dom/dist";

function AuthRoute({ child }) {
    const token = getToken();
    return (token != null) ? child : <Navigate to='/login/' />;
}

export default AuthRoute