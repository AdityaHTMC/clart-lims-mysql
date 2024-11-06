/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaEdit, FaHistory } from "react-icons/fa";

import { FaTrashAlt } from "react-icons/fa";

import { Spinner } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMasterContext } from "../helper/MasterProvider";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useStockContext } from "../helper/StockManagement";
import { Pagination, Stack } from "@mui/material";

const ItemManagement = () => {
  const navigate = useNavigate();

  const {
    getItemGrList,
    itemgroup,
    getIMList,
    addIM,
    imList,
    editIM,
    deleteIMList,
  } = useStockContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
  imList?.total && Math.ceil(imList?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getItemGrList();
    getIMList(dataToSend);
  }, [currentPage]);



  const [formData, setFormData] = useState({
    name: "",
    item_group: "",
    amount: "",
    low_quantity_alert: "",
    stock_quantity: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    name: "",
    item_group: "",
    amount: "",
    low_quantity_alert: "",
    stock_quantity: "",
  });

  const onOpenModal = () => {
    setOpen(true);
  };
  const onOpenModal2 = (product) => {
    setSelectedvarity(product);
    setModalOpen(true);
  };

  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedvarity({
      name: "",
      item_group: "",
      amount: "",
      low_quantity_alert: "",
      stock_quantity: "",
      _id: "",
    });
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  // Handle form input change
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setSelectedvarity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle submit for updating the brand
  const handleSubmits = () => {
    editIM(selectedvarity._id, selectedvarity);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      deleteIMList(id);
    }
  };
  const handlehistory = (id) => {
   navigate(`/stock-history/${id}`)
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    addIM(formData);
    onCloseModal();
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Item Management" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Group Name</th>
                        <th>Amount</th>
                        <th>Stock Quantity</th>
                        <th>Low Quantity alert</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {imList?.loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : imList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        imList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product?.name}</td>
                            <td>{product?.item_group_name}</td>
                            <td>{product?.amount}</td>
                            <td>{product?.stock_quantity}</td>
                            <td>{product?.low_quantity_alert}</td>
                            <td>
                              <div className="circelBtnBx">
                                <Button
                                  className="btn"
                                  color="link"
                                  id={`editTooltip-${product._id}`}
                                >
                                  <FaEdit
                                    onClick={() => onOpenModal2(product)}
                                  />
                                </Button>
                                <UncontrolledTooltip
                                  target={`editTooltip-${product._id}`}
                                >
                                  Edit
                                </UncontrolledTooltip>

                                <Button
                                  className="btn"
                                  color="link"
                                  id={`deleteTooltip-${product._id}`}
                                >
                                  <FaTrashAlt
                                    onClick={() => handleDelete(product._id)}
                                  />
                                </Button>
                                <UncontrolledTooltip
                                  target={`deleteTooltip-${product._id}`}
                                >
                                  Delete
                                </UncontrolledTooltip>

                                <Button
                                  className="btn"
                                  color="link"
                                  id={`historyTooltip-${product._id}`}
                                >
                                  <FaHistory onClick={() => handlehistory(product._id)} />
                                </Button>
                                <UncontrolledTooltip
                                  target={`historyTooltip-${product._id}`}
                                >
                                  Stock History
                                </UncontrolledTooltip>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                    <Stack className="rightPagination mt10" spacing={2}>
                      <Pagination
                        color="primary"
                        count={totalPages}
                        page={currentPage}
                        shape="rounded"
                        onChange={(event, value) => handlepagechange(value)}
                      />
                    </Stack>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        isOpen={open}
        toggle={onCloseModal}
        className="modal-lg" // Increases the width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Item
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="name" className="col-form-label">
                  Name :
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  id="name"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="amount" className="col-form-label">
                  Amount :
                </Label>
                <Input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  id="amount"
                />
              </FormGroup>
            </div>
            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="low_quantity_alert" className="col-form-label">
                  Low Quantity Alert :
                </Label>
                <Input
                  type="text"
                  name="low_quantity_alert"
                  value={formData.low_quantity_alert}
                  onChange={handleInputChange}
                  id="low_quantity_alert"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="stock_quantity" className="col-form-label">
                  Stock Quantity :
                </Label>
                <Input
                  type="text"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleInputChange}
                  id="stock_quantity"
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Label htmlFor="item_group" className="col-form-label">
                Item Group:
              </Label>
              <Input
                type="select"
                name="item_group"
                value={formData.item_group}
                onChange={handleInputChange}
                id="item_group"
              >
                <option value="">Select Item Group</option>
                {itemgroup.data.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.title}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={modalOpen}
        toggle={onCloseModal2}
        className="modal-lg"
        style={{ maxWidth: "800px" }}
      >
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Unit
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
          <Form>
            {/* <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Unit:
              </Label>
              <Input
                type="text"
                name="title"
                value={selectedvarity.title}
                onChange={handleInputChanges}
                id="title"
              />
            </FormGroup> */}
            <FormGroup>
              <Label htmlFor="name" className="col-form-label">
                Name :
              </Label>
              <Input
                type="text"
                name="name"
                value={selectedvarity.name}
                onChange={handleInputChanges}
                id="name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="amount" className="col-form-label">
                Amount :
              </Label>
              <Input
                type="text"
                name="amount"
                value={selectedvarity.amount}
                onChange={handleInputChanges}
                id="amount"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="low_quantity_alert" className="col-form-label">
                low_quantity_alert :
              </Label>
              <Input
                type="text"
                name="low_quantity_alert"
                value={selectedvarity.low_quantity_alert}
                onChange={handleInputChanges}
                id="low_quantity_alert"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="item_group" className="col-form-label">
                Item Group:
              </Label>
              <Input
                type="select"
                name="item_group"
                value={selectedvarity.item_group}
                onChange={handleInputChanges}
                id="item_group"
              >
                <option value="">Select Item Group</option>
                {itemgroup.data.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.title}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmits}>
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal2}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ItemManagement;
