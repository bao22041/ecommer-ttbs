import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/1").then((res) => {
      setUser(res.data);
    });
  }, []);

  if (!user) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Đang tải thông tin tài khoản...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3>Thông tin tài khoản</h3>
      <div className="row">
        <div className="col-md-4">
          <img
            src={user.avatar}
            alt="Avatar"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="col-md-8">
          <p><strong>Họ tên:</strong> {user.full_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>SĐT:</strong> {user.phone}</p>
          <p><strong>Địa chỉ:</strong> {user.address}</p>
          <p><strong>Vai trò:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
}
