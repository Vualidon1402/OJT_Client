import React, { useState } from "react";
import api from "@/apis";
import { fireBaseFn } from "@/firebase";
import { useSelector } from "react-redux";
import { StoreType } from "@/store";
import "./AddProductDetail.scss";

interface AddProductDetailProps {
  productId: number;
  onClose: () => void;
  setAddFormState: (state: boolean) => void;
  updateListProductDetail: (productDetail: ProductDetail) => void;
}

interface ProductDetail {
  id: number;
  image: string;
  productDetailName: string;
  stock: number;
  unitPrice: number;
  colorId: number;
  productId: number;
  configId: number;
  status?: boolean;
<<<<<<< HEAD
  discount?: number;
=======
  discount: number;
>>>>>>> 5da2e2d (Completed ui-api-integration-flash-sale-product-homePage)
}

const AddProductDetail: React.FC<AddProductDetailProps> = ({
  productId,
  onClose,
  setAddFormState,
  updateListProductDetail,
}) => {
  const [productDetail, setProductDetail] = useState<ProductDetail>({
    id: 0,
    image: "",
    productDetailName: "",
    stock: 0,
    unitPrice: 0,
    colorId: 0,
    productId: productId,
    configId: 0,
    status: true,
    discount: 0,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setSelectedFile(files[0]);
    } else {
      setProductDetail((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  console.log(productDetail);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image file.");
      return;
    }


    try {
      const imageUrl = await fireBaseFn.uploadToStorage(selectedFile);
<<<<<<< HEAD
      const response = await api.productDetail.addProductDetail({
        ...productDetail,
        image: imageUrl,
      });
      updateListProductDetail(response.data);
      alert("Product detail created successfully");
=======
      console.log("aaaaa" , productDetail)
      const response = await api.productDetail.addProductDetail({ ...productDetail, image: imageUrl });
      updateListProductDetail(response.data);
      console.log(response.data);
      alert('Product detail created successfully');
>>>>>>> 5da2e2d (Completed ui-api-integration-flash-sale-product-homePage)
      setAddFormState(false);
      onClose();
    } catch (err) {
      alert("Error creating product detail");
      console.log(err);
    }
  };

  const colorStore = useSelector((store: StoreType) => store.colorStore);
  console.log(colorStore);
  const configStore = useSelector((store: StoreType) => store.configStore);
  console.log(configStore);

  return (
    <div className="productDetail_add_box">
      <div className="form_box">
        <button
          onClick={() => {
            setAddFormState(false);
          }}
          className="close_btn"
        >
          X
        </button>
        <h1 className="form_title">Form Add Product Detail</h1>
        <form className="add_form" onSubmit={handleSubmit}>
          <div>
            <label> Image: </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="form_input"
            />
          </div>
          <div>
            <label> Name:</label>
            <input
              type="text"
              name="productDetailName"
              value={productDetail.productDetailName}
              onChange={handleChange}
              placeholder="Product Detail Name"
              className="form_input"
            />
          </div>
          <div>
            <label> Stock:</label>
            <input
              type="text"
              name="stock"
              value={productDetail.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="form_input"
            />
          </div>
          <div>
<<<<<<< HEAD
            <label> Unit Price:</label>
            <input
              type="text"
              name="unitPrice"
              value={productDetail.unitPrice}
              onChange={handleChange}
              placeholder="Unit Price"
              className="form_input"
            />
=======
            <label > Unit Price:
            </label>
            <input type="text" name="unitPrice" value={productDetail.unitPrice} onChange={handleChange} placeholder="Unit Price" className='form_input' />
          </div>
          <div>
            <label > Discount:
            </label>
            <input type="text" name="discount" value={productDetail.discount} onChange={handleChange} placeholder="Discount" className='form_input' />
>>>>>>> 5da2e2d (Completed ui-api-integration-flash-sale-product-homePage)
          </div>
          <div>
            <label> Discount:</label>
            <input
              type="text"
              name="discount"
              value={productDetail.discount}
              onChange={handleChange}
              placeholder="Discount"
              className="form_input"
            />
          </div>
          <div>
            <label>Color ID:</label>
            <select
              name="colorId"
              value={productDetail.colorId}
              onChange={handleChange}
              className="form_select"
            >
              {colorStore.data?.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.colorName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label> Config ID: </label>
            <select
              name="configId"
              value={productDetail.configId}
              onChange={handleChange}
              className="form_select"
            >
              {configStore.data?.map((config) => (
                <option key={config.id} value={config.id}>
                  {config.configName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Create Product Detail</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductDetail;
