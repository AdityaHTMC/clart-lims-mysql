/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row, Spinner } from "reactstrap";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCategoryContext } from "../../helper/CategoryProvider";
import { useOrderContext } from "../../helper/OrderProvider";
import { useMasterContext } from "../../helper/MasterProvider";
import { FaTrashAlt } from "react-icons/fa";

const EditTestList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    addlab,
    getAllTestCategory,
    addTest,
    alltestCategory,
    getAllSpeciesList,
    allspecies,
    getTestDetails,
    testDetails,
    editTest,
    getAllItemList,
    allItemList,
    getAllConatinerList,
    allContainerList,
  } = useMasterContext();

  const { getProfessionalFees, professionalFees } = useOrderContext();

  useEffect(() => {
    getAllTestCategory();
    getAllSpeciesList();
    getProfessionalFees();
    getAllItemList();
    getAllConatinerList();
  }, []);

  useEffect(() => {
    if (id) {
      getTestDetails(id);
    }
  }, [id]);

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
    container_id: "",
    hsn_code: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [observationsList, setObservations] = useState([""]);
  const [itemDataList, setItemDataList] = useState([""]);
  const [preview, setPreview] = useState(null);
  const [priImages, setPriImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (testDetails) {
      setInputData({
        test_name: testDetails.data.test_name || "",
        group: testDetails.data.group_id || "",
        price: testDetails.data.price || [],
        sell_price: testDetails.data.sell_price || "",
        collection_fee: testDetails.data.collection_fee || "",
        is_popular: testDetails.data.is_popular || "",
        testcode: testDetails.data.testcode || "",
        advice: testDetails.data.advice || "",
        duration: testDetails.data.duration || "",
        test_preparation: testDetails.data.test_preparation || "",
        why_the_test: testDetails.data.why_the_test || "",
        method: testDetails.data.method || "",
        image: testDetails.data.address || "",
        container_id: testDetails.data.container_id || "",
        hsn_code: testDetails.data.hsn_code || "",
      });
      setSelectedProducts(testDetails.data.test_species || []);
      setSelectedFees(testDetails.data.professional_fees || []);
      setObservations(testDetails.data.observations || []);
      setItemDataList(testDetails.data.items || []);
    }
  }, [testDetails]);

  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPriImages(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const removeImage = () => {
    setPriImages(null);
    setPreview(null);
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

  const handleObservationChange = (index, value) => {
    const updatedObservations = [...observationsList];
    updatedObservations[index] = value;
    setObservations(updatedObservations);
  };

  const addObservationField = () => {
    setObservations((prevState) => [...prevState, ""]);
  };

  const removeObservationField = (index) => {
    setObservations((prevState) => prevState.filter((_, i) => i !== index));
  };

  // item handling

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...itemDataList];
    updatedItems[index][key] = value;
    setItemDataList(updatedItems);
  };

  // Add a new item field
  const addItemField = () => {
    setItemDataList((prevState) => [
      ...prevState,
      { id: "", name: "", quantity: "" },
    ]);
  };

  // Remove an item field by index
  const removeItemField = (index) => {
    setItemDataList((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const allSelectedProductIds = [
      ...selectedProducts.map((product) => product.id),
    ];

    const allSelectedfeesIds = [...selectedFees.map((product) => product.id)];

    const combinedObservations = [...observationsList];

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
    formDataToSend.append("is_popular", inputData.is_popular);
    formDataToSend.append("method", inputData.method);
    formDataToSend.append("container_id", inputData.container_id);
    formDataToSend.append("hsn_code", inputData.hsn_code);
    if (inputData.image) {
      formDataToSend.append("image", inputData.image);
    }

    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`species[${index}]`, parseInt(id, 10));
    });

    allSelectedfeesIds.forEach((id, index) => {
      formDataToSend.append(`professional_fees[${index}]`, parseInt(id, 10));
    });

    combinedObservations.forEach((obs, index) => {
      formDataToSend.append(`observations[${index}]`, obs);
    });

    itemDataList.forEach((item, index) => {
      formDataToSend.append(`items[${index}][item_id]`, item.id); // Send only the ID
      formDataToSend.append(`items[${index}][quantity]`, item.quantity);
    });

    try {
      await editTest(id, formDataToSend);
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CommonBreadcrumb title="Edit Test" />
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
              <FormGroup className="mb-3">
                <Label for="test_name">
                  Test Name <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="test_name"
                  className="form-control shadow-sm"
                  value={inputData.test_name}
                  onChange={handleInputChange}
                  id="test_name"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup className="mb-3">
                <Label htmlFor="price" className="col-form-label">
                  price: <span className="text-danger">*</span>
                </Label>
                <Input
                  type="number"
                  name="price"
                  className="form-control shadow-sm"
                  value={inputData.price}
                  onChange={handleInputChange}
                  id="price"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="sell_price" className="col-form-label">
                  Sell Price:
                </Label>
                <Input
                  type="number"
                  name="sell_price"
                  value={inputData.sell_price}
                  onChange={handleInputChange}
                  id="sell_price"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="test_preparation" className="col-form-label">
                  Test Preparation:
                </Label>
                <Input
                  type="textarea"
                  name="test_preparation"
                  value={inputData.test_preparation}
                  onChange={handleInputChange}
                  id="test_preparation"
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
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="testcode" className="col-form-label">
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
              <FormGroup>
                <Label htmlFor="advice" className="col-form-label">
                  Advice:
                </Label>
                <Input
                  type="textarea"
                  name="advice"
                  value={inputData.advice}
                  onChange={handleInputChange}
                  rows="2"
                  style={{
                    borderRadius: "5px",
                    padding: "10px",
                  }}
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
                  getOptionLabel={(option) => `${option?.name}` || ""}
                  value={selectedFees}
                  onChange={(event, newValue) => setSelectedFees(newValue)}
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
                      label="Select Test"
                      placeholder="Select Test"
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
                <Label
                  htmlFor="image"
                  className="col-form-label font-weight-bold"
                >
                  Add New Test Image:
                </Label>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleSingleImageChange}
                  accept="image/*"
                  style={{ borderRadius: "5px", padding: "5px" }}
                />
              </FormGroup>
              <div>
                {preview && (
                  <div
                    style={{
                      position: "relative",
                      margin: "5px",
                      marginBottom: "10px",
                    }}
                  >
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
                      <FaTrashAlt style={{ color: "red", fontSize: "18px" }} />
                    </button>
                  </div>
                )}
              </div>
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
              <FormGroup>
                <Label htmlFor="hsn_code" className="col-form-label">
                  Hsn Code:
                </Label>
                <Input
                  type="text"
                  name="hsn_code"
                  value={inputData.hsn_code}
                  onChange={handleInputChange}
                  id="hsn_code"
                />
              </FormGroup>
            </div>
          </div>

          <FormGroup>
            <label className="mb-3 mt-3">Observations:</label>

            {observationsList.length === 0 ? (
              <>
                <p>No observations found.</p>
              </>
            ) : (
              observationsList.map((obs, index) => (
                <Row key={index} style={{ marginBottom: "10px" }}>
                  <Col md={10}>
                    <Input
                      type="textarea"
                      value={obs}
                      onChange={(e) =>
                        handleObservationChange(index, e.target.value)
                      }
                      rows="2"
                    />
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    <Button
                      color="danger"
                      outline
                      size="sm"
                      onClick={() => removeObservationField(index)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              ))
            )}

            <Button
              color="primary"
              outline
              onClick={addObservationField}
              size="sm"
              style={{ marginTop: "10px" }}
            >
              Add Observation
            </Button>
          </FormGroup>

          <FormGroup>
            <label className="mb-3 mt-3">Items:</label>
            {itemDataList.length === 0 ? (
              <p>No items found.</p>
            ) : (
              itemDataList.map((item, index) => (
                <Row key={index} style={{ marginBottom: "10px" }}>
                  {/* Item Dropdown */}
                  <Col md={5}>
                    <Input
                      type="select"
                      value={item.id} // Use `id` as the value to store the selected item ID
                      onChange={(e) =>
                        handleItemChange(index, "id", e.target.value)
                      } // Update item ID on change
                    >
                      <option value="">Select Item</option>
                      {allItemList?.data?.map((dropdownItem) => (
                        <option key={dropdownItem.id} value={dropdownItem.id}>
                          {dropdownItem.name}{" "}
                          {/* Display the item name in the dropdown */}
                        </option>
                      ))}
                    </Input>
                  </Col>
                  {/* Item Quantity */}
                  <Col md={3}>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      placeholder="Quantity"
                    />
                  </Col>
                  {/* Remove Button */}
                  <Col md={2} className="d-flex align-items-center">
                    <Button
                      color="danger"
                      outline
                      size="sm"
                      onClick={() => removeItemField(index)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              ))
            )}
            <Button
              color="primary"
              outline
              onClick={addItemField}
              size="sm"
              style={{ marginTop: "10px" }}
            >
              Add Item
            </Button>
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
              "Edit Test"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditTestList;
