import React, { useEffect, useState } from "react";
import "./user-manager.scss";
import { User } from "@/store/slices/user.slice";
import apis from "@/apis";
import { Table } from "react-bootstrap";

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    apis.user.findAll().then((res) => {
      if (res.status == 200) {
        setUsers(res.data);
      }
    });
  }, []);

  function updateStatus(userId: number) {
    apis.user
      .updateStatus(userId)
      .then((res) => {
        console.log(res);
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, status: !user.status } : user
          )
        );
      })
      .catch((err) => {
        console.error(err);
        // Xử lý lỗi, có thể hiển thị thông báo cho người dùng
      });
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Avatar</th>
            <th>Role</th>
            <th>Status</th>
            <th>isVerified</th>
            <th>createAt</th>
            <th>updateAt</th>
            <th>Permission</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <img
                  src={user.avatar}
                  alt={user.username}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{user.roles[0].roleName}</td>
              <td>{user.status ? "Hoạt động" : "Cấm"}</td>
              <td>
                {!user.deleted ? "Đã xác thực mail" : "Chưa xác thực mail"}
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString("vi-VN")}</td>
              <td>{new Date(user.updatedAt).toLocaleDateString("vi-VN")}</td>
              <button>Manager</button>
              <td>
                <button>Sửa</button>
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => updateStatus(user.id)}
                    className={`btn btn-${user.status ? "success" : "danger"}`}
                  >
                    {user.status ? "Block" : "Unlock"}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
