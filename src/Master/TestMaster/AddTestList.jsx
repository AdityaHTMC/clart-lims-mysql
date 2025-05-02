/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Spinner } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
import { useOrderContext } from "../../helper/OrderProvider";
import { useCommonContext } from "../../helper/CommonProvider";
import { toast } from "react-toastify";
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
    getAllConatinerList,
    allContainerList,
    getAllParameterGrList, allparameterGrList,
  } = useMasterContext();

  const { getProfessionalFees, professionalFees, allTest, getAllTest } = useOrderContext();
  const { getSpeciesCategoryList, speciesCategoryList } = useCommonContext()

  useEffect(() => {
    getAllTestCategory();
    getAllSpeciesList();
    getProfessionalFees();
    getAllItemList();
    getAllConatinerList();
    getAllParameterGrList();
    getSpeciesCategoryList();
    getAllTest();
  }, []);

  const [inputData, setInputData] = useState({
    test_name: "",
    group: "",
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
    container_id: "",
    hsn_code: "",
    isPrescriptionRequired: "",
  });

  const [priceCatalog, setPriceCatalog] = useState([{
    category_id: '', sell_price: '', price: ''
  }])

  const [itemsData, setItemsData] = useState([{ item: "", quantity: "" }]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedParameterGrList, setparameterGrList] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const addPriceCatalog = () => {
    if (priceCatalog.length === speciesCategoryList?.data?.length) {
      toast.info("All category selected already");
      return
    }
    setPriceCatalog((prev) => [...prev, { category_id: "", sell_price: "", price: "" }])
  };

  const removePriceCatalog = (index) => {
    setPriceCatalog((prev) => prev.filter((_, i) => i !== index))
  };

  const handlePriceChange = (index, key, value) => {
    if (key === "category_id") {
      const find = priceCatalog.find((item) => item.category_id === value)
      if (find) {
        toast.info("Category already select choose different category")
        retrun
      }
    }


    const updatedItems = [...priceCatalog];
    if (key === "price") {
      if (updatedItems[index].sell_price && parseInt(updatedItems[index].sell_price) > parseInt(value)) {
        toast.info("Price should be greater than or equal to with discounted price")
        return
      }
    }
    if (key === "sell_price") {
      if (updatedItems[index].price && parseInt(updatedItems[index].price) < parseInt(value)) {
        toast.info("Discounted price should be less than or equal to with price")
        return
      }
    }
    updatedItems[index][key] = value; // Update the specific key (item or quantity)
    setPriceCatalog(updatedItems);
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

  const handlePrescription = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      isPrescriptionRequired: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allSelectedProductIds = [
      ...selectedProducts.map((product) => product.id),
    ];

    let isCheck = false

    priceCatalog?.forEach((item) => {
      if (!item?.category_id || !item?.price || !item?.sell_price) {
        toast.info("Price category, price, discounted price required")
        isCheck = true
      }
    })

    if (isCheck) {
      retrun
    }

    const allSelectedfeesIds = [...selectedFees.map((product) => product.id)];

    const allSelectedParameterGrIds = [...selectedParameterGrList.map((product) => product.id)];

    setIsLoading(true);
    const formDataToSend = new FormData();

    formDataToSend.append("test_name", inputData.test_name);
    formDataToSend.append("group_id", inputData.group);
    formDataToSend.append("testcode", inputData.testcode);
    formDataToSend.append("advice", inputData.advice);
    formDataToSend.append("duration", inputData.duration);
    formDataToSend.append("test_preparation", inputData.test_preparation);
    formDataToSend.append("why_the_test", inputData.why_the_test);
    formDataToSend.append("method", inputData.method);
    formDataToSend.append("is_popular", inputData.is_popular);
    formDataToSend.append("isPrescriptionRequired", inputData.isPrescriptionRequired);
    formDataToSend.append("container_id", inputData.container_id);
    formDataToSend.append("hsn_code", inputData.hsn_code);
    if (inputData.image) {
      formDataToSend.append("image", inputData.image);
    }

    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`species[${index}]`, parseInt(id, 10));
    });

    allSelectedParameterGrIds.forEach((id, index) => {
      formDataToSend.append(`parameter_groups[${index}]`, parseInt(id, 10));
    });

    if(selectedTests && selectedTests?.length > 0){
      selectedTests?.forEach((el, index) => {
        formDataToSend.append(`tests[${index}]`, el.id);
      });
    }

    priceCatalog.forEach((item, index) => {
      formDataToSend.append(`catalogs[${index}][category_id]`, item?.category_id)
      formDataToSend.append(`catalogs[${index}][price]`, item?.price)
      formDataToSend.append(`catalogs[${index}][sell_price]`, item?.sell_price)
    })

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

    try {
      await addTest(formDataToSend);
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
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

            <div className="col-md-6">
              <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                <Label htmlFor="test_preparation">Test Preparation:</Label>
                <Input
                  type="textarea"
                  name="test_preparation"
                  className="form-control shadow-sm"
                  value={inputData.test_preparation}
                  onChange={handleInputChange}
                  id="test_preparation"
                  rows="3"
                  placeholder="Enter Test Preparation"
                />
              </FormGroup>
            </div>

            {/* Price Field */}
            {/* <div className="col-md-6">
              <FormGroup className="mb-3">
                <Label for="price" className="form-label">
                  MRP <span className="text-danger">*</span>
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
            </div> */}
          </div>

          <div className="row" style={{ marginBottom: "15px" }}>
            {/* <div className="col-md-6">
              <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                <Label htmlFor="sell_price">
                  Discounted Price <span className="text-danger">*</span>
                </Label>
                <Input
                  type="number"
                  name="sell_price"
                  className="form-control shadow-sm"
                  min={0}
                  value={inputData.sell_price}
                  onChange={handleInputChange}
                  id="sell_price"
                  placeholder="Enter Sell Price"
                  required
                />
              </FormGroup>
            </div> */}

          </div>

          <div
            className="row"
            style={{ marginBottom: "15px", marginTop: "20px" }}
          >
            <div className="col-md-6">
              <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                <Label htmlFor="testcode">
                  Testcode <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="testcode"
                  className="form-control shadow-sm"
                  value={inputData.testcode}
                  onChange={handleInputChange}
                  id="testcode"
                  placeholder="Enter Testcode"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                <Label htmlFor="advice">Advice:</Label>
                <Input
                  type="textarea"
                  name="advice"
                  value={inputData.advice}
                  className="form-control shadow-sm"
                  onChange={handleInputChange}
                  rows="2"
                  id="advice"
                  placeholder="Enter Advice"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="group" className="col-form-label">
                  Test Group:
                </Label>
                <Input
                  type="select"
                  name="group"
                  className="form-control shadow-sm"
                  value={inputData.group}
                  onChange={handleInputChange}
                  id="group"
                >
                  <option value="">Select Test Group</option>
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
                  className="form-control shadow-sm"
                  value={inputData.duration}
                  onChange={handleInputChange}
                  id="duration"
                  placeholder="Enter Duration"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup className="mt-3">
                <Label
                  for="New"
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#495057",
                    marginBottom: "5px",
                  }}
                >
                  Professional Fees
                </Label>
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
                  className="form-control shadow-sm"
                  value={inputData.why_the_test}
                  onChange={handleInputChange}
                  rows="2"
                  style={{
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                  id="why_the_test"
                  placeholder="Enter Why The Test Requires"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-md-6">
              <FormGroup>
                <Label
                  for="New"
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#495057",
                    marginBottom: "5px",
                  }}
                >
                  Species
                </Label>
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
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  )}
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label
                  className="col-form-label"
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#495057",
                    marginBottom: "5px",
                  }}
                >
                  Is It Popular Test ?
                </Label>
                <div
                  className="d-flex align-items-center"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "5px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <div
                    className="form-check me-3"
                    style={{
                      marginRight: "20px",
                    }}
                  >
                    <Input
                      type="radio"
                      name="is_popular"
                      value="Yes"
                      className="form-check-input"
                      id="radioYes"
                      checked={inputData.is_popular === "Yes"}
                      onChange={handlePopularChange}
                      style={{
                        marginRight: "5px",
                      }}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="radioYes"
                      style={{ fontSize: "14px", color: "#495057" }}
                    >
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
                      style={{
                        marginRight: "5px",
                      }}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="radioNo"
                      style={{ fontSize: "14px", color: "#495057" }}
                    >
                      No
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-md-6">
              <FormGroup style={{ marginBottom: "15px" }}>
                <Label
                  htmlFor="image"
                  className="col-form-label"
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#495057",
                    marginBottom: "5px",
                  }}
                >
                  Test Image:
                </Label>
                <Input
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  }}
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label
                  htmlFor="method"
                  className="col-form-label"
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#495057",
                    marginBottom: "5px",
                  }}
                >
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
                    border: "1px solid #ced4da",
                    borderRadius: "5px",
                    padding: "10px",

                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </FormGroup>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="container_id" className="col-form-label">
                  Container:
                </Label>
                <Input
                  type="select"
                  name="container_id"
                  value={inputData.container_id}
                  onChange={handleInputChange}
                  id="container_id"
                >
                  <option value="">Select Container</option>
                  {allContainerList?.data?.map((container) => (
                    <option key={container._id} value={container.id}>
                      {container.container_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                <Label htmlFor="hsn_code">
                  Hsn Code
                </Label>
                <Input
                  type="text"
                  name="hsn_code"
                  className="form-control shadow-sm"
                  value={inputData.hsn_code}
                  onChange={handleInputChange}
                  id="hsn_code"
                  placeholder="Enter hsn_code"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-md-6">
              <FormGroup>
                <Label
                  for="New"
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#495057",
                    marginBottom: "5px",
                  }}
                >
                  Parameter Group
                </Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={allparameterGrList?.data || []}
                  getOptionLabel={(option) => option?.name || ""}
                  value={selectedParameterGrList}
                  onChange={(event, newValue) => setparameterGrList(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Parameter Group"
                      placeholder="Select Parameter Group"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  )}
                />
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup>
                <Label
                  className="col-form-label"
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#495057",
                    marginBottom: "5px",
                  }}
                >
                  Is Prescription Required ?
                </Label>
                <div
                  className="d-flex align-items-center"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "5px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <div
                    className="form-check me-3"
                    style={{
                      marginRight: "20px",
                    }}
                  >
                    <Input
                      type="radio"
                      name="isPrescriptionRequired "
                      value="Yes"
                      className="form-check-input"
                      id="radioYes"
                      checked={inputData.isPrescriptionRequired === "Yes"}
                      onChange={handlePrescription}
                      style={{
                        marginRight: "5px",
                      }}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="radioYes"
                      style={{ fontSize: "14px", color: "#495057" }}
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="form-check">
                    <Input
                      type="radio"
                      name="isPrescriptionRequired "
                      value="No"
                      className="form-check-input"
                      id="radioNo"
                      checked={inputData.isPrescriptionRequired === "No"}
                      onChange={handlePrescription}
                      style={{
                        marginRight: "5px",
                      }}
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="radioNo"
                      style={{ fontSize: "14px", color: "#495057" }}
                    >
                      No
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            {priceCatalog.map((itemData, index) => (
              <div className="col-md-12 mb-2" key={index}>
                <FormGroup style={{ marginBottom: "15px" }}>
                  <Label
                    htmlFor={`category-${index}`}
                    className="col-form-label"
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#495057",
                      marginBottom: "5px",
                      display: "block",
                    }}
                  >
                    Price List {index + 1}
                  </Label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f8f9fa",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Dropdown for selecting item */}
                    <Input
                      type="select"
                      name={`category-${index}`}
                      id={`category-${index}`}
                      value={itemData.category_id}
                      onChange={(e) =>
                        handlePriceChange(index, "category_id", e.target.value)
                      }
                      style={{
                        marginRight: "10px",
                        padding: "8px 10px",
                        borderRadius: "5px",
                        border: "1px solid #ced4da",
                        backgroundColor: "#fff",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <option value="">Select Category</option>
                      {speciesCategoryList?.data?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                    </Input>

                    {/* Input for quantity */}
                    <Input
                      type="number"
                      name={`price-${index}`}
                      id={`price-${index}`}
                      value={itemData.price}
                      onChange={(e) =>
                        handlePriceChange(index, "price", e.target.value)
                      }
                      placeholder="Price"
                      style={{
                        marginRight: "10px",
                        padding: "8px 10px",
                        borderRadius: "5px",
                        border: "1px solid #ced4da",
                        backgroundColor: "#fff",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    />

                    <Input
                      type="number"
                      name={`sell_price-${index}`}
                      id={`sell_price-${index}`}
                      value={itemData.sell_price}
                      onChange={(e) =>
                        handlePriceChange(index, "sell_price", e.target.value)
                      }
                      placeholder="Discounted Price"
                      style={{
                        marginRight: "10px",
                        padding: "8px 10px",
                        borderRadius: "5px",
                        border: "1px solid #ced4da",
                        backgroundColor: "#fff",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    />

                    {/* Remove button */}
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => removePriceCatalog(index)}
                      style={{
                        color: "white",
                        backgroundColor: "#dc3545",
                        borderColor: "#dc3545",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        fontSize: "14px",
                      }}
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
                onClick={addPriceCatalog}
                size="sm"
                style={{
                  marginTop: "10px",
                  padding: "8px 20px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  border: "1px solid #007bff",
                  color: "#007bff",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Add Price
              </Button>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            {itemsData.map((itemData, index) => (
              <div className="col-md-6 mb-2" key={index}>
                <FormGroup style={{ marginBottom: "15px" }}>
                  <Label
                    htmlFor={`item-${index}`}
                    className="col-form-label"
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#495057",
                      marginBottom: "5px",
                      display: "block",
                    }}
                  >
                    Item {index + 1}
                  </Label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f8f9fa",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Dropdown for selecting item */}
                    <Input
                      type="select"
                      name={`item-${index}`}
                      id={`item-${index}`}
                      value={itemData.item}
                      onChange={(e) =>
                        handleItemChange(index, "item", e.target.value)
                      }
                      style={{
                        marginRight: "10px",
                        padding: "8px 10px",
                        borderRadius: "5px",
                        border: "1px solid #ced4da",
                        backgroundColor: "#fff",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <option value="">Select Item</option>
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
                      style={{
                        marginRight: "10px",
                        maxWidth: "120px",
                        padding: "8px 10px",
                        borderRadius: "5px",
                        border: "1px solid #ced4da",
                        backgroundColor: "#fff",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    />

                    {/* Remove button */}
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => removeItemField(index)}
                      style={{
                        color: "white",
                        backgroundColor: "#dc3545",
                        borderColor: "#dc3545",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        fontSize: "14px",
                      }}
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
                style={{
                  marginTop: "10px",
                  padding: "8px 20px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  border: "1px solid #007bff",
                  color: "#007bff",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Add Item
              </Button>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            {inputData.observation.map((obs, index) => (
              <div className="col-md-6 mb-2" key={index}>
                <FormGroup style={{ marginBottom: "15px" }}>
                  <Label
                    htmlFor={`observations-${index}`}
                    className="col-form-label"
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#495057",
                      marginBottom: "5px",
                      display: "block",
                    }}
                  >
                    Observation {index + 1}
                  </Label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f8f9fa",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Input
                      type="textarea"
                      name={`observation-${index}`}
                      value={obs}
                      onChange={(e) =>
                        handleObseravition(index, e.target.value)
                      }
                      rows="2"
                      id={`observation-${index}`}
                      style={{
                        flex: "1",
                        borderRadius: "5px",
                        padding: "10px",
                        border: "1px solid #ced4da",
                        backgroundColor: "#fff",
                        boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <Button
                        type="button"
                        color="primary"
                        onClick={() => removeObservationField(index)}
                        style={{
                          color: "white",
                          backgroundColor: "#dc3545",
                          borderColor: "#dc3545",
                          padding: "8px 12px",
                          borderRadius: "5px",
                          fontSize: "14px",
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
                style={{
                  marginTop: "10px",
                  padding: "8px 20px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  border: "1px solid #007bff",
                  color: "#007bff",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Add Observation
              </Button>
            </div>
          </div>

          <FormGroup className="mt-3">
            <Label for="selectTest" className="fw-bold">
              Select Sub Tests
            </Label>
            <Autocomplete
              multiple
              options={allTest.data || []}
              disableCloseOnSelect
              getOptionLabel={(option) =>
                `${option?.test_name}`
              }
              value={selectedTests}
              onChange={(event, newValue) =>
                setSelectedTests(newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Sub Tests"
                  placeholder="Select Sub Tests"
                />
              )}
            />
          </FormGroup>

          <Button
            type="submit"
            color="primary"
            disabled={isLoading}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              borderRadius: "5px",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Button shadow
            }}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" /> Submitting...
              </>
            ) : (
              "Add Test"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddTestList;
