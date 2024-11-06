/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useCategoryContext } from "../helper/CategoryProvider";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Chip, TextField } from "@mui/material";
const AddUnitForm = () => {
  const navigate = useNavigate();

  const {
    addUnit,getAllLabs,labDropdown,getAllCollection,collectionDropdown
  } = useCategoryContext();

  useEffect(()=>{
    getAllCollection()
    getAllLabs()
  },[])

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



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      ...selectedProducts.map(product => product._id)
    ];
    
    const allSelectedProduct2Ids = [
      ...selectedProducts2.map(product => product._id)
    ];

    const formDataToSend = new FormData();

    formDataToSend.append("organization_name", inputData.organization_name);
    formDataToSend.append("contact_person", inputData.contact_person);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("password", inputData.password);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("address", inputData.address );
    formDataToSend.append("district", inputData.district );
    formDataToSend.append("state", inputData.state );
    formDataToSend.append("pincode", inputData.pincode );
    
    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`associated_collection_centers[${index}]`, id);
    });
  
    // Append associated_labs with array index
    allSelectedProduct2Ids.forEach((id, index) => {
      formDataToSend.append(`associated_labs[${index}]`, id);
    });
    // inputData.images.forEach((image, index) => {
    //   formDataToSend.append(`images[${index}]`, image);
    // });

    addUnit(formDataToSend);

    console.log(formDataToSend);
  };

  return (
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
              <Label for="title">Organization Name *</Label>
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
                value={inputData.mobile}
                onChange={handleInputChange}
                id="mobile"
              />
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
              <Label htmlFor="district" className="col-form-label">
                District:
              </Label>
              <Input
                type="text"
                name="district"
                value={inputData.district}
                onChange={handleInputChange}
                id="district"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="state" className="col-form-label">
                State:
              </Label>
              <Input
                type="text"
                name="state"
                value={inputData.state}
                onChange={handleInputChange}
                id="state"
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="New">Add Collection Center</Label>
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
                <Label for="New">Add New Lab Center</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={labDropdown.data || []}
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

        <Button type="submit" color="primary">
          Add Unit
        </Button>
      </form>
    </div>
  );
};

export default AddUnitForm;
