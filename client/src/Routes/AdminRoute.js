import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Unauthorized from "../_components/Unauthorized";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/auth/admin-auth",
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res?.data?.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Unauthorized />;
};

export default AdminRoute;
