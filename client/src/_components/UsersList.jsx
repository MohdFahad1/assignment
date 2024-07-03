import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Eye, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users");
      console.log(res.data.users);
      if (res.status === 200) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log("Error fetching Users: ", error);
    }
  };

  return (
    <>
      {users.length > 0 ? (
        <div className="mt-3">
          <div className="grid grid-cols-3 bg-slate-200 p-2">
            <h2 className="font-bold">Name</h2>
            <h2 className="font-bold">email</h2>
            <h2 className="font-bold">Action</h2>
          </div>
          {users.map((user) => (
            <div className="grid grid-cols-3 bg-slate-50 p-2" key={user._id}>
              <h2 className="capitalize">
                {user.firstName} {user.lastName}
              </h2>
              <h2>{user.email}</h2>
              <Link to={`/admin/user/${user._id}`}>
                <Eye className="bg-blue-500 text-white rounded-md" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 w-full flex flex-col gap-5">
          {[1, 2, 3].map((index) => (
            <div key={index}>
              <div className="h-[30px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UsersList;
