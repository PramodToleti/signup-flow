import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@mui/material";

const Home = () => {
  const token = Cookies.get("access_token");
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/register" />;
  }

  const handleLogOut = () => {
    Cookies.remove("access_token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <Button variant="contained" onClick={handleLogOut}>
        Log Out
      </Button>
    </div>
  );
};

export default Home;
