/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Spinner } from "reactstrap";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCategoryContext } from "../../helper/CategoryProvider";
import CancelIcon from "@mui/icons-material/Cancel";
import AddLocationIcon from "@mui/icons-material/AddLocation";
const EditTransporter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPhlebotomist, setSelectedPhlebotomist] = useState([]);
  const { getAllPhelboList, allphelboList } =
    useMasterContext();
  const {
    getallstateList,
    getallDistrictList,
    allstateList,
    alldistrictList,
    getAllCollection,
    collectionDropdown,
    getAllUnit,
    unitDropdown,
    getAllLabs,
    labDropdown,
    getphelboDetails,
    phelboDetails,
    editTransporter,
  } = useCategoryContext();

  useEffect(() => {
    getAllCollection();
    getAllUnit();
    getallstateList();
    getAllLabs();
    getAllPhelboList()
  }, []);

  useEffect(() => {
    if (id) {
      getphelboDetails(id);
    }
  }, [id]);

  const [pincode, setPincode] = useState("");
  const [pincodes, setPincodes] = useState([]);

  const [inputData, setInputData] = useState({
    name: "",
    associated_unit_details: [],
    associated_lab_details: [],
    contact_person: "",
    country: "",
    district: "",
    email: "",
    mobile: "",
    state: "",
    pincode: "",
    address: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProducts2, setSelectedProducts2] = useState([]);
  const [selectedProducts3, setSelectedProducts3] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (phelboDetails) {
      setInputData({
        name: phelboDetails.data.name || "",
        contact_person: phelboDetails.data.contact_person || "",
        tests: phelboDetails.data.tests || [],
        country: phelboDetails.data.country || "",
        email: phelboDetails.data.email || "",
        mobile: phelboDetails.data.mobile || "",
        state: phelboDetails.data.state || "",
        district: phelboDetails.data.district || "",
        pincode: phelboDetails.data.pincode || "",
        address: phelboDetails.data.address || "",
      });
      if (allstateList?.data?.length > 0) {
        const selectedState = allstateList?.data?.find(
          (state) => state.state === phelboDetails.data.state
        );

        if (selectedState) {
          // Pass the selected state's _id to get the district list
          getallDistrictList(selectedState.id);
        }
      }
      setSelectedProducts(phelboDetails.data.associated_lab_details || []);
      setSelectedProducts2(phelboDetails.data.associated_unit_details || []);
      setSelectedProducts3(
        phelboDetails.data.associated_collection_centers_details || []
      );
      setSelectedPhlebotomist(phelboDetails.data?.associated_phlebotomist_details || []) 
      setPincodes(phelboDetails.data.serviceable_pincodes || []);
    }
  }, [phelboDetails]);

  const handleAddPincode = () => {
    if (pincode) {
      setPincodes([...pincodes, pincode]);
      setPincode(""); // Clear the input field
    }
  };

  console.log(pincode, "pi");
  console.log(pincodes, "pis");

  // Function to remove a pincode from the array
  const handleRemovePincode = (indexToRemove) => {
    setPincodes(pincodes.filter((_, index) => index !== indexToRemove));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStateChange = (e) => {
    const selectedStateName = e.target.value;
    setInputData({ ...inputData, state: selectedStateName, district: "" }); // Update state and reset district

    // Find the selected state object based on the state name
    const selectedState = allstateList?.data?.find(
      (state) => state.state === selectedStateName
    );

    if (selectedState) {
      // Pass the selected state's _id to get the district list
      getallDistrictList(selectedState.id);
    }
  };

  const handleDistrictChange = (e) => {
    setInputData({ ...inputData, district: e.target.value });
  };

  const handleTestRemove = (testToRemove) => {
    setSelectedProducts((prev) =>
      prev.filter((test) => test._id !== testToRemove._id)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const allSelectedProductIds = [
      ...selectedProducts.map((product) => product.id),
    ];

    const allSelectedProduct2Ids = [
      ...selectedProducts2.map((product) => product.id),
    ];

    const allSelectedProduct3Ids = [
      ...selectedProducts3.map((product) => product.id),
    ];

    const formDataToSend = new FormData();

    formDataToSend.append("name", inputData.name);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("pincode", inputData.pincode);
    formDataToSend.append("address", inputData.address);
    formDataToSend.append("district", inputData.district);
    formDataToSend.append("state", inputData.state);
    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`associated_labs[${index}]`, id);
    });

    allSelectedProduct2Ids.forEach((id, index) => {
      formDataToSend.append(`associated_units[${index}]`, id);
    });

    selectedPhlebotomist.forEach((item, index) => {
      formDataToSend.append(`associated_phlebotomists[${index}]`, item?.id);
    });

    allSelectedProduct3Ids.forEach((id, index) => {
      formDataToSend.append(`associated_collection_centers[${index}]`, id);
    });

    pincodes.forEach((pin, index) => {
      formDataToSend.append(`serviceable_pincode[${index}]`, pin);
    });

    try {
      await editTransporter(id, formDataToSend);
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <>
      <CommonBreadcrumb title="Edit Transporter" />
      <div className="product-form-container" style={{ padding: "2px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="name"> Name </Label>
                <Input
                  type="text"
                  name="name"
                  value={inputData.name}
                  onChange={handleInputChange}
                  id="name"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="contact_person" className="col-form-label">
                  Contact Person:
                </Label>
                <Input
                  type="text"
                  name="contact_person"
                  value={inputData.contact_person}
                  onChange={handleInputChange}
                  id="contact_person"
                />
              </FormGroup>
            </div>
          </div>

          {/* First row with two col-md-6 */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="email" className="col-form-label">
                  Email:
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={inputData.email}
                  onChange={handleInputChange}
                  id="email"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="mobile" className="col-form-label">
                  mobile:
                </Label>
                <Input
                  type="number"
                  name="mobile"
                  value={inputData.mobile}
                  onChange={handleInputChange}
                  id="mobile"
                />
              </FormGroup>
            </div>
          </div>

          {/* Second row with two col-md-6 */}

          {/* Continue adding pairs in rows */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="pincode" className="col-form-label">
                  Pincode
                </Label>
                <Input
                  type="number"
                  name="pincode"
                  value={inputData.pincode}
                  onChange={handleInputChange}
                  id="pincode"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="address" className="col-form-label">
                  Address
                </Label>
                <Input
                  type="text"
                  name="address"
                  value={inputData.address}
                  onChange={handleInputChange}
                  id="address"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="state" className="col-form-label">
                  State:
                </Label>
                <Input
                  type="select"
                  name="state"
                  value={inputData.state}
                  onChange={handleStateChange}
                  id="state"
                >
                  <option value="">Select State</option>
                  {allstateList?.data?.map((state) => (
                    <option key={state._id} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="district" className="col-form-label">
                  District:
                </Label>
                <Input
                  type="select"
                  name="district"
                  value={inputData.district}
                  onChange={handleDistrictChange}
                  id="district"
                >
                  <option value="">Select District</option>
                  {alldistrictList?.data?.map((district) => (
                    <option key={district._id} value={district.district}>
                      {district.district}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="New">Associated Lab Centers</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={labDropdown?.data || []}
                  getOptionLabel={(option) => option?.organization_name || ""}
                  value={selectedProducts}
                  onChange={(event, newValue) => setSelectedProducts(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Lab"
                      placeholder="Select Lab"
                    />
                  )}
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label for="New">Associated Unit Details</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={unitDropdown?.data || []}
                  getOptionLabel={(option) => option?.organization_name || ""}
                  value={selectedProducts2}
                  onChange={(event, newValue) => setSelectedProducts2(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Unit"
                      placeholder="Select Unit"
                    />
                  )}
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="New">Associated Collection Center</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={collectionDropdown?.data || []}
                  getOptionLabel={(option) => option?.organization_name || ""}
                  value={selectedProducts3}
                  onChange={(event, newValue) => setSelectedProducts3(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Collection Center"
                      placeholder="Select Collection Center"
                    />
                  )}
                />
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="pincode" className="col-form-label">
                  serviceable Pincode:
                </Label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    type="text"
                    name="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    id="pincode"
                    placeholder="Enter pincode"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddPincode}
                    style={{ marginLeft: "5px" }}
                  >
                    <AddLocationIcon />
                  </Button>
                </div>

                {/* Display Chips for each pincode */}
                <div style={{ marginTop: "10px" }}>
                  {pincodes.map((code, index) => (
                    <Chip
                      key={index}
                      label={code}
                      onDelete={() => handleRemovePincode(index)}
                      deleteIcon={<CancelIcon />}
                      style={{ margin: "5px" }}
                    />
                  ))}
                </div>
              </FormGroup>
            </div>
          </div>

          <div className="col-md-6">
            <FormGroup>
              <Label for="New">Associate Phlebototmist</Label>
              <Autocomplete
                sx={{ m: 1 }}
                multiple
                options={allphelboList.data || []}
                getOptionLabel={(option) => option?.name || ""}
                value={selectedPhlebotomist}
                onChange={(event, newValue) => setSelectedPhlebotomist(newValue)}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Phlebotomist"
                    placeholder="Select Phlebotomist"
                  />
                )}
              />
            </FormGroup>
          </div>

          <Button type="submit" color="primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner size="sm" /> Submitting...
              </>
            ) : (
              " edit"
            )}
          </Button>

        </form>
      </div>
    </>
  );
};

export default EditTransporter;
