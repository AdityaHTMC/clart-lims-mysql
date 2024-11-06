/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCategoryContext } from "../../helper/CategoryProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useMasterContext } from "../../helper/MasterProvider";
const AddPhlebotomist = () => {
  const navigate = useNavigate();

  const {addphlebotomist,getAllCollection,collectionDropdown,getAllUnit,unitDropdown,} = useCategoryContext();

  const { getAlldistrictList, allDistrictList, getAllStateList, allStateList } =useMasterContext();

  useEffect(() => {
    getAllCollection();
    getAllUnit();
    getAllStateList();
  }, []);

  const [inputData, setInputData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    pincode: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProducts2, setSelectedProducts2] = useState([]);
  const [pincode, setPincode] = useState("");
  const [pincodes, setPincodes] = useState([]);

  const handleAddPincode = () => {
    if (pincode) {
      setPincodes([...pincodes, pincode]);
      setPincode(""); // Clear the input field
    }
  };

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
      // If state is selected, fetch districts for the selected state
  if (name === 'stateId') {
    getAlldistrictList(value); // Call the API with the selected state's _id
  }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setInputData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...selectedFiles], // Append new images
    }));
  };

  const removeImage = (index) => {
    setInputData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index), // Remove image at index
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allSelectedProductIds = [
      ...selectedProducts.map((product) => product._id),
    ];

    const allSelectedProduct2Ids = [
      ...selectedProducts2.map((product) => product._id),
    ];

    const selectedState = allStateList?.data?.find(
      (state) => state._id === inputData.stateId
    );
    const selectedDistrict = allDistrictList?.data?.find(
      (district) => district._id === inputData.districtId
    );

    const formDataToSend = new FormData();

    formDataToSend.append("name", inputData.name);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("address", inputData.address);
    formDataToSend.append("state", selectedState?.state);
    formDataToSend.append("district", selectedDistrict?.district);
    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`associated_collection_centers[${index}]`, id);
    });

    pincodes.forEach((pin, index) => {
      formDataToSend.append(`serviceable_pincode[${index}]`, pin);
    });
    // // Append associated_labs with array index
    // allSelectedProduct2Ids.forEach((id, index) => {
    //   formDataToSend.append(`associated_units[${index}]`, id);
    // });

    // inputData.images.forEach((image, index) => {
    //   formDataToSend.append(`images[${index}]`, image);
    // });

    addphlebotomist(formDataToSend);

    console.log(formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Add Phlebotomist" parent="Physical" />
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
                <Label for="title">Phlebotomist Name *</Label>
                <Input
                  type="text"
                  name="name"
                  value={inputData.name}
                  onChange={handleInputChange}
                  id="name"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="mobile" className="col-form-label">
                  Mobile:
                </Label>
                <Input
                  type="number"
                  name="mobile"
                  value={inputData.mobile}
                  onChange={handleInputChange}
                  id="mobile"
                  required
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
                <Label htmlFor="stateId" className="col-form-label">
                  State:
                </Label>
                <Input
                  type="select"
                  name="stateId"
                  value={inputData.stateId}
                  onChange={handleInputChange}
                  id="stateId"
                >
                  <option value="">Select State</option>
                  {allStateList?.data?.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.state}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="districtId" className="col-form-label">
                  District:
                </Label>
                <Input
                  type="select"
                  name="districtId"
                  value={inputData.districtId}
                  onChange={handleInputChange}
                  id="districtId"
                  disabled={!inputData.stateId}
                >
                  <option value="">Select District</option>
                  {allDistrictList?.data?.map((district) => (
                    <option key={district._id} value={district._id}>
                      {district.district}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
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
          </div>

          <div className="row">
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

            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="images" className="col-form-label">
                  Upload Profile:
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

          {/* Image previews */}
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
          </div>

          <Button type="submit" color="primary">
            Add Phlebotomist
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddPhlebotomist;
