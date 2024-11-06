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
import { TiDeleteOutline } from "react-icons/ti";

import { useNavigate } from "react-router-dom";

import { Spinner } from "reactstrap";
import "react-quill/dist/quill.snow.css";
import { useMasterContext } from "../helper/MasterProvider";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useStockContext } from "../helper/StockManagement";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { useCategoryContext } from "../helper/CategoryProvider";
import { Autocomplete, TextField } from "@mui/material";
const StockReport = () => {
  const navigate = useNavigate();
  const {
    getPurchaseList,
    purchaseList,
    getallvendorlist,
    allvendorList,
    addPurchase,addStockissue, getStockReportList ,srList
  } = useStockContext();
  const { getAllItemList, allItemList } = useMasterContext();

  const {
    getAllUnit,
    unitDropdown,
    labDropdown,
    getAllLabs,
    getAllCollection,
    collectionDropdown,
    getAllphlebotomist,
    phlebotomistList,
  } = useCategoryContext();

  useEffect(() => {
    getPurchaseList();
    getAllItemList();
    getallvendorlist();
    getStockReportList()
  }, []);

  const [selectedOption, setSelectedOption] = useState(""); // For storing which radio is selected
  const [dropdownData, setDropdownData] = useState([]); // For storing dropdown data
  const [selectedStockIssue, setSelectedStockIssue] = useState(""); // For storing the selected dropdown value

  // Handle radio button change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Set the selected radio button option
  };

  // Fetch data when the selected option changes
  useEffect(() => {
    const fetchData = async () => {
      if (selectedOption === "unit") {
        await getAllUnit(); // Fetch unit data
      } else if (selectedOption === "lab") {
        await getAllLabs(); // Fetch lab data
      } else if (selectedOption === "collection") {
        await getAllCollection(); // Fetch collection data
      } else if (selectedOption === "phlebotomist") {
        await getAllphlebotomist(); // Fetch phlebotomist data
      }
    };

    if (selectedOption) {
      fetchData(); // Fetch the appropriate data only if a radio button is selected
    }
  }, [selectedOption]);

  // Use another useEffect to update dropdown data when context values change
  useEffect(() => {
    if (selectedOption === "unit") {
      setDropdownData(unitDropdown); // Set dropdown data when unitDropdown updates
    } else if (selectedOption === "lab") {
      setDropdownData(labDropdown); // Set dropdown data when labDropdown updates
    } else if (selectedOption === "collection") {
      setDropdownData(collectionDropdown); // Set dropdown data when collectionDropdown updates
    } else if (selectedOption === "phlebotomist") {
      setDropdownData(phlebotomistList); // Set dropdown data when phlebotomistList updates
    }
  }, [
    selectedOption,
    unitDropdown,
    labDropdown,
    collectionDropdown,
    phlebotomistList,
  ]);

  // Handle dropdown change to store selected value
  const handleStockIssueChange = (e) => {
    setSelectedStockIssue(e.target.value);
  };

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

  const onOpenModal = () => {
    setOpen(true);
  };

  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedvarity({
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
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({
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

  const handleVendorChange = (e) => {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      vendor_id: value, // Update vendor_id directly
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

    if (selectedOption === "unit") {
      formDataToSend.append("issued_to_unit", selectedStockIssue);
    } else if (selectedOption === "lab") {
      formDataToSend.append("issued_to_lab", selectedStockIssue);
    } else if (selectedOption === "collection") {
      formDataToSend.append("issued_to_collection_center", selectedStockIssue);
    } else if (selectedOption === "phlebotomist") {
      formDataToSend.append("issued_to_phlebotomist", selectedStockIssue);
    }

    // Append each stock item to FormData
    formData.stock.forEach((item, index) => {
      formDataToSend.append(`stock[${index}][item_id]`, item.item_id);
      formDataToSend.append(`stock[${index}][quantity]`, item.quantity);
      formDataToSend.append(`stock[${index}][amount]`, item.amount);
    });

    addStockissue(formDataToSend);
    onCloseModal();
  };

  return (
    <>
      <CommonBreadcrumb title="Stock Report" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Stock issue
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
                        <th>Used Quantity</th>
                        <th>Purchased Quantity</th>
                        <th>Amount</th>
                        <th>Issued_to</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Show loading spinner */}
                      {srList?.loading ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : srList?.data?.length === 0 ? (
                        // Show "No products found" when there's no data
                        <tr>
                          <td colSpan="7" className="text-center">
                            No purchase-to-stock Found
                          </td>
                        </tr>
                      ) : (
                        srList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.item_name}</td>
                            <td>{product.vendor_name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.used_quantity}</td>
                            <td>{product.purchased_quantity}</td>
                            <td>{product.amount}</td>
                            <td>{product.issued_to}</td>
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
            Add Stock Issue
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="form-group mb-4">
              <Label>Select Stock Issue To</Label>
              <div style={{ display: "flex", gap: "20px", padding: "10px 0" }}>
                <Label check style={{ marginRight: "10px" }}>
                  <Input
                    type="radio"
                    value="unit"
                    checked={selectedOption === "unit"}
                    onChange={handleOptionChange}
                  />{" "}
                  Unit
                </Label>
                <Label check style={{ marginRight: "10px" }}>
                  <Input
                    type="radio"
                    value="lab"
                    checked={selectedOption === "lab"}
                    onChange={handleOptionChange}
                  />{" "}
                  Lab
                </Label>
                <Label check style={{ marginRight: "10px" }}>
                  <Input
                    type="radio"
                    value="collection"
                    checked={selectedOption === "collection"}
                    onChange={handleOptionChange}
                  />{" "}
                  Collection Center
                </Label>
                <Label check>
                  <Input
                    type="radio"
                    value="phlebotomist"
                    checked={selectedOption === "phlebotomist"}
                    onChange={handleOptionChange}
                  />{" "}
                  Phlebotomist
                </Label>
              </div>
            </div>

            {/* Stock Issue dropdown, rendered conditionally */}
            {selectedOption && (
              <FormGroup>
                <Label htmlFor="stockIssueDropdown">Stock Issue</Label>
                <Input
                  type="select"
                  id="stockIssueDropdown"
                  value={selectedStockIssue}
                  onChange={handleStockIssueChange}
                >
                  <option value="">Select Stock Issue</option>
                  {dropdownData?.data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {/* Display organization_name for Unit, Lab, and Collection Center */}
                      {selectedOption === "unit" ||
                      selectedOption === "lab" ||
                      selectedOption === "collection"
                        ? item.organization_name
                        : item.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}

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
                  <Label htmlFor={`amount_${index}`}>Stock Quantity</Label>
                  <Input
                    type="text"
                    name="stock_quantity"
                    value={item.stock_quantity}
                    id={`stock_quantity_${index}`}
                    disabled
                  />
                </FormGroup>

                <FormGroup className="col-md-2">
                  <Label htmlFor={`amount_${index}`}>Quantity</Label>
                  <Input
                    type="text"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index)}
                    id={`quantity_${index}`}
                  />
                </FormGroup>
                <FormGroup className="col-md-2">
                  <Label htmlFor={`amount_${index}`}>Amount</Label>
                  <Input
                    type="text"
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

export default StockReport;
