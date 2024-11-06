/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
const AddBread = () => {
  const navigate = useNavigate();

  const {addBreed,getAllSpeciesList,allspecies} = useMasterContext();

  useEffect(()=>{
    getAllSpeciesList()
  },[])
 
  const [inputData, setInputData] = useState({
    species: "",
    breed: "",
    name: "",
  });

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

    const formDataToSend = new FormData();

    formDataToSend.append("name", inputData.name);
    formDataToSend.append("species", inputData.species);
    formDataToSend.append("breed", inputData.breed);
    // inputData.images.forEach((image, index) => {
    //   formDataToSend.append(`images[${index}]`, image);
    // });

    addBreed(formDataToSend);

    console.log(formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Add Breed"  />
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
                <Label for="name"> Name *</Label>
                <Input
                  type="text"
                  name="name"
                  value={inputData.name}
                  onChange={handleInputChange}
                  id="organization_name"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
            <FormGroup>
                <Label htmlFor="species" className="col-form-label">
                  Species:
                </Label>
                <Input
                  type="select"
                  name="species"
                  value={inputData.species}
                  onChange={handleInputChange}
                  id="species"
                >
                  <option value="">Select Species</option>
                  {allspecies?.data?.map((variety) => (
                    <option key={variety._id} value={variety.title}>
                      {variety.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
          </div>

     

          {/* Add the remaining inputs similarly, organizing them into rows as needed */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="breed" className="col-form-label">
                 Breed:
                </Label>
                <Input
                  type="text"
                  name="breed"
                  value={inputData.breed}
                  onChange={handleInputChange}
                  id="breed"
                />
              </FormGroup>
            </div>
            {/* <div className="col-md-6">
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
            </div> */}
          </div>


          {/* Image previews */}
          {/* <div className="row">
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
            Add Breed
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddBread;
