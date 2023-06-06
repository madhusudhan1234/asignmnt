import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn && location.pathname === "/lol") {
      navigate("/lol");
    } else if (isLoggedIn && location.pathname === "/u") {
      navigate("/u");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const fetchMe = async () => {
    try {
      const userData = await AuthService.get();
      if (userData) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return isLoggedIn;
};

export default useAuth;
