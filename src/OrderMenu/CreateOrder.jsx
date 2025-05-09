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
    getOrderPhelboList, orderphelboList,
    getCustomerPetList,
    petList,
    getZonePrice,
    zoneprice,
    getSahcwiseDoc,
    sahcDoc,
  } = useMasterContext();
  const { getAllCollection, collectionDropdown } = useCategoryContext();
  const Navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCC, setSelectedCC] = useState("");
  const [selectedsahc, setSelectedsahc] = useState("");
  const [selectedDoc, setSelectedDoc] = useState("");
  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);

  const [speciesCategory, setSpeciesCategory] = useState(null)

  const [formData, setFormData] = useState({
    pet: "",
    type: "Home Visit",
    test_package: "",
    images: [],
    payment_mode: "pay_via_link",
    booking_date: "",
    referred_from: "",
    other_doctor: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [collectionFees, setCollectionFees] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedPhelbo, setSelectedPhelbo] = useState("");

  const handleSelect = (slot) => {
    setSelectedSlot(slot);
  };

  useEffect(() => {
    if (formData.booking_date && selectedCustomer?.pincode) {
      const dataToSend = {
        booking_date: formData.booking_date,
        pincode: selectedCustomer.pincode,
        ...(formData.type === 'Collection_Center' && { colleciton_center_id: selectedCC }),
      }
      getAllTimeList(dataToSend);
    }
  }, [selectedCustomer, formData.booking_date, selectedCC, formData.type]);

  useEffect(() => {
    if (selectedCustomer) {
      getCustomerPetList(selectedCustomer.id);
      getZonePrice(selectedCustomer.pincode);
    }
  }, [selectedCustomer, formData.type, formData.booking_date]);



  useEffect(() => {
    getProfessionalFees();
    getAllCollection();
  }, []);
  
  useEffect(() => {
    if(speciesCategory) {
      getAllTest(speciesCategory);
      getTestPackageList(speciesCategory);
    }
  }, [speciesCategory])

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
    if (formData.type === "Home Visit" && selectedCustomer?.pincode && formData.booking_date) {
      setCollectionFees(zoneprice?.data?.charge || 350);
    } else {
      setCollectionFees(0);
    }
  }, [formData.type, zoneprice]);

  useEffect(() => {

    if (formData.type === "Home Visit" && selectedCustomer?.pincode && formData.booking_date && selectedSlot) {
      const dataToSend = {
        booking_date: formData.booking_date,
        pincode: selectedCustomer?.pincode,
        start_time: selectedSlot?.start_time,
        end_time: selectedSlot?.end_time
      }
      getOrderPhelboList(dataToSend);
    }

    if (formData.type === "Collection_Center" && selectedCustomer?.pincode && formData.booking_date && selectedSlot) {
      const dataToSend = {
        booking_date: formData.booking_date,
        pincode: selectedCustomer?.pincode,
        start_time: selectedSlot?.start_time,
        end_time: selectedSlot?.end_time,
        colleciton_center_id: selectedCC
      }
      getOrderPhelboList(dataToSend);
    }

  }, [selectedCustomer, formData.booking_date, selectedSlot, selectedCC])



  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if(name === "pet") {
      const petInfo = petList?.data?.find((pet) => pet.id == value)
      setSpeciesCategory(petInfo?.species_category)
    }
  };


  useEffect(() => {
    setSelectedTest([])
    setSelectedPackages([])
  }, [speciesCategory])

  const resetForm = () => {
    setFormData({
      pet: "",
      type: "test",
      test_package: "",
      images: [],
      payment_mode: "pay_via_link",
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
    setSelectedCC(lab);
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
    if (e.target.name === 'booking_date') {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      const date2 = new Date(e.target.value);
      date2.setHours(0, 0, 0, 0);
      if (date2 < date) {
        toast.info('Booking date should not be in the past.')
        return
      }
    }
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
    bodyData.append("state", selectedCustomer.state || "");
    bodyData.append("district", selectedCustomer.district || "");
    bodyData.append("address", selectedCustomer.address || "");
    bodyData.append("colleciton_center_id", selectedCC || "");
    bodyData.append("collection_fees", collectionFees || "");
    bodyData.append("pincode", selectedCustomer.pincode || "");
    bodyData.append("category", speciesCategory || "");
    if (selectedPhelbo) {
      bodyData.append("phlebotomist_id", selectedPhelbo.id || "");
    }
    
    bodyData.append("collection_type", formData.type || "");
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


    if (formData.images.length > 0) {
      formData.images.forEach((image, index) => {
        bodyData.append(`prescription[${index}]`, image);
      });
    }
    bodyData.append("other_doctor ", formData.other_doctor || "");
    bodyData.append("doctor_id", selectedDoc || "");
    bodyData.append("referred_from ", formData.referred_from || "");
    if(formData.type === "Home Visit"){
      bodyData.append("start_time", selectedSlot.start_time || "");
      bodyData.append("end_time", selectedSlot.end_time || "");
      bodyData.append("booking_date", formData.booking_date || "");
    }

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
                            {formData?.pet && (
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
                            )}

                            {formData?.pet && (
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
                                    value="Collection_Center"
                                    onChange={onChange}
                                    disabled={isProcessing}
                                    checked={formData.type === "Collection_Center"}
                                  />
                                  <Label className="form-check-label">Colleciton Center</Label>
                                </div>
                              </FormGroup>

                            )}
                            {formData.type === "Collection_Center" && (
                              <FormGroup className="mt-3">
                                <Label for="Collection_Center" className="fw-bold">
                                  Select Collection Center
                                </Label>
                                <Input
                                  type="select"
                                  id="Collection_Center"
                                  name="Collection_Center"
                                  className="form-select"
                                  value={selectedCC || ""}
                                  onChange={(e) =>
                                    handleLabSelect(e.target.value)
                                  }
                                  required={formData.type === "Collection_Center"}
                                >
                                  <option value="" disabled>
                                    Select Collection Center
                                  </option>
                                  {collectionDropdown.data.map((cc) => (
                                    <option key={cc.id} value={cc.id}>
                                      {cc.organization_name}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            )}

                            {formData?.pet && (
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
                                    disabled={isProcessing || !formData?.pet}
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
                                    disabled={isProcessing || !formData.pet}
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
                                    disabled={isProcessing || !formData?.pet}
                                    checked={formData.referred_from === "other"}
                                  />
                                  <Label className="form-check-label">
                                    other
                                  </Label>
                                </div>
                              </FormGroup>
                            )}

                            {formData.referred_from === "other" && (
                              <FormGroup>
                                <Label
                                  htmlFor="other_doctor"
                                  className="col-form-label"
                                >
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
                            )}

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
                                  disabled={!formData.pet}
                                  value={selectedsahc || ""}
                                  onChange={(e) =>
                                    handleSahcSelect(e.target.value)
                                  }
                                >
                                  <option value="" disabled>
                                    Select Collection Center
                                  </option>
                                  {collectionDropdown?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.organization_name}
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
                                    disabled={!formData.pet}
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
                              {
                                formData.type === "Home Visit" && formData?.pet && (
                                  <>
                                     <FormGroup className="mt-3">
                              <Label for="bookingDate" className="fw-bold">
                                Booking Date
                              </Label>
                              <Input
                                type="date"
                                id="bookingDate"
                                name="booking_date"
                                className="form-control"
                                disabled={isProcessing || !formData.pet}
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
                                  </>
                                )
                              }
                           {formData?.pet && (
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
                           )}

                           {formData?.pet && (
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
                           )}

                           {formData?.pet && (
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
                           )}
                            {formData.booking_date && selectedSlot && (
                              <FormGroup className="mt-3">
                                <Autocomplete
                                  options={orderphelboList.data}
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
                            )}

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
                                        value="pay_via_link"
                                        onChange={onChange}
                                        disabled={isProcessing}
                                        checked={
                                          formData.payment_mode === "pay_via_link"
                                        }
                                      />
                                      <Label className="form-check-label">
                                        Pay via link
                                      </Label>
                                    </div>
                                    {selectedCustomer?.isCodAvailable === 1 && (
                                      <div className="form-check">
                                        <Input
                                          className="form-check-input"
                                          type="radio"
                                          name="payment_mode"
                                          value="COD"
                                          onChange={onChange}
                                          disabled={isProcessing}
                                          checked={formData.payment_mode === "COD"}
                                        />
                                        <Label className="form-check-label">
                                          Cash On Delivary
                                        </Label>
                                      </div>
                                    )}
                                    {/* <div className="form-check">
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
                                  totalAmount === 0 || // Total amount should not be 0
                                  !formData.payment_mode || // Payment mode must be selected
                                  !formData.pet || // Pet must be selected
                                  (selectedTest.length === 0 && selectedPackages.length === 0) ||
                                  (formData.type === "Collection_Center" && !selectedCC) || // If Collection_Center is selected, Collection_Center dropdown must also be selected
                                  isProcessing // Button should be disabled if processing
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
