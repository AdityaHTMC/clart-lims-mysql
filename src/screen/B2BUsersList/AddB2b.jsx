/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, FormText, Input, Label, Spinner } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useCategoryContext } from "../../helper/CategoryProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Autocomplete, Chip, TextField } from "@mui/material";
const AddB2b = () => {
  const navigate = useNavigate();

  const {
    addlab,
    getAllCollection,
    collectionDropdown,
    getAllUnit,
    unitDropdown,
    getallstateList,
    getallDistrictList,
    allstateList,
    alldistrictList,
    getAllLabs,
    labDropdown,
    addB2b,
  } = useCategoryContext();

  useEffect(() => {
    getAllCollection();
    getAllUnit();
    getallstateList();
    getAllLabs();
  }, []);

  const [inputData, setInputData] = useState({
    organization_name: "",
    contact_person: "",
    mobile: "",
    password: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    GSTIN: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProducts2, setSelectedProducts2] = useState([]);
  const [selectedProducts3, setSelectedProducts3] = useState([]);
  const [error, setError] = useState("");
  const [gsterror, setgsterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Mobile validation (existing logic)
    if (name === "mobile" && value.length > 10) {
      setError("Mobile number cannot exceed 10 digits"); // Set error message
      return;
    }

    // GSTIN validation
    if (name === "GSTIN") {
      // Validation: GSTIN must not exceed 15 characters
      if (value.length > 15) {
        setgsterror("GSTIN cannot exceed 15 characters");
        return;
      }

      // Validation: First two characters must be numbers
      const firstTwoChars = value.slice(0, 2);
      if (value.length >= 2 && !/^\d{2}$/.test(firstTwoChars)) {
        setgsterror("First two characters of GSTIN must be numbers");
        return;
      }

      // Validation: All characters must be uppercase letters or digits
      if (!/^[A-Z0-9]*$/.test(value)) {
        setgsterror("GSTIN can only contain uppercase letters and numbers");
        return;
      }
    }

    // Clear errors if valid
    setError("");
    setgsterror("");

    // Update state (unchanged logic)
    setInputData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "GSTIN"
          ? value.toUpperCase()
          : value, // Ensure GSTIN is uppercase
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

    // formDataToSend.append("organization_name", inputData.organization_name);
    // formDataToSend.append("contact_person", inputData.contact_person);
    // formDataToSend.append("mobile", inputData.mobile);
    // formDataToSend.append("password", inputData.password);
    // formDataToSend.append("email", inputData.email);
    // formDataToSend.append("address", inputData.address);
    // formDataToSend.append("district", inputData.district);
    // formDataToSend.append("state", inputData.state);
    // formDataToSend.append("pincode", inputData.pincode);
    // formDataToSend.append("GSTIN", inputData.GSTIN);

    Object.entries(inputData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`associated_collection_centers[${index}]`, id);
    });

    // Append associated_labs with array index
    allSelectedProduct2Ids.forEach((id, index) => {
      formDataToSend.append(`associated_units[${index}]`, id);
    });

    allSelectedProduct3Ids.forEach((id, index) => {
      formDataToSend.append(`associated_labs[${index}]`, id);
    });

    // inputData.images.forEach((image, index) => {
    //   formDataToSend.append(`images[${index}]`, image);
    // });

    try {
      await addB2b(formDataToSend);
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CommonBreadcrumb title="Add B2B" parent="Physical" />
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
                <Label for="title" className="col-form-label">
                  Organization Name *
                </Label>
                <Input
                  type="text"
                  name="organization_name"
                  value={inputData.organization_name}
                  onChange={handleInputChange}
                  id="organization_name"
                  required
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
                <Label htmlFor="mobile" className="col-form-label">
                  Mobile:
                </Label>
                <Input
                  type="number"
                  name="mobile"
                  min={0}
                  value={inputData.mobile}
                  onChange={handleInputChange}
                  id="mobile"
                  
                />
                {error && <FormText color="danger">{error}</FormText>}
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="pincode" className="col-form-label">
                  Pincode:
                </Label>
                <Input
                  type="number"
                  name="pincode"
                  min={0}
                  value={inputData.pincode}
                  onChange={handleInputChange}
                  id="pincode"
                  
                />
              </FormGroup>
            </div>
          </div>

          {/* Second row with two col-md-6 */}

          {/* Continue adding pairs in rows */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="email" className="col-form-label">
                  email:
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={inputData.email}
                  onChange={handleInputChange}
                  id="email"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="address" className="col-form-label">
                  Address:
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

          {/* Add the remaining inputs similarly, organizing them into rows as needed */}
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
                  disabled={!inputData.state} // Disable until a state is selected
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
                <Label for="New">Add New Collection Center</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={collectionDropdown.data || []}
                  getOptionLabel={(option) => option?.organization_name || ""}
                  value={selectedProducts}
                  onChange={(event, newValue) => setSelectedProducts(newValue)}
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
                <Label for="New">Add New Unit Center</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={unitDropdown.data || []}
                  getOptionLabel={(option) => option?.organization_name || ""}
                  value={selectedProducts2}
                  onChange={(event, newValue) => setSelectedProducts2(newValue)}
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
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="New">Add New Lab Center</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={labDropdown.data || []}
                  getOptionLabel={(option) => option?.organization_name || ""}
                  value={selectedProducts3}
                  onChange={(event, newValue) => setSelectedProducts3(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select lab Center"
                      placeholder="Select lab Center"
                    />
                  )}
                />
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="GSTIN" className="col-form-label">
                  GSTIN:
                </Label>
                <Input
                  type="text"
                  name="GSTIN"
                  value={inputData.GSTIN}
                  onChange={handleInputChange}
                  id="GSTIN"
                />
                {gsterror && <p style={{ color: "red" }}>{gsterror}</p>}
              </FormGroup>
            </div>
          </div>

              <div className="row">
                  <div className="col-md-6">
                      <FormGroup>
                        <Label htmlFor="password" className="col-form-label">
                          Password
                        </Label>
                        <Input
                          type="text"
                          name="password"
                          value={inputData.password}
                          onChange={handleInputChange}
                          id="password"
                        />
                      </FormGroup>
                    </div>
                  </div>

          <Button type="submit" color="primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner size="sm" /> Submitting...
              </>
            ) : (
              "Add B2B"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddB2b;
