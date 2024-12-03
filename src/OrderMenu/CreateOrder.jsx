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
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { FaCircleXmark } from "react-icons/fa6";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useOrderContext } from "../helper/OrderProvider";
import { useMasterContext } from "../helper/MasterProvider";
import { useCategoryContext } from "../helper/CategoryProvider";
import profileImg from "../../src/assets/profile.png";


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

  const {
    getAllTimeList,
    timeList,
    getAllPhelboList,
    allphelboList,
    getCustomerPetList,
    petList,
    getZonePrice,
    zoneprice,
    getallSahcList,
    allsahcList,
    getSahcwiseDoc,
    sahcDoc,
  } = useMasterContext();
  const { getAllLabs, labDropdown } = useCategoryContext();
  const Navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLab, setSelectedLab] = useState("");
  const [selectedsahc, setSelectedsahc] = useState("");
  const [selectedDoc, setSelectedDoc] = useState("");
  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [formData, setFormData] = useState({
    pet: "",
    type: "Home Visit",
    test_package: "",
    images: [],
    payment_mode: "Cash",
    booking_date: "",
    referred_from: "",
    other_doctor: "",
  });

  console.log(selectedCustomer, "selectedCustomer ");

  console.log(selectedPackages, "selectedPackages ");

  const [totalAmount, setTotalAmount] = useState(0);
  const [collectionFees, setCollectionFees] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPhelbo, setSelectedPhelbo] = useState("");

  const handleSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // console.log(selectedSlot, "selectedSlot");
  // console.log(formData.booking_date, "booking_date");
  // console.log(selectedPhelbo, "phelobmist");

  useEffect(() => {
    if (selectedCustomer) {
      getCustomerPetList(selectedCustomer.id);
      getZonePrice(selectedCustomer.pincode);
      getallSahcList();
    }
    if (formData.booking_date) {
      getAllTimeList(formData.booking_date);
    }
  }, [selectedCustomer, formData.booking_date]);

  useEffect(() => {
    getAllTest();
    getProfessionalFees();
    getTestPackageList();
    getAllPhelboList();
    getAllLabs();
  }, []);

  useEffect(() => {
    if (selectedsahc) {
      getSahcwiseDoc(selectedsahc);
    }
  }, [selectedsahc]);

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
  
    // Calculate the total sell_price of selected tests
    selectedTest.forEach((el) => {
      amount += el.sell_price;
    });
  
    // Calculate the total sell_price of selected packages
    selectedPackages.forEach((packageDetail) => {
      amount += packageDetail.sell_price;
    });
  
    // Add charges from selectedFees
    selectedFees.forEach((el) => {
      amount += el.expected_charges;
    });
  
    setTotalAmount(amount);
  }, [selectedTest, selectedPackages, selectedFees, formData.type]);
  

  useEffect(() => {
    if (formData.type === "Home Visit") {
      setCollectionFees(zoneprice?.data?.charge || 350);
    } else {
      setCollectionFees(0);
    }
  }, [formData.type, zoneprice]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const resetForm = () => {
    setFormData({
      pet: "",
      type: "test",
      test_package: "",
      images: [],
      payment_mode: "Cash",
      booking_date: "",
    });
    setSelectedCustomer(null);
    setSelectedTest([]);
    setSelectedFees([]);
    setTotalAmount(0);
  };

  const onTestSelect = (data) => {
    setSelectedTest(data);
  };

  const onPackageSelect = (data) => {
    setSelectedPackages(data);
  };

  const handleLabSelect = (lab) => {
    setSelectedLab(lab);
  };

  const handleSahcSelect = (sahc) => {
    setSelectedsahc(sahc);
    setSelectedDoc("");
  };

  const handleDocSelect = (doc) => {
    setSelectedDoc(doc);
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
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toISOString();

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

    bodyData.append("user_id", selectedCustomer.id);
    bodyData.append("state", selectedCustomer.state || '');
    bodyData.append("district", selectedCustomer.district || '');
    bodyData.append("address", selectedCustomer.address || '');
    bodyData.append("lab_id", selectedLab || '');
    bodyData.append("pincode", selectedCustomer.pincode || '');
    if (selectedPhelbo) {
      bodyData.append("phlebotomist_id", selectedPhelbo.id || '');
    }
    bodyData.append("booking_date", formData.booking_date || '');
    bodyData.append("collection_type", formData.type || '');
    bodyData.append("pet_id", formData.pet);
    selectedTest.forEach((el, i) => {
      bodyData.append(`tests[${i}][test]`, el.id);
      bodyData.append(`tests[${i}][price]`, el.sell_price);
    });
    selectedPackages.forEach((el, i) => {
      bodyData.append(`packages[${i}][package]`, el._id);
      bodyData.append(`packages[${i}][price]`, el.sell_price);
    });
    selectedFees?.forEach((el, i) => {
      bodyData.append(`professional_fees[${i}][professional_fee]`, el.id);
      bodyData.append(`professional_fees[${i}][price]`, el.expected_charges);
    });

    // if (formData.test_package) {
    //   bodyData.append("package_id", parseInt(test_package.data[0]._id, 10));
    // }

    if (formData.images.length > 0) {
      formData.images.forEach((image, index) => {
        bodyData.append(`prescription[${index}]`, image);
      });
    }
    bodyData.append("other_doctor ", formData.other_doctor || '');
    bodyData.append("doctor_id", selectedDoc || '');
    bodyData.append("referred_from ", formData.referred_from || '');
    bodyData.append("start_time", selectedSlot.start_time);
    bodyData.append("end_time", selectedSlot.end_time || "");

    bodyData.append("payment_mode", formData.payment_mode);
    bodyData.append("total_amount", totalAmount + collectionFees);
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
                      {selectedCustomer && selectedCustomer.id ? (
                        <>
                          <Label style={{ fontWeight: 600 }}>
                            Selected Customer
                          </Label>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                              <img
                                className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                                src={selectedCustomer?.image || profileImg}
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
                              Search & Select Customer
                            </Label>
                            <Input
                              onChange={(e) => setSearch(e.target.value)}
                              value={search}
                              type="text"
                              name="search1"
                              placeholder="Search customer by mobile number or name"
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
                                      <Link
                                        className=""
                                        style={{
                                          textDecoration: "underline",
                                          fontWeight: 600,
                                          cursor: "pointer",
                                        }}
                                        to="/add-customer"
                                      >
                                        Create New Customer
                                      </Link>
                                    </div>
                                    // </li>
                                  )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedCustomer &&
                        selectedCustomer?.id &&
                        petList?.data?.length > 0 && (
                          <div className="mt-4">
                            <FormGroup>
                              <Label for="selectPet" className="fw-bold">
                                Select Pet
                              </Label>
                              <Input
                                type="select"
                                value={formData.pet}
                                name="pet"
                                id="selectPet"
                                className="form-select"
                                disabled={isProcessing}
                                onChange={onChange}
                              >
                                <option value="">--Select--</option>
                                {petList?.data?.map((el, i) => (
                                  <option key={i} value={el.id}>
                                    {el?.breed} ({el.name})
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                            <FormGroup className="mt-3">
                              <Label for="prescription" className="fw-bold">
                                Add Prescription
                              </Label>
                              <Input
                                type="file"
                                id="prescription"
                                multiple
                                disabled={isProcessing}
                                onChange={handleImageChange}
                              />
                            </FormGroup>
                            <FormGroup className="mt-4 d-flex align-items-center">
                              <Label className="me-3 fw-bold">
                                Collection Type
                              </Label>
                              <div className="form-check me-4">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="type"
                                  value="Home Visit"
                                  onChange={onChange}
                                  disabled={isProcessing}
                                  checked={formData.type === "Home Visit"}
                                />
                                <Label className="form-check-label">
                                  Home Collection
                                </Label>
                              </div>
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="type"
                                  value="Lab"
                                  onChange={onChange}
                                  disabled={isProcessing}
                                  checked={formData.type === "Lab"}
                                />
                                <Label className="form-check-label">Lab</Label>
                              </div>
                            </FormGroup>
                            {formData.type === "Lab" && (
                              <FormGroup className="mt-3">
                                <Label for="labSelect" className="fw-bold">
                                  Select Lab
                                </Label>
                                <Input
                                  type="select"
                                  id="labSelect"
                                  name="lab"
                                  className="form-select"
                                  value={selectedLab || ""}
                                  onChange={(e) =>
                                    handleLabSelect(e.target.value)
                                  }
                                >
                                  <option value="" disabled>
                                    Select Lab
                                  </option>
                                  {labDropdown.data.map((lab) => (
                                    <option key={lab.id} value={lab.id}>
                                      {lab.organization_name}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            )}
                            <FormGroup className="mt-4 d-flex align-items-center">
                              <Label className="me-3 fw-bold">
                                Referred Type
                              </Label>
                              <div className="form-check me-4">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="referred_from" // Make sure the name matches
                                  value="self"
                                  onChange={onChange}
                                  disabled={isProcessing}
                                  checked={formData.referred_from === "self"}
                                />
                                <Label className="form-check-label">Self</Label>
                              </div>
                              <div className="form-check me-4">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="referred_from" 
                                  value="doctor"
                                  onChange={onChange}
                                  disabled={isProcessing}
                                  checked={formData.referred_from === "doctor"}
                                />
                                <Label className="form-check-label">
                                  Doctor
                                </Label>
                              </div>
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="referred_from" 
                                  value="other"
                                  onChange={onChange}
                                  disabled={isProcessing}
                                  checked={formData.referred_from === "other"}
                                />
                                <Label className="form-check-label">
                                  other
                                </Label>
                              </div>
                            </FormGroup>
                           
                           {
                            formData.referred_from === "other" && (
                              <FormGroup>
                              <Label htmlFor="other_doctor" className="col-form-label">
                               Doctor Name
                              </Label>
                              <Input
                                type="text"
                                name="other_doctor"
                                placeholder="Type The Doctor Name"
                                value={formData.other_doctor}
                                onChange={onChange}
                                id="other_doctor"
                              />
                            </FormGroup>
                            )
                           }


                            {formData.referred_from === "doctor" && (
                              <FormGroup className="mt-3">
                                <Label for="sahc" className="fw-bold">
                                  Select Govt. Collection Center
                                </Label>
                                <Input
                                  type="select"
                                  id="sahc"
                                  name="sahc"
                                  className="form-select"
                                  value={selectedsahc || ""}
                                  onChange={(e) =>
                                    handleSahcSelect(e.target.value)
                                  }
                                >
                                  <option value="" disabled>
                                    Select  Govt. Collection Center
                                  </option>
                                  {allsahcList?.data?.map((sahc) => (
                                    <option key={sahc.id} value={sahc.id}>
                                      {sahc.name}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            )}
                            {selectedsahc &&
                              formData.referred_from === "doctor" && (
                                <FormGroup className="mt-3">
                                  <Label for="doctor" className="fw-bold">
                                    Select Doctor
                                  </Label>
                                  <Input
                                    type="select"
                                    id="doctor"
                                    name="doctor"
                                    className="form-select"
                                    value={selectedDoc || ""}
                                    onChange={(e) =>
                                      handleDocSelect(e.target.value)
                                    }
                                  >
                                    <option value="" disabled>
                                      Select Doctor
                                    </option>
                                    {sahcDoc.data.map((doctor) => (
                                      <option key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                      </option>
                                    ))}
                                  </Input>
                                </FormGroup>
                              )}
                            <FormGroup className="mt-3">
                              <Label for="bookingDate" className="fw-bold">
                                Booking Date
                              </Label>
                              <Input
                                type="date"
                                id="bookingDate"
                                name="booking_date"
                                className="form-control"
                                disabled={isProcessing}
                                value={getFormattedDate(formData.booking_date)}
                                onChange={handleDateChange}
                              />
                            </FormGroup>
                            {formData.booking_date && (
                              <div className="mt-3">
                                <h6>Choose Time Slots</h6>
                                <div className="d-flex flex-wrap gap-2">
                                  {timeList.data.map((slot, index) => (
                                    <Chip
                                      key={index}
                                      label={`${slot.start_time} - ${slot.end_time}`}
                                      clickable
                                      color={
                                        selectedSlot === slot
                                          ? "primary"
                                          : "default"
                                      }
                                      onClick={() => handleSelect(slot)}
                                      className="p-2 border rounded"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                            <FormGroup className="mt-3">
                              <Label for="selectTest" className="fw-bold">
                                Select Test
                              </Label>
                              <Autocomplete
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
                            {/* <FormGroup className="mt-3">
                              <Label for="selectPackage" className="fw-bold">
                                Select Health Package
                              </Label>
                              <Input
                                type="select"
                                value={formData.test_package}
                                name="test_package"
                                className="form-select"
                                disabled={isProcessing}
                                onChange={(e) => onPackageSelect(e)}
                              >
                                <option value="">--Select--</option>
                                {test_package?.data?.map((el, i) => (
                                  <option key={i} value={el.id}>
                                    {el?.package_name} ({el?.sell_price})
                                  </option>
                                ))}
                              </Input>
                            </FormGroup> */}
                            <FormGroup className="mt-3">
                              <Label for="selectPackage" className="fw-bold">
                                Select Health Package
                              </Label>
                              <Autocomplete
                                multiple
                                options={test_package?.data || []}
                                getOptionLabel={(option) =>
                                  `${option?.package_name} (${option?.sell_price})` ||
                                  ""
                                }
                                value={selectedPackages}
                                disabled={isProcessing}
                                onChange={(event, newValue) =>
                                  onPackageSelect(newValue)
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select Health Package"
                                    placeholder="Select Health Package"
                                  />
                                )}
                              />
                            </FormGroup>
                            
                            <FormGroup className="mt-3">
                              <Label for="selectFees" className="fw-bold">
                                Select Professional Fees
                              </Label>
                              <Autocomplete
                                multiple
                                options={professionalFees?.data || []}
                                getOptionLabel={(option) =>
                                  `${option?.name} (${option?.expected_charges})` ||
                                  ""
                                }
                                value={selectedFees}
                                disabled={isProcessing}
                                onChange={(event, newValue) =>
                                  onFeesSelect(newValue)
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
                            <FormGroup className="mt-3">
                              <Autocomplete
                                options={allphelboList.data}
                                getOptionLabel={(option) => option.name || ""}
                                value={selectedPhelbo || null} // Ensure value is null if not selected
                                onChange={(event, newValue) =>
                                  setSelectedPhelbo(newValue)
                                }
                                isOptionEqualToValue={
                                  (option, value) => option.id === value?.id // Safely handle null/undefined value
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select Phlebotomist"
                                    placeholder="Select Phlebotomist" // Add placeholder
                                    variant="outlined"
                                    fullWidth
                                  />
                                )}
                              />
                            </FormGroup>
                            {totalAmount > 0 && (
                              <>
                                <FormGroup className="mt-4">
                                  <Label className="fw-bold">
                                    Payment Mode
                                  </Label>
                                  <div className="d-flex gap-4">
                                    <div className="form-check">
                                      <Input
                                        className="form-check-input"
                                        type="radio"
                                        name="payment_mode"
                                        value="Cash"
                                        onChange={onChange}
                                        disabled={isProcessing}
                                        checked={
                                          formData.payment_mode === "Cash"
                                        }
                                      />
                                      <Label className="form-check-label">
                                        CASH
                                      </Label>
                                    </div>
                                    {/* <div className="form-check">
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      name="payment_mode"
                                      value="UPI"
                                      onChange={onChange}
                                      disabled={isProcessing}
                                      checked={formData.payment_mode === "UPI"}
                                    />
                                    <Label className="form-check-label">
                                      UPI
                                    </Label>
                                  </div>
                                  <div className="form-check">
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      name="payment_mode"
                                      value="Online"
                                      onChange={onChange}
                                      disabled={isProcessing}
                                      checked={
                                        formData.payment_mode === "Online"
                                      }
                                    />
                                    <Label className="form-check-label">
                                      Pay Online
                                    </Label>
                                  </div> */}
                                  </div>
                                </FormGroup>
                              </>
                            )}
                            <hr className="mt-4" />
                            <div className="d-flex justify-content-between align-items-center mt-3">
                              <div>
                                <>
                                  <p className="mb-0">
                                    Collection Fees : ₹ {collectionFees}
                                  </p>
                                  <p className="fw-bold fs-5">
                                    Total Amount : ₹{" "}
                                    {totalAmount + collectionFees}
                                  </p>
                                </>
                              </div>
                              <Button
                                color="primary"
                                disabled={
                                  totalAmount === 0 ||
                                  !formData.payment_mode ||
                                  !formData.pet ||
                                  !formData.booking_date ||
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
                        )}

                      {selectedCustomer &&
                        selectedCustomer?.id &&
                        petList?.data?.length === 0 && (
                          <div className="text-center text-muted">
                            No Pets found. Please add a pet first.
                            <Link
                              to="/customers-list"
                              style={{ marginLeft: "8px" }}
                            >
                              Add Pet
                            </Link>
                          </div>
                        )}
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
