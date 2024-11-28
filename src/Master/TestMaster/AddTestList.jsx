/* eslint-disable no-constant-binary-expression */
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
import { useOrderContext } from "../../helper/OrderProvider";
const AddTestList = () => {
  const navigate = useNavigate();

  const {
    addlab,
    getAllTestCategory,
    addTest,
    alltestCategory,
    getAllSpeciesList,
    allspecies,
    getAllItemList,
    allItemList,
  } = useMasterContext();

  const { getProfessionalFees, professionalFees } = useOrderContext();

  useEffect(() => {
    getAllTestCategory();
    getAllSpeciesList();
    getProfessionalFees();
    getAllItemList();
  }, []);

  const [inputData, setInputData] = useState({
    test_name: "",
    group: "",
    price: "",
    sell_price: "",
    collection_fee: "",
    is_popular: "",
    testcode: "",
    advice: "",
    duration: "",
    test_preparation: "",
    why_the_test: "",
    image: null,
    method: "",
    observation: [""],
  });

  const [itemsData, setItemsData] = useState([{ item: "", quantity: "" }]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProducts1, setSelectedProducts1] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);

  const handleObseravition = (index, value) => {
    const updatedObservations = [...inputData.observation];
    updatedObservations[index] = value;
    setInputData({ ...inputData, observation: updatedObservations });
  };

  const addObservationField = () => {
    setInputData((prevState) => ({
      ...prevState,
      observation: [...prevState.observation, ""],
    }));
  };

  const removeObservationField = (index) => {
    setInputData((prevState) => ({
      ...prevState,
      observation: prevState.observation.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...itemsData];
    updatedItems[index][key] = value; // Update the specific key (item or quantity)
    setItemsData(updatedItems);
  };

  // Add new item with quantity
  const addItemField = () => {
    setItemsData([...itemsData, { item: "", quantity: "" }]); // Add a new blank row
  };

  // Remove item field
  const removeItemField = (index) => {
    setItemsData(itemsData.filter((_, i) => i !== index)); // Remove the row at the specified index
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : ["price", "sell_price", "collection_fee"].includes(name)
          ? parseInt(value, 10) || 0
          : value,
    }));
  };

  const handleFileChange = (e) => {
    setInputData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const onFeesSelect = (data) => {
    setSelectedFees(data);
  };

  const handlePopularChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      is_popular: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allSelectedProductIds = [
      ...selectedProducts.map((product) => product.id),
    ];

    const allSelectedfeesIds = [...selectedFees.map((product) => product.id)];

    const formDataToSend = new FormData();

    formDataToSend.append("test_name", inputData.test_name);
    formDataToSend.append("group_id", inputData.group);
    formDataToSend.append("price", inputData.price);
    formDataToSend.append("sell_price", inputData.sell_price);
    formDataToSend.append("collection_fee", inputData.collection_fee);
    formDataToSend.append("testcode", inputData.testcode);
    formDataToSend.append("advice", inputData.advice);
    formDataToSend.append("duration", inputData.duration);
    formDataToSend.append("test_preparation", inputData.test_preparation);
    formDataToSend.append("why_the_test", inputData.why_the_test);
    formDataToSend.append("method", inputData.method);
    formDataToSend.append("is_popular", inputData.is_popular);
    if (inputData.image) {
      formDataToSend.append("image", inputData.image);
    }

    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`species[${index}]`, parseInt(id, 10));
    });

    allSelectedfeesIds.forEach((id, index) => {
      formDataToSend.append(`professional_fees[${index}]`, parseInt(id, 10));
    });

    inputData.observation.forEach((obs, index) => {
      formDataToSend.append(`observations[${index}]`, obs);
    });

    itemsData.forEach((el, i) => {
      formDataToSend.append(`items[${i}][item_id]`, el.item);
      formDataToSend.append(`items[${i}][quantity]`, el.quantity);
    });

    addTest(formDataToSend);

    console.log(formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Add Test" />
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
          <div className="row mb-4">
            {/* Test Name Field */}
            <div className="col-md-6">
              <FormGroup className="mb-3">
                <Label for="test_name" className="form-label">
                  Test Name <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="test_name"
                  className="form-control shadow-sm"
                  value={inputData.test_name}
                  onChange={handleInputChange}
                  id="test_name"
                  placeholder="Enter Test Name"
                  required
                />
              </FormGroup>
            </div>

            {/* Price Field */}
            <div className="col-md-6">
              <FormGroup className="mb-3">
                <Label for="price" className="form-label">
                  Price <span className="text-danger">*</span>
                </Label>
                <Input
                  type="number"
                  name="price"
                  className="form-control shadow-sm"
                  min={0}
                  value={inputData.price}
                  onChange={handleInputChange}
                  id="price"
                  placeholder="Enter Price"
                  required
                />
              </FormGroup>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "15px" }}>
            <div className="col-md-6">
              <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                <Label
                  htmlFor="sell_price"
                
                >
                  Sell Price:
                </Label>
                <Input
                  type="number"
                  name="sell_price"
                  min={0}
                  value={inputData.sell_price}
                  onChange={handleInputChange}
                  id="sell_price"
                 
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                <Label
                  htmlFor="test_preparation"
                  
                >
                  Test Preparation:
                </Label>
                <Input
                  type="textarea"
                  name="test_preparation"
                  value={inputData.test_preparation}
                  onChange={handleInputChange}
                  id="test_preparation"
                  rows="3"
              
                />
              </FormGroup>
            </div>
          </div>

          <div
            className="row"
            style={{ marginBottom: "15px", marginTop: "20px" }}
          >
            <div className="col-md-6">
              <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                <Label
                  htmlFor="testcode"
                
                >
                  Testcode:
                </Label>
                <Input
                  type="text"
                  name="testcode"
                  value={inputData.testcode}
                  onChange={handleInputChange}
                  id="testcode"
                 
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                <Label
                  htmlFor="advice"
                >
                  Advice:
                </Label>
                <Input
                  type="textarea"
                  name="advice"
                  value={inputData.advice}
                  onChange={handleInputChange}
                  rows="2"
                  id="advice"
              
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="group" className="col-form-label">
                  Group:
                </Label>
                <Input
                  type="select"
                  name="group"
                  value={inputData.group}
                  onChange={handleInputChange}
                  id="group"
                >
                  <option value="">Select Group</option>
                  {alltestCategory?.data?.map((variety) => (
                    <option key={variety._id} value={variety.id}>
                      {variety.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="duration" className="col-form-label">
                  Duration:
                </Label>
                <Input
                  type="number"
                  name="duration"
                  min={0}
                  value={inputData.duration}
                  onChange={handleInputChange}
                  id="duration"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup className="mt-3">
                <Autocomplete
                  multiple
                  options={professionalFees?.data || []}
                  getOptionLabel={(option) =>
                    `${option?.name} (${option?.expected_charges})` || ""
                  }
                  value={selectedFees}
                  onChange={(event, newValue) => onFeesSelect(newValue)}
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
            </div>

            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="why_the_test" className="col-form-label">
                  Why The Test:
                </Label>
                <Input
                  type="textarea"
                  name="why_the_test"
                  value={inputData.why_the_test}
                  onChange={handleInputChange}
                  rows="2"
                  style={{
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                  id="why_the_test"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="New">Species</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={allspecies?.data || []}
                  getOptionLabel={(option) => option?.title || ""}
                  value={selectedProducts}
                  onChange={(event, newValue) => setSelectedProducts(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Species"
                      placeholder="Select Species"
                    />
                  )}
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label className="col-form-label">Is Popular:</Label>
                <div className="d-flex align-items-center">
                  <div className="form-check me-3">
                    <Input
                      type="radio"
                      name="is_popular"
                      value="Yes"
                      className="form-check-input"
                      id="radioYes"
                      checked={inputData.is_popular === "Yes"}
                      onChange={handlePopularChange}
                    />
                    <Label className="form-check-label" htmlFor="radioYes">
                      Yes
                    </Label>
                  </div>
                  <div className="form-check">
                    <Input
                      type="radio"
                      name="is_popular"
                      value="No"
                      className="form-check-input"
                      id="radioNo"
                      checked={inputData.is_popular === "No"}
                      onChange={handlePopularChange}
                    />
                    <Label className="form-check-label" htmlFor="radioNo">
                      No
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="image" className="col-form-label">
                  Test Image :
                </Label>
                <Input
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="method" className="col-form-label">
                  Test Method:
                </Label>
                <Input
                  type="textarea"
                  name="method"
                  value={inputData.method}
                  onChange={handleInputChange}
                  id="method"
                  rows="3"
                  style={{
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            {itemsData.map((itemData, index) => (
              <div className="col-md-6 mb-2" key={index}>
                <FormGroup>
                  <Label htmlFor={`item-${index}`} className="col-form-label">
                    Item {index + 1}
                  </Label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Dropdown for selecting item */}
                    <Input
                      type="select"
                      name={`item-${index}`}
                      id={`item-${index}`}
                      value={itemData.item}
                      onChange={(e) =>
                        handleItemChange(index, "item", e.target.value)
                      }
                      style={{ marginRight: "10px" }}
                    >
                      <option value="">Select Item</option>
                      {/* Replace with dynamic mapping of your item list */}
                      {allItemList?.data?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Input>

                    {/* Input for quantity */}
                    <Input
                      type="number"
                      name={`quantity-${index}`}
                      id={`quantity-${index}`}
                      value={itemData.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      placeholder="Quantity"
                      style={{ marginRight: "10px", maxWidth: "150px" }}
                    />

                    {/* Remove button */}
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => removeItemField(index)}
                      style={{ color: "white" }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </FormGroup>
              </div>
            ))}

            <div className="col-md-12">
              <Button
                type="button"
                color="primary"
                outline
                onClick={addItemField}
                size="sm"
                style={{ marginTop: "10px" }}
              >
                Add Item
              </Button>
            </div>
          </div>

          <div className="row">
            {inputData.observation.map((obs, index) => (
              <div className="col-md-6 mb-2" key={index}>
                <FormGroup>
                  <Label
                    htmlFor={`observations-${index}`}
                    className="col-form-label"
                  >
                    Observation {index + 1}
                  </Label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Input
                      type="textarea"
                      name={`observation-${index}`}
                      value={obs}
                      onChange={(e) =>
                        handleObseravition(index, e.target.value)
                      }
                      rows="2"
                      style={{
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                      id={`observation-${index}`}
                    />
                    <div className="circelBtnBx">
                      <Button
                        type="button"
                        className="btn"
                        color="primary"
                        onClick={() => removeObservationField(index)}
                        style={{
                          color: "white",
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                </FormGroup>
              </div>
            ))}

            <div className="col-md-12">
              <Button
                type="button"
                color="primary"
                outline
                onClick={addObservationField}
                size="sm"
                style={{ marginTop: "10px" }}
              >
                Add Observation
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            color="primary"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              borderRadius: "5px",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Button shadow
            }}
          >
            add Test
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddTestList;
