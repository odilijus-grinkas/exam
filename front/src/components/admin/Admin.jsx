import Header from "../header/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./user-list/UserList";
import CategoryNew from "./category-new/CategoryNew";
import ApprovalList from "./approval-list/ApprovalList";

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(0);

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
      });
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/approve/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
      });
      if (response.ok) {
        setReloadUsers(reloadUsers + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
      });
      if (response.ok) {
        setReloadUsers(reloadUsers + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user?.admin) {
      navigate("/");
      return;
    }

    getAllUsers();
  }, [reloadUsers]);

  return (
    <div>
      <Header />
      <h1>Admin</h1>
      <div className="d-block d-md-flex justify-content-around" style={{ gap: "20px" }}>
        <CategoryNew/>
        <UserList users={users} delete={handleDeleteUser} className="flex-grow-1" />
      </div>
    </div>
  );
}
