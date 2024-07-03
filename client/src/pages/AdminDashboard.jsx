import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import UsersList from "../_components/UsersList";
import AddUser from "../_components/AddUser";

const Admin = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold flex items-center">
        <Link to={"/"}>
          <ArrowLeft />
        </Link>
        Admin Panel
      </h1>
      <div>
        <UsersList />
      </div>
      <div className="mt-5">
        <AddUser />
      </div>
    </div>
  );
};

export default Admin;
