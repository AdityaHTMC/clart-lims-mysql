/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useCommonContext } from "../helper/CommonProvider";

const AddDeliveryBoy = () => {
  const navigate = useNavigate();

  const { addDelivery } = useCommonContext();

  const [inputData, setInputData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    mobile: "",
    state: "",
    city: "",
    pin_code: "",
    address_line_1: "",
    address_line_2: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setInputData((prevData) => ({
      ...prevData,
      image: null,
    }));
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", inputData.name);
    formDataToSend.append("username", inputData.username);
    formDataToSend.append("password", inputData.password);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("image", inputData.image);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("state", inputData.state);
    formDataToSend.append("city", inputData.city);
    formDataToSend.append("address_line_1", inputData.address_line_1);
    formDataToSend.append("address_line_2", inputData.address_line_2);

    addDelivery(formDataToSend);

    console.log(formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title=" Add Delivery Boy"  />
      <div className="product-form-container" style={{ padding: "10px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="name" className="col-form-label font-weight-bold">
                Delivery Boy Name:
              </Label>
              <Input
                type="text"
                name="name"
                value={inputData.name}
                onChange={handleInputChange}
                id="name"
                style={{ borderRadius: "5px" }}
                required
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="username" className="col-form-label font-weight-bold">
                Delivery Boy Username:
              </Label>
              <Input
                type="text"
                name="username"
                value={inputData.username}
                onChange={handleInputChange}
                id="username"
                style={{ borderRadius: "5px" }}
                required
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="password" className="col-form-label font-weight-bold">
                Password:
              </Label>
              <Input
                type="password"
                name="password"
                value={inputData.password}
                onChange={handleInputChange}
                id="password"
                style={{ borderRadius: "5px" }}
                required
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="email" className="col-form-label font-weight-bold">
                Email:
              </Label>
              <Input
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleInputChange}
                id="email"
                style={{ borderRadius: "5px" }}
                required
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="mobile" className="col-form-label font-weight-bold">
                Mobile:
              </Label>
              <Input
                type="text"
                name="mobile"
                value={inputData.mobile}
                onChange={handleInputChange}
                id="mobile"
                style={{ borderRadius: "5px" }}
                required
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="state" className="col-form-label font-weight-bold">
                State:
              </Label>
              <Input
                type="text"
                name="state"
                value={inputData.state}
                onChange={handleInputChange}
                id="state"
                style={{ borderRadius: "5px" }}
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="city" className="col-form-label font-weight-bold">
                City:
              </Label>
              <Input
                type="text"
                name="city"
                value={inputData.city}
                onChange={handleInputChange}
                id="city"
                style={{ borderRadius: "5px" }}
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="pin_code" className="col-form-label font-weight-bold">
                Pin Code:
              </Label>
              <Input
                type="text"
                name="pin_code"
                value={inputData.pin_code}
                onChange={handleInputChange}
                id="pin_code"
                style={{ borderRadius: "5px" }}
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="address_line_1" className="col-form-label font-weight-bold">
                Address Line 1:
              </Label>
              <Input
                type="text"
                name="address_line_1"
                value={inputData.address_line_1}
                onChange={handleInputChange}
                id="address_line_1"
                style={{ borderRadius: "5px" }}
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="address_line_2" className="col-form-label font-weight-bold">
                Address Line 2:
              </Label>
              <Input
                type="text"
                name="address_line_2"
                value={inputData.address_line_2}
                onChange={handleInputChange}
                id="address_line_2"
                style={{ borderRadius: "5px" }}
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="image" className="col-form-label font-weight-bold">
                Upload Profile Image:
              </Label>
              <Input
                type="file"
                name="image"
                id="image"
                onChange={handleSingleImageChange}
                accept="image/*"
                style={{ borderRadius: "5px", padding: "5px" }}
                required
              />
            </FormGroup>

            {preview && (
              <div style={{ position: "relative", margin: "5px", marginBottom: "10px" }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginRight: "10px",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  title="Remove Image"
                >
                  <FaTrash style={{ color: "red", fontSize: "18px" }} />
                </button>
              </div>
            )}
          </div>
        </div>

        <Button
          type="submit"
          color="primary"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            marginTop: "20px",
            boxShadow: "0px 4px 10px rgba(0, 123, 255, 0.2)",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Submit 
        </Button>
      </form>
    </div>
    </>
  );
};

export default AddDeliveryBoy;
