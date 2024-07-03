import axios from "axios";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const User = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/users/${userId}`
      );

      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log("Error fetching User Details: ", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/users/${userId}`,
        {
          firstName,
          lastName,
          email,
          password,
          role,
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        getUserDetails();
      }
    } catch (error) {
      console.log("Error Updating User: ", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/users/${userId}`
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/admin/");
      }
    } catch (error) {
      console.log("Error Deleting User: ", error);
    }
  };

  return (
    <>
      <div className="p-5">
        <h1 className="text-2xl font-bold flex gap-2 items-center">
          <Link to={"/admin/"}>
            <ArrowLeft />
          </Link>
          User Details
        </h1>
        <div className="flex flex-col gap-3 mt-5">
          <h1 className="text-xl font-semibold">
            Name: {user?.firstName} {user?.lastName}
          </h1>
          <h1 className="text-xl font-semibold">Email: {user?.email}</h1>
          <h1 className="text-xl font-semibold">
            Role: {user?.role === 0 ? "User" : "Admin"}
          </h1>
        </div>
        <div className="flex mt-5 gap-5">
          <div className=" bg-green-500 h-[40px] w-[40px] rounded-md hover:bg-green-600 text-white cursor-pointer flex items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Edit size={30} />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User Details</DialogTitle>
                  <DialogDescription className="flex flex-col gap-3">
                    <div>
                      <h1>First Name</h1>
                      <Input
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                    </div>
                    <div>
                      <h1>Last Name</h1>
                      <Input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </div>
                    <div>
                      <h1>Email</h1>
                      <Input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div>
                      <h1>Password</h1>
                      <Input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                    <div>
                      <h1>Role</h1>
                      <Input
                        type="Number"
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogClose>
                  <Button type="submit" onClick={handleUpdateUser}>
                    Update
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
          <h1
            className=" bg-red-500 h-[40px] w-[40px] rounded-md hover:bg-red-600 text-white cursor-pointer flex items-center justify-center"
            onClick={handleDeleteUser}
          >
            <Trash size={30} />
          </h1>
        </div>
      </div>
    </>
  );
};

export default User;
