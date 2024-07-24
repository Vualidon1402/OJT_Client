/* eslint-disable @typescript-eslint/no-explicit-any */
import apis from "@/apis";

import "./Banner-manager.scss";
import { useState } from "react";

import { Button, Input, Form, Modal, Upload } from "antd";
import { Table } from "react-bootstrap";
import { UploadOutlined } from "@ant-design/icons";
import { fireBaseFn } from "@/firebase";
import { showToast } from "@/util/toast";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/store";
import { bannerAction } from "@/store/slices/banner.slice";

export default function BannerManager() {
  const dispatch = useDispatch();
  const bannerStore = useSelector((store: StoreType) => {
    return store.bannerStore.data;
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Lấy file từ form
      const file = values.image[0].originFileObj;
      // Upload file lên Firebase Storage
      const imageUrl = await fireBaseFn.uploadToStorage(file);
      // Tạo dữ liệu để gửi đến API
      const data = {
        title: values.title,
        image: imageUrl, // URL của hình ảnh từ Firebase
      };
      // Gọi API để lưu banner vào MySQL
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await apis.banner.addBanner(data);
      showToast.success("Thêm banner thành công");
      //dispatch
      dispatch(bannerAction.add(data));
      setIsModalVisible(false);
      form.resetFields();
      // Có thể thêm logic để cập nhật danh sách banner ở đây
    } catch (error) {
      console.error("Failed to add banner:", error);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div>
        <div id="fui-toast"></div>
        <h1>Banner Manager</h1>

        <Button type="primary" onClick={showModal}>
          ADD Banner
        </Button>

        <Table striped bordered hover size="sm" className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bannerStore?.map((banner, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{banner.title}</td>

                <td className="banner-image-column">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="banner-image"
                  />
                </td>
                <td>{banner.status ? "Hoat dong" : "Khong hoat dong"}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      apis.banner.deleteBanner(banner.id);
                      dispatch(bannerAction.delete(banner.id));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          title="Add New Banner"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Upload
                name="image"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
