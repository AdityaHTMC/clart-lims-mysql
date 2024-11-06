/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { FaCircleXmark } from "react-icons/fa6";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useOrderContext } from "../helper/OrderProvider";
import { useMasterContext } from "../helper/MasterProvider";

const CreateOrder = () => {
  const {
    allTest,
    getAllTest,
    getCustomerDetail,
    allCustomer,
    test_package,
    getTestPackageList,
    getProfessionalFees,
    professionalFees,
    createNewOrder,
  } = useOrderContext();

  const { getAllTimeList, timeList, getAllPhelboList, allphelboList } =
    useMasterContext();
  const Navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [formData, setFormData] = useState({
    pet: "",
    type: "Home Visit",
    test_package: "",
    images: [],
    payment_mode: "Cash",
    booking_date: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [collectionFees, setCollectionFees] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPhelbo, setSelectedPhelbo] = useState("");

  const handleSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // console.log(selectedCustomer,'selectedCustomer')
  console.log(selectedSlot, "selectedSlot");
  console.log(formData.booking_date, "booking_date");
  console.log(selectedPhelbo, "phelobmist");

  useEffect(() => {
    getAllTest();
    getProfessionalFees();
    getAllTimeList();
    getTestPackageList();
    getAllPhelboList();
  }, []);

  useEffect(() => {
    if (search && search.length > 2) {
      const timeout = setTimeout(() => {
        getCustomerDetail({ keyword_search: search });
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [search]);

  useEffect(() => {
    let amount = 0;
    let amount2 = 0;
    selectedTest.forEach((el) => {
      amount += el.sell_price;

      // If formData.type is 'Home Visit', add collection_fee
      if (formData.type === "Home Visit") {
        amount += el.collection_fee || 0;
        amount2 += el.collection_fee;
      }
    });

    if (formData.test_package) {
      const packageDetail = test_package?.data?.find(
        (el) => el._id?.toString() === formData.test_package
      );
      console.log(packageDetail, "package detail");
      if (packageDetail) {
        amount = amount + packageDetail?.sell_price || 0;
      }
      // If formData.type is 'Home Visit', add collection_fee for the package
      if (formData.type === "Home Visit") {
        amount2 += packageDetail?.total_collection_fees || 0;
      }
    }

    selectedFees.forEach((el) => {
      amount += el.expected_charges;
    });
    setTotalAmount(amount);
    setCollectionFees(amount2);
  }, [selectedTest, formData.test_package, selectedFees, formData.type]);

  console.log(collectionFees, "collection fee");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      pet: "",
      type: "test",
      test_package: "",
      images: [],
      payment_mode: "Cash",
    });
    setSelectedCustomer(null);
    setSelectedTest([]);
    setSelectedFees([]);
    setTotalAmount(0);
  };

  const onTestSelect = (data) => {
    setSelectedTest(data);
    // if (formData.test_package) {
    //   setFormData({ ...formData, test_package: "" });
    // }
  };

  const onPackageSelect = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // if (selectedTest && selectedTest.length > 0) {
    //   setSelectedTest([]);
    // }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log(selectedFiles);
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...selectedFiles], // Append new images
    }));
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value); // Create a Date object from the selected date
    const formattedDate = selectedDate.toISOString(); // Convert to ISO string format

    setFormData((prevData) => ({
      ...prevData,
      booking_date: formattedDate, // Update booking_date in formData
    }));
  };

  const getFormattedDate = (date) => {
    if (!date) return ""; // If no date, return an empty string
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? ""
      : parsedDate.toISOString().split("T")[0]; // Only return the date part
  };

  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index), // Remove image at index
    }));
  };

  const onFeesSelect = (data) => {
    setSelectedFees(data);
  };

  const createOrder = async () => {
    let bodyData = new FormData();

    bodyData.append("userId", selectedCustomer._id);
    bodyData.append("state", selectedCustomer.state);
    bodyData.append("district", selectedCustomer.district);
    bodyData.append("address", selectedCustomer.address);
    bodyData.append("pincode", selectedCustomer.pincode);
    bodyData.append("phlebotomist_id", selectedPhelbo);
    bodyData.append("booking_date", formData.booking_date);
    bodyData.append("collection_type", formData.type);
    bodyData.append("pet_id", formData.pet);
    selectedTest.forEach((el, i) => {
      bodyData.append(`tests[${i}][test]`, el._id);
      bodyData.append(`tests[${i}][price]`, el.sell_price);
    });
    selectedFees?.forEach((el, i) => {
      bodyData.append(`professional_fees[${i}][professional_fee]`, el._id);
      bodyData.append(`professional_fees[${i}][price]`, el.expected_charges);
    });
    if (formData.test_package) {
      const packageDetail = test_package?.data?.find(
        (el) => el._id?.toString() === formData.test_package
      );
      if (packageDetail) {
        bodyData.append("test_package[package_id]", packageDetail._id);
        bodyData.append("test_package[price]", packageDetail.sell_price);
      }
    }
    if (formData.images.length > 0) {
      for (let i = 0; i < formData.images.length; i++) {
        bodyData.append(`prescription`, formData.images[i]);
      }
    }

    bodyData.append("time_slot[start_time]", selectedSlot.start_time);
    bodyData.append("time_slot[end_time]", selectedSlot.end_time);

    bodyData.append("payment_mode", formData.payment_mode);
    bodyData.append("total_amount", totalAmount);
    setIsProcessing(true);
    const res = await createNewOrder(bodyData);
    setIsProcessing(false);
    if (res.status === 200) {
      toast.success(res?.message);
      console.log(res);
      Navigate("/all-orders");
    } else {
      toast.error(res?.message || "An error occured while creating an order");
    }
  };

  return (
    <>
      <CommonBreadcrumb title={"Create Order"} parent="" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <div className="">
                      {selectedCustomer && selectedCustomer._id ? (
                        <>
                          <Label style={{ fontWeight: 600 }}>
                            Selected Customer
                          </Label>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                              <img
                                className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                                src={
                                  selectedCustomer?.image ||
                                  `/assets/images/profile.png`
                                }
                                alt="header-user"
                              />
                              <div>
                                <h5 className="mb-0">
                                  {selectedCustomer.first_name ||
                                    selectedCustomer.name}
                                </h5>
                                <p>{selectedCustomer.mobile}</p>
                              </div>
                            </div>
                            <div>
                              <Badge
                                color="primary"
                                style={{ cursor: "pointer" }}
                                onClick={resetForm}
                              >
                                <FaCircleXmark style={{ fontSize: 18 }} />
                              </Badge>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="position-relative">
                          <form className="searchBx">
                            <Label style={{ fontWeight: 600 }}>
                              Select Customer
                            </Label>
                            <Input
                              onChange={(e) => setSearch(e.target.value)}
                              value={search}
                              type="text"
                              name="search1"
                              placeholder="Search customer ..."
                            />
                            {/* <button>Search</button> */}
                          </form>
                          {search.length > 2 && (
                            <div className="dropdown p-absolute bottom-0 w-100 z-2">
                              <ul
                                className="dropdown-menu show"
                                style={{
                                  maxHeight: "300px",
                                  overflowY: "auto",
                                  width: "100%",
                                }}
                              >
                                {allCustomer.loading && (
                                  <div className="text-center">
                                    <Spinner
                                      animation="border"
                                      variant="primary"
                                    />
                                  </div>
                                )}
                                {!allCustomer.loading &&
                                  allCustomer?.data?.map((customer, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      onClick={() =>
                                        setSelectedCustomer(customer)
                                      }
                                    >
                                      {customer?.first_name || customer?.name}
                                    </li>
                                  ))}

                                {!allCustomer.loading &&
                                  allCustomer?.data?.length === 0 && (
                                    // <li key="no-customer" className="dropdown-item">
                                    <div
                                      className="d-grid gap-2"
                                      style={{ placeItems: "center" }}
                                    >
                                      <p>No Customer found</p>
                                      <p
                                        className=""
                                        style={{
                                          textDecoration: "underline",
                                          fontWeight: 600,
                                          cursor: "pointer",
                                        }}
                                      >
                                        Create New Customer
                                      </p>
                                    </div>
                                    // </li>
                                  )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedCustomer && selectedCustomer?._id && (
                        <div className="mt-3">
                          <FormGroup>
                            <Label
                              for="exampleSelect"
                              style={{ fontWeight: 600 }}
                            >
                              Select Pet :
                            </Label>
                            <Input
                              type="select"
                              value={formData.pet}
                              name="pet"
                              disabled={isProcessing}
                              onChange={onChange}
                            >
                              <option value="">--Select--</option>
                              {selectedCustomer?.pet?.map((el, i) => (
                                <option key={i} value={el._id}>
                                  {el?.breed} ({el.name})
                                </option>
                              ))}
                            </Input>
                          </FormGroup>

                          <FormGroup className="mt-2">
                            <Label
                              for="exampleSelect"
                              style={{ fontWeight: 600 }}
                            >
                              Add Prescription :
                            </Label>
                            <Input
                              type="file"
                              multiple
                              disabled={isProcessing}
                              placeholder="Add prescription"
                              onChange={handleImageChange}
                            />
                          </FormGroup>

                          <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex align-items-center">
                            {/* Radio button for Home Collection */}
                            <Label className="d-block">
                              <Input
                                className="radio_animated"
                                type="radio"
                                name="type"
                                value="Home Visit"
                                onChange={onChange}
                                disabled={isProcessing}
                                checked={formData.type === "Home Visit"}
                              />
                              Home Collection
                            </Label>

                            {/* Radio button for Lab */}
                            <Label className="d-block mx-4">
                              <Input
                                className="radio_animated"
                                type="radio"
                                name="type"
                                value="Lab"
                                onChange={onChange}
                                disabled={isProcessing}
                                checked={formData.type === "Lab"}
                              />
                              Lab
                            </Label>

                            {/* Date Picker */}
                            {/* <Box sx={{ ml: 4, minWidth: 200 }}>
                              <Typography variant="subtitle1" gutterBottom>
                                Booking Date
                              </Typography>
                              <TextField
                                type="date"
                                value={getFormattedDate(formData.booking_date)} // Safely get and format the booking_date
                                onChange={handleDateChange}
                                fullWidth
                              />
                            </Box> */}
                          </FormGroup>
                          <FormGroup className="mt-2">
                            <Label
                              for="exampleSelect"
                              style={{ fontWeight: 600 }}
                            >
                              Booking Date :
                            </Label>
                            <Input
                              type="date"
                              multiple
                              disabled={isProcessing}
                              name="booking_date"
                              value={getFormattedDate(formData.booking_date)} // Safely get and format the booking_date
                              onChange={handleDateChange}
                            />
                          </FormGroup>

                          {formData.booking_date && (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                marginBottom: "20px",
                              }}
                            >
                              <Typography variant="h6" gutterBottom>
                                Choose Time Slots :
                              </Typography>
                              {timeList.data.map((slot, index) => (
                                <Chip
                                  key={index}
                                  label={`${slot.start_time} - ${slot.end_time}`} // Display time range
                                  clickable
                                  color={
                                    selectedSlot === slot
                                      ? "primary"
                                      : "default"
                                  }
                                  onClick={() => handleSelect(slot)} // Use index to select a slot
                                />
                              ))}
                            </Box>
                          )}

                          <FormGroup>
                            <Label
                              for="exampleSelect"
                              style={{ fontWeight: 600 }}
                            >
                              Select Test :
                            </Label>
                            <Autocomplete
                              sx={{ m: 1 }}
                              multiple
                              options={allTest.data || []}
                              getOptionLabel={(option) =>
                                `${option?.test_name} (${option?.sell_price})` ||
                                ""
                              }
                              value={selectedTest}
                              disabled={isProcessing}
                              onChange={(event, newValue) =>
                                onTestSelect(newValue)
                              }
                              disableCloseOnSelect
                              isOptionEqualToValue={(option, value) =>
                                option?._id === value?._id
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Select Test"
                                  placeholder="Select Test"
                                />
                              )}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label
                              for="exampleSelect"
                              style={{ fontWeight: 600 }}
                            >
                              Select Health Package :
                            </Label>
                            <Input
                              type="select"
                              value={formData.test_package}
                              name="test_package"
                              disabled={isProcessing}
                              onChange={(e) => onPackageSelect(e)}
                            >
                              <option value="">--Select--</option>
                              {test_package?.data?.map((el, i) => (
                                <option key={i} value={el._id}>
                                  {el?.package_name} ({el?.sell_price})
                                </option>
                              ))}
                            </Input>
                          </FormGroup>

                          <FormGroup>
                            <Label
                              for="exampleSelect"
                              style={{ fontWeight: 600 }}
                            >
                              Select Professional Fees :
                            </Label>
                            <Autocomplete
                              sx={{ m: 1 }}
                              multiple
                              options={professionalFees?.data || []}
                              getOptionLabel={(option) =>
                                `${option?.name} (${option?.expected_charges})` ||
                                ""
                              }
                              value={selectedFees}
                              onChange={(event, newValue) =>
                                onFeesSelect(newValue)
                              }
                              disableCloseOnSelect
                              disabled={isProcessing}
                              isOptionEqualToValue={(option, value) =>
                                option?._id === value?._id
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Select Professional Fees"
                                  placeholder="Select Professional Fees"
                                />
                              )}
                            />
                          </FormGroup>

                          <FormGroup
                            style={{ ml: 4, minWidth: 200, marginTop: "20px" }}
                          >
                            <Autocomplete
                              options={allphelboList.data} // Assuming allphelboList.data is an array
                              getOptionLabel={(option) => option.name} // Display 'name' from the options
                              onChange={(event, newValue) => {
                                setSelectedPhelbo(newValue ? newValue._id : ""); // Store the entire object
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Phlebotomist"
                                  variant="outlined"
                                  fullWidth
                                />
                              )}
                            />
                          </FormGroup>

                          {totalAmount > 0 && (
                            <>
                              <Label style={{ fontWeight: 600 }}>
                                Payment Mode :
                              </Label>
                              <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                <Label className="d-block">
                                  <Input
                                    className="radio_animated"
                                    type="radio"
                                    name="payment_mode"
                                    value="Cash"
                                    onChange={onChange}
                                    disabled={isProcessing}
                                    checked={formData.payment_mode === "Cash"}
                                  />
                                  CASH
                                </Label>
                                <Label className="d-block mx-4">
                                  <Input
                                    className="radio_animated"
                                    type="radio"
                                    name="payment_mode"
                                    value="UPI"
                                    onChange={onChange}
                                    disabled={isProcessing}
                                    checked={formData.payment_mode === "UPI"}
                                  />
                                  UPI
                                </Label>
                                <Label className="d-block">
                                  <Input
                                    className="radio_animated"
                                    type="radio"
                                    name="payment_mode"
                                    value="Online"
                                    disabled={isProcessing}
                                    onChange={onChange}
                                    checked={formData.payment_mode === "Online"}
                                  />
                                  Pay Online
                                </Label>
                              </FormGroup>
                            </>
                          )}
                        </div>
                      )}

                      <hr className="mt-4" />
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column gap-1">
                          {
                            collectionFees > 0 && (
                              <>
                                <p className="mb-0">
                                  Collection Fees : ₹ {collectionFees}
                                </p>
                                <p className="mb-0" style={{ fontWeight: 600, fontSize: 18 }}>
                                  Total Amount : ₹ {totalAmount}
                                </p>
                              </>
                            )}
                        </div>
                        <Button
                          color="primary"
                          disabled={
                            totalAmount === 0 ||
                            !formData.payment_mode ||
                            !formData.pet ||
                            isProcessing
                          }
                          onClick={createOrder}
                        >
                          {isProcessing ? (
                            <Spinner size="sm" />
                          ) : (
                            "Create Order"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateOrder;
