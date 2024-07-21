import React, { useEffect, useState } from "react";
import "./user-manager.scss";
import { User } from "@/store/slices/user.slice";
import apis from "@/apis";
import { Table } from "react-bootstrap";
import { Input } from "antd";

const { Search } = Input;

export default function UserManager() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortType, setSortType] = useState("asc");

  console.log(setSize);
  // Lấy danh sách người dùng
  useEffect(() => {
    apis.user.findAll().then((res) => {
      if (res.status == 200) {
        setUsers(res.data);
        setFilteredUsers(res.data);
      }
    });
  }, []);

  // Cập nhật trạng thái người dùng
  function updateStatus(userId: number) {
    apis.user
      .updateStatus(userId)
      .then((res) => {
        if (res.status === 200) {
          const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, status: !user.status } : user
          );
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
        } else {
          // Xử lý trường hợp API trả về lỗi
          console.error("Failed to update user status");
        }
      })
      .catch((err) => {
        console.error("Error updating user status:", err);
        // Xử lý lỗi, có thể hiển thị thông báo cho người dùng
      });
  }

  // Tìm kiếm
  const handleSearch = async (value: string) => {
    if (value.trim() === "") {
      setFilteredUsers(users);
    } else {
      try {
        const res = await apis.user.findByUserName(value);
        if (res.status === 200) {
          setFilteredUsers(res.data);
        } else {
          setFilteredUsers([]);
        }
      } catch (error) {
        console.error("Error searching users:", error);
        setFilteredUsers([]);
      }
    }
  };

  //phân trang
  useEffect(() => {
    const fetchData = async () => {
      const res = await apis.user.findUsers(page, size);
      if (res.status === 200) {
        setFilteredUsers(res.data.content);
        setTotalPages(res.data.totalPages);
      } else {
        setFilteredUsers([]);
      }
    };

    fetchData();
  }, [page, size]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  //sắp xếp
  useEffect(() => {
    const fetchData = async () => {
      const res = await apis.user.sortUser(sortType);
      if (res.status === 200) {
        setFilteredUsers(res.data);

      } else {
        setFilteredUsers([]);
      }
    };

    fetchData();
  }, [sortType]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortChange = (event: any) => {
    setSortType(event.target.value);
  };

  return (
    <>
      <Search
        placeholder="What are you looking for?"
        onSearch={handleSearch}
        style={{
          width: 300,
          margin: "10px 10px 20px 10px",
          float: "right",
          padding: "10px",
        }}
      />
      <label htmlFor="sortSelect">Sắp xếp theo: </label>
      <select id="sortSelect" value={sortType} onChange={handleSortChange}>
        <option value="asc">User Hiện Tại</option>
        <option value="desc">User Mới Nhất </option>
        <option value="abc">Theo (A-Z)</option>
        <option value="zyx">Theo (Z-A)</option>
      </select>

      {filteredUsers && filteredUsers.length > 0 ? (
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
            {filteredUsers.map((user, index) => (
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
                <td>
                  <button>Manager</button>
                </td>
                <td>
                  <button>Sửa</button>
                  <button
                    onClick={() => updateStatus(user.id)}
                    className={`btn btn-${user.status ? "success" : "danger"}`}
                  >
                    {user.status ? "Block" : "Unlock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p
          style={{
            width: 300,
            margin: "10px 10px",
            fontSize: "20px",
            padding: "10px",
          }}
        >
          Không có người dùng tương ứng
        </p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}{" "}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>
    </>
  );
}
