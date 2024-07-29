import apis from "@/apis";
import { StoreType } from "@/store";
import {
  DiscountEvent,
  discounteventAction,
  DiscountEventAdd,
} from "@/store/slices/discountevent.slice";
import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function DiscountEvents() {
  const dispatch = useDispatch();
  const discountEventStore = useSelector(
    (store: StoreType) => store.discountEventStore.events
  );
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [discountAdd, setDiscountAdd] = useState<DiscountEventAdd>({
    name: "",
    endDate: "",
    startDate: "",
    discountPercentage: 0,
  });
  const [discountEdit, setDiscountEdit] = useState<DiscountEvent>({
    id: undefined,
    name: "",
    endDate: "",
    startDate: "",
    discountPercentage: 0,
  });
  const handleClose = () => setShow(false);
  const handleShowAdd = () => {
    setIsEditMode(false);
    setShow(true);
  };
  const handleShowEdit = (discount: DiscountEvent) => {
    setIsEditMode(true);
    setDiscountEdit(discount);
    setShow(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setDiscountEdit({ ...discountEdit, [name]: value });
    } else {
      setDiscountAdd({ ...discountAdd, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      const data = {
        id: discountEdit.id!,
        name: discountEdit.name,
        startDate: discountEdit.startDate,
        endDate: discountEdit.endDate,
        discountPercentage: discountEdit.discountPercentage,
      };
      const res = await apis.discount.updateDiscountEvent(
        discountEdit.id!,
        data
      );
      dispatch(discounteventAction.update(res.data));
    } else {
      const data = {
        name: discountAdd.name,
        startDate: discountAdd.startDate,
        endDate: discountAdd.endDate,
        discountPercentage: discountAdd.discountPercentage,
      };
      const res = await apis.discount.adddiscount(data);
      dispatch(discounteventAction.add(res.data));
      //reset form
      setDiscountAdd({
        name: "",
        endDate: "",
        startDate: "",
        discountPercentage: 0,
      });
      // Handle add logic
    }
    handleClose();
  };

  const handleDelete = async (id: number) => {
    try {
      if (!id) {
        console.error("DiscountEvent ID is missing. Cannot delete.");
        return;
      }
      const res = await apis.discount.deleteDiscountEvent(id);
      console.log("Delete discountEvent response:", res);
      dispatch(discounteventAction.delete(id));
    } catch (error) {
      console.error("Error deleting discountEvent:", error);
    }
  };

  return (
    <>
      <h1>DiscountEvent Manager</h1>
      <Button
        variant="success"
        onClick={handleShowAdd}
        style={{ marginBottom: "10px" }}
      >
        Add DiscountEvent
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>startDate</th>
            <th>endDate</th>
            <th>discountPercentage</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {discountEventStore.map((discount, index) => (
            <tr key={discount?.id}>
              <td>{index + 1}</td>
              <td>{discount?.name}</td>
              <td>{discount?.startDate}</td>
              <td>{discount?.endDate}</td>
              <td>{discount?.discountPercentage}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (discount?.id !== undefined) {
                      handleDelete(discount?.id);
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
                    handleShowEdit(discount); // Pass the entire voucher object
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
            {isEditMode ? "Edit DiscountEvent" : "Add DiscountEvent"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={isEditMode ? discountEdit.name : discountAdd.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={
                  isEditMode ? discountEdit.startDate : discountAdd.startDate
                }
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={isEditMode ? discountEdit.endDate : discountAdd.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDiscountPercentage">
              <Form.Label>Discount Percentage</Form.Label>
              <Form.Control
                type="number"
                name="discountPercentage"
                value={
                  isEditMode
                    ? discountEdit.discountPercentage
                    : discountAdd.discountPercentage
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
