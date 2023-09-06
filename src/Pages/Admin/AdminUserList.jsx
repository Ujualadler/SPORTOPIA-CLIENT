import React from "react";
import AdminNavbar from "../../Components/Admin/AdminNavbar/AdminNavbar";
import AdminviewUser from "../../Components/Admin/AdminViewUser/AdminviewUser";

function AdminUserList() {
  return (
    <>
      <div className="flex bg-gray-900">
        <AdminNavbar/>
        <AdminviewUser/>
      </div>
    </>
  );
}

export default AdminUserList;
