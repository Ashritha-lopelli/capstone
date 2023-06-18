import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { signin } from "../../utils/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();

  const login = async ({ email, password }, callback) => {
    try {
      const res = await signin({ email, password });

      setCookies("token", res.data.token); // your token
      setCookies("name", res.data.username);

      navigate("/home");
    } catch (err) {
      const { status, data } = err.response;

      if ([400, 404].includes(status)) callback(data.message);
      else callback("Something went wrong, Please try again later.");
    }
  };

  const logout = () => {
    ["token", "name"].forEach((obj) => removeCookie(obj)); // remove data save in cookies
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
