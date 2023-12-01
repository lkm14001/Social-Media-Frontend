import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import PrivateRoute from "./components/Private/PrivateRoute";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  checkAuthAsync,
  logoutAsync,
  userState,
} from "./redux/slices/userSlice/userSlice";
import { getDesignTokens } from "./utils/theme";
import Layout from "./components/Layout/Layout";
import Profile from "./components/Home/Profile/Profile";
import axios from "axios";
import { axiosAuthInstance } from "./utils/instance.axios";
import { useEffect } from "react";

const App = () => {
  // const [prefersDarkMode, setPrefersDarkMode] = useState<boolean>();
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mode = useAppSelector(userState).darkMode;
  const theme = getDesignTokens(mode ? "dark" : "light");

  useEffect(() => {
    const checkAuth = () => {
      dispatch(checkAuthAsync()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          navigate("/login");
        } else if (res.meta.requestStatus === "fulfilled") {
          navigate("/home");
        }
      });
    };

    checkAuth();
    // return () => checkAuth();
    // eslint-disable-next-line
  }, []);

  const refreshToken = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_REFRESH_TOKEN}`,
      { withCredentials: true }
    );
    return response;
  };

  axiosAuthInstance.interceptors.request.use(
    async (config) => {
      const response = refreshToken();
      if ((await response).data.success === true) {
        console.log("REFRESH TOKEN VALID");
        config.withCredentials = true;
      } else {
        dispatch(logoutAsync()).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigate("/login");
          }
        });
        console.log("LOGEGED OUT");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* <Route path='/' element={<Navigate to='/login' />} /> */}
          <Route path="/login" index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="" element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/profile/:userId" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
