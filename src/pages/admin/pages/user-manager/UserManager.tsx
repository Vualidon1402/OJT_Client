import React, { useEffect, useState } from 'react'
import "./user-manager.scss";
import { User } from '@/store/slices/user.slice';
import apis from '@/apis';
import { Table } from 'react-bootstrap';



export default function UserManager() {

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    apis.user.findAll().then((res) => {
      if (res.status == 200) {
        setUsers(res.data);
      }
    });
  }, []);
  console.log(users);
  
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
              <td>{user.status === 1 ? "Hoạt động" : "Cấm"}</td>
              <td>
                {!user.deleted ? "Đã xác thực mail" : "Chưa xác thực mail"}
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString("vi-VN")}</td>
              <td>{new Date(user.updatedAt).toLocaleDateString("vi-VN")}</td>
              <button>Manager</button>
              <td>
                {/* Thêm các công cụ quản lý người dùng ở đây */}
                <button>Sửa</button>
                <button>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
