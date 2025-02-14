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
    order_id: "",
    invoice_number: "",
    date: "",
    challan_date: "",
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

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({
      vendor_id: "",
      order_id: "",
      invoice_number: "",
      challan_date: "",
      date: "",
      stock: [
        {
          item_id: "",
          quantity: "",
          stock_quantity: "",
          amount: "",
        },
      ],
    })
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the input
    if (!value) return; // Avoid updating with an invalid value
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: new Date(value).toISOString(), // Ensure date is in ISO format
    }));
  };
  

  const getFormattedDate = (date) => {
    if (!date) return ""; // If no date, return an empty string
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? ""
      : parsedDate.toISOString().split("T")[0]; // Return the date in YYYY-MM-DD format
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  // Handle input changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStock = [...formData.stock];

    if (name === "item_id") {
      const selectedItem = allItemList?.data.find((item) => item.id === value);
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
      vendor_id: newValue ? newValue.id : "", // Update vendor_id based on selection
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
    formDataToSend.append("order_id", formData.order_id);
    formDataToSend.append("invoice_number", formData.invoice_number);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("challan_date", formData.challan_date);
    // Append each stock item to FormData
    formData.stock.forEach((item, index) => {
      formDataToSend.append(`stock[${index}][item_id]`, item.item_id);
      formDataToSend.append(`stock[${index}][quantity]`, Number(item.quantity));
      formDataToSend.append(`stock[${index}][amount]`, Number(item.amount));
    });

    addPurchase(formDataToSend);

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
                            <td>{product?.item_name}</td>
                            <td>{product?.vendor_name}</td>
                            <td>{product?.quantity}</td>
                            <td>{product?.amount}</td>
                            <td>
                              {product?.date
                                ? new Date(product?.date).toLocaleDateString(
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
        <ModalBody style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <Form>
            <div className="row mt-3">
              <FormGroup className="col-md-6">
                <Label for="vendor_id">Choose Vendor</Label>
                <Autocomplete
                  options={allvendorList?.data || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    allvendorList.data?.find(
                      (vendor) => vendor.id === formData.vendor_id
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
                    option.id === value.id
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label htmlFor="order_id" className="col-form-label">
                  Order ID :
                </Label>
                <Input
                  type="text"
                  name="order_id"
                  value={formData.order_id}
                  onChange={handleChange}
                  id="order_id"
                />
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="invoice_number" className="col-form-label">
                  Invoice Number :
                </Label>
                <Input
                  type="text"
                  name="invoice_number"
                  value={formData.invoice_number}
                  onChange={handleChange}
                  id="invoice_number"
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label for="date" className="fw-bold">
                  Invoice Date
                </Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={getFormattedDate(formData.date)}
                  onChange={handleDateChange}
                />
              </FormGroup>
            </div>

            <div className="row">
            <FormGroup className="col-md-6">
                <Label for="challan_date" className="fw-bold">
                  Challan Date
                </Label>
                <Input
                  type="date"
                  id="challan_date"
                  name="challan_date"
                  className="form-control"
                  value={getFormattedDate(formData.challan_date)}
                  onChange={handleDateChange}
                />
              </FormGroup>
            </div>

            {formData.stock.map((item, index) => (
              <div
                className="row align-items-center mb-3 p-3 border rounded"
                key={index}
                style={{ backgroundColor: "#f8f9fa" }}
              >
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
                            value: newValue?.id || "",
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
                      option.id === value.id
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
                    min={0}
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
                    min={0}
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
    </>
  );
};

export default PurchaseList;
