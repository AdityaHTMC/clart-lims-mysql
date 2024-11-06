/* eslint-disable react/no-unknown-property */
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
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useMasterContext } from "../helper/MasterProvider";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useStockContext } from "../helper/StockManagement";

import { IoCloseSharp } from "react-icons/io5";

import { AiOutlinePlus } from "react-icons/ai";
import { Autocomplete, Pagination, Stack, TextField } from "@mui/material";

const PurchaseList = () => {
  const navigate = useNavigate();

  const {
    getPurchaseList,
    purchaseList,
    getallvendorlist,
    allvendorList,
    addPurchase,
  } = useStockContext();
  const { getAllItemList, allItemList } = useMasterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
    purchaseList?.total && Math.ceil(purchaseList?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getPurchaseList(dataToSend);
    getAllItemList();
    getallvendorlist();
  }, [currentPage]);

  const [formData, setFormData] = useState({
    vendor_id: "",
    stock: [
      {
        item_id: "",
        quantity: "",
        stock_quantity: "",
        amount: "",
      },
    ],
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    item_id: "",
    vendor_id: "",
    quantity: "",
    amount: "",
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
      item_id: "",
      vendor_id: "",
      quantity: "",
      amount: "",
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
    // editVendor(selectedvarity._id, selectedvarity);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      // deletevendor(id);
    }
  };

  // Handle input changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStock = [...formData.stock];

    if (name === "item_id") {
      const selectedItem = allItemList?.data.find((item) => item._id === value);
      if (selectedItem) {
        // Only update item_id and stock_quantity when item is selected
        updatedStock[index] = {
          ...updatedStock[index],
          [name]: value,
          stock_quantity: selectedItem.stock_quantity || "0", // Set stock_quantity from selected item
        };
      }
    } else {
      // Handle changes for quantity and amount
      updatedStock[index][name] = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      stock: updatedStock,
    }));
  };

  const handleVendorChange = (newValue) => {
    // Update vendor_id in formData
    setFormData((prevData) => ({
      ...prevData,
      vendor_id: newValue ? newValue._id : "", // Update vendor_id based on selection
    }));
  };
  // Add new row for stock
  const addStockRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      stock: [
        ...prevData.stock,
        { item_id: "", quantity: "", stock_quantity: "", amount: "" },
      ],
    }));
  };

  // Remove row for stock
  const removeStockRow = (index) => {
    const updatedStock = formData.stock.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      stock: updatedStock,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const formDataToSend = new FormData();

    // Append the fields to FormData
    formDataToSend.append("vendor_id", formData.vendor_id);

    // Append each stock item to FormData
    formData.stock.forEach((item, index) => {
      formDataToSend.append(`stock[${index}][item_id]`, item.item_id);
      formDataToSend.append(`stock[${index}][quantity]`, Number(item.quantity)); 
      formDataToSend.append(`stock[${index}][amount]`, Number(item.amount));
    });

    addPurchase(formDataToSend);
    console.log("Quantity Type:", typeof Number(formData.stock[0].quantity)); // should be 'number'
console.log("Amount Type:", typeof Number(formData.stock[0].amount)); // should be 'number'

    onCloseModal();
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Purchase Management" />
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
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Item Name </th>
                        <th>Vendor Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Show loading spinner */}
                      {purchaseList?.loading ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : purchaseList?.data?.length === 0 ? (
                        // Show "No products found" when there's no data
                        <tr>
                          <td colSpan="7" className="text-center">
                            No purchase-to-stock Found
                          </td>
                        </tr>
                      ) : (
                        purchaseList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.item_name}</td>
                            <td>{product.vendor_name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.amount}</td>
                            <td>
                              {product?.date
                                ? new Date(product.date).toLocaleDateString(
                                    "en-GB"
                                  )
                                : ""}
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

      <Modal isOpen={open} toggle={onCloseModal} className="modal-lg">
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add New Stock
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="row mt-3">
              <FormGroup className="col-md-6">
                <Label for="vendor_id">Choose Vendor</Label>
                <Autocomplete
                  options={allvendorList?.data || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    allvendorList.data?.find(
                      (vendor) => vendor._id === formData.vendor_id
                    ) || null
                  } // Show the selected vendor
                  onChange={(event, newValue) => {
                    handleVendorChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Vendor"
                      variant="outlined"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                />
              </FormGroup>
            </div>
            {formData.stock.map((item, index) => (
              <div className="row" key={index}>
                <FormGroup className="col-md-3">
                  <Label htmlFor={`item_id_${index}`}>Item</Label>
                  <Autocomplete
                    options={allItemList?.data || []}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      handleInputChange(
                        {
                          target: {
                            name: "item_id",
                            value: newValue?._id || "",
                          },
                        },
                        index
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose Item"
                        variant="outlined"
                      />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                  />
                </FormGroup>

                <FormGroup className="col-md-2">
                  <Label htmlFor={`amount_${index}`}>Present Stock</Label>
                  <Input
                    type="text"
                    name="stock_quantity"
                    value={item.stock_quantity}
                    id={`stock_quantity_${index}`}
                    disabled
                  />
                </FormGroup>

                <FormGroup className="col-md-3">
                  <Label htmlFor={`amount_${index}`}>Purchased Quantity</Label>
                  <Input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index)}
                    id={`quantity_${index}`}
                    placeholder="Quantity:"
                  />
                </FormGroup>
                <FormGroup className="col-md-2">
                  <Label htmlFor={`amount_${index}`}>Full Amount</Label>
                  <Input
                    type="number"
                    name="amount"
                    value={item.amount}
                    onChange={(e) => handleInputChange(e, index)}
                    id={`amount_${index}`}
                  />
                </FormGroup>

                <FormGroup className="col-md-2 d-flex align-items-center">
                  {formData.stock.length > 1 && (
                    <Button
                      color="primary"
                      onClick={() => removeStockRow(index)}
                      style={{ padding: "4px 5px", lineHeight: "10px" }}
                    >
                      <IoCloseSharp className="fs-3" />
                    </Button>
                  )}
                </FormGroup>
              </div>
            ))}

            <div align="right">
              <Button
                color="secondary"
                onClick={addStockRow}
                style={{
                  padding: "5px 12px",
                  fontSize: "14px",
                  lineHeight: "18px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <AiOutlinePlus className="fa-2x" />
                &nbsp;<span>Add More</span>
              </Button>
            </div>
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
            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="name" className="col-form-label">
                  Name:
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={selectedvarity.name}
                  onChange={handleInputChanges}
                  id="name"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="contact_person" className="col-form-label">
                  Contact Person:
                </Label>
                <Input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleInputChange}
                  id="contact_person"
                />
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="email" className="col-form-label">
                  Email:
                </Label>
                <Input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  id="email"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="mobile" className="col-form-label">
                  Mobile:
                </Label>
                <Input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  id="mobile"
                />
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="address" className="col-form-label">
                  Address:
                </Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  id="address"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="state" className="col-form-label">
                  State:
                </Label>
                <Input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  id="state"
                />
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="district" className="col-form-label">
                  District:
                </Label>
                <Input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  id="district"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="pincode" className="col-form-label">
                  Pincode:
                </Label>
                <Input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  id="pincode"
                />
              </FormGroup>
            </div>
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

export default PurchaseList;
