import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../actions/userActions";

const PrivateRoute = () => {
  const user = useSelector((state) => state.getUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
