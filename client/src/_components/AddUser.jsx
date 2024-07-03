import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";

const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);

  const handleAddUser = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users", {
        firstName,
        lastName,
        email,
        password,
        role,
      });

      console.log(res);
      if (res.status === 201) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error Adding User: ", error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
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
            <Button type="submit" onClick={handleAddUser}>
              Add
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUser;
