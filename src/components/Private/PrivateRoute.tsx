import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { userState } from "../../redux/slices/userSlice/userSlice";
// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";

const PrivateRoute = () => {

  const { isLoggedIn } = useAppSelector(userState);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
