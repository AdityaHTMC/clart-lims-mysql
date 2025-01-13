/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, FormText, Input, Label, Spinner } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCategoryContext } from "../../helper/CategoryProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Autocomplete, Chip, TextField } from "@mui/material";
const AddLab = () => {
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
  } = useCategoryContext();

  useEffect(() => {
    getAllCollection();
    getAllUnit();
    getallstateList();
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
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProducts2, setSelectedProducts2] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "mobile" && value.length > 10) {
      setError("Mobile number cannot exceed 10 digits"); // Set error message
      return;
    } else {
      setError(""); // Clear error message if valid
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const allSelectedProductIds = [
      ...selectedProducts.map((product) => product.id),
    ];

    const allSelectedProduct2Ids = [
      ...selectedProducts2.map((product) => product.id),
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

    Object.entries(inputData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });
    
    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`associated_collection_centers[${index}]`, id);
    });

    allSelectedProduct2Ids.forEach((id, index) => {
      formDataToSend.append(`associated_units[${index}]`, id);
    });

    // inputData.images.forEach((image, index) => {
    //   formDataToSend.append(`images[${index}]`, image);
    // });

    try {
      await addlab(formDataToSend);
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CommonBreadcrumb title="Add Lab" parent="Physical" />
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
                  Organization Name <span className="text-danger">*</span>
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
                  Contact Person <span className="text-danger">*</span>
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
                  Mobile <span className="text-danger">*</span>
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
                  Pincode <span className="text-danger">*</span>
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
                  email <span className="text-danger">*</span>
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

          {/* <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="pincode" className="col-form-label">
                  Pincode:
                </Label>
                <Input
                  type="text"
                  name="pincode"
                  value={inputData.pincode}
                  onChange={handleInputChange}
                  id="pincode"
                />
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="images" className="col-form-label">
                  Upload Images:
                </Label>
                <Input
                  type="file"
                  name="images"
                  id="images"
                  onChange={handleImageChange}
                  multiple
                />
              </FormGroup>
            </div>
          </div>

        
          <div className="row">
            {inputData.images?.length > 0 && (
              <div className="col-md-12">
                <div
                  className="image-preview-container"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {inputData.images.map((image, index) => (
                    <div
                      key={index}
                      className="image-preview"
                      style={{ position: "relative", margin: "5px" }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <FaTrash style={{ color: "red" }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div> */}

          <Button type="submit" color="primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner size="sm" /> Submitting...
              </>
            ) : (
              "Add Lab"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddLab;
