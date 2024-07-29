import apis from "@/apis";
import { StoreType } from "@/store";
import {
  Voucher,
  voucherAction,
  VoucherUpdate,
} from "@/store/slices/voucher.slice";
import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function VoucherManager() {
  const dispatch = useDispatch();
  const voucher = useSelector(
    (state: StoreType) => state.voucherStore.vouchers
  );
  const [voucherEdit, setVoucherEdit] = useState<Voucher>({
    id: 0,
    code: "",
    discountAmount: 0,
    expirationDate: "",
  });
  const [voucherAdd, setVoucherAdd] = useState<VoucherUpdate>({
    code: "",
    discountAmount: 0,
    expirationDate: "",
  });
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClose = () => setShow(false);
  const handleShowAdd = () => {
    setIsEditMode(false);
    setShow(true);
  };
  const handleShowEdit = (voucher: Voucher) => {
     if (!voucher.id) {
       console.error("Voucher ID is missing. Cannot edit.");
       return;
     }
    setVoucherEdit(voucher);
    setIsEditMode(true);
    setShow(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setVoucherEdit({
        ...voucherEdit,
        [name]: name === "discountAmount" ? Number(value) : value,
      });
    } else {
      setVoucherAdd({
        ...voucherAdd,
        [name]: name === "discountAmount" ? Number(value) : value,
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const data = {
          id: voucherEdit.id,
          code: voucherEdit.code,
          discountAmount: voucherEdit.discountAmount,
          expirationDate: voucherEdit.expirationDate,
        };
        if (voucherEdit.id !== undefined) {
          console.log("Voucher ID:", voucherEdit.id);
          const res = await apis.voucher.updateVoucher(voucherEdit.id, data);
          dispatch(voucherAction.update(res.data));
        } else {
          console.error("Voucher ID is undefined");
        }
      } else {
        const data = {
          code: voucherAdd.code,
          discountAmount: voucherAdd.discountAmount,
          expirationDate: voucherAdd.expirationDate,
        };
        const res = await apis.voucher.addVoucher(data);
        dispatch(voucherAction.add(res.data));
        //reset form
        setVoucherAdd({
          code: "",
          discountAmount: 0,
          expirationDate: "",
        });
      }
    } catch (error) {
      console.error(`Failed to ${isEditMode ? "edit" : "add"} voucher:`, error);
    }

    handleClose();
  };
  const handleDelete = async (id: number) => {
    try {
      const res = await apis.voucher.deleteVoucher(id);
      console.log(res);
      dispatch(voucherAction.delete(id));
    } catch (error) {
      console.error("Failed to delete voucher:", error);
    }
  };

  return (
    <>
      <h1>Voucher Manager</h1>
      <Button
        variant="success"
        onClick={handleShowAdd}
        style={{ marginBottom: "10px" }}
      >
        Add Voucher
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>VoucherCode</th>
            <th>DiscountAmount</th>
            <th>ExpiryDate</th>
            <th>Status</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {voucher.map((voucher, index) => (
            <tr key={voucher.id}>
              <td>{index + 1}</td>
              <td>{voucher.code}</td>
              <td>{voucher.discountAmount}</td>
              <td>{voucher.expirationDate}</td>
              <td>{voucher.used ? "Đã sử dụng" : "Chưa sử dụng"}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (voucher.id !== undefined) {
                      handleDelete(voucher.id);
                    } else {
                      console.error("Voucher ID is undefined");
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleShowEdit(voucher); // Pass the entire voucher object
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Voucher" : "Add Voucher"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCode">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={isEditMode ? voucherEdit.code : voucherAdd.code}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDiscountAmount">
              <Form.Label>Discount Amount</Form.Label>
              <Form.Control
                type="number"
                name="discountAmount"
                value={
                  isEditMode
                    ? voucherEdit.discountAmount
                    : voucherAdd.discountAmount
                }
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formExpirationDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="date"
                name="expirationDate"
                value={
                  isEditMode
                    ? voucherEdit.expirationDate
                    : voucherAdd.expirationDate
                }
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditMode ? "Save Changes" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
