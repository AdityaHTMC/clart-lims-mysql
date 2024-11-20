/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
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
    allspecies,getTestDetails,testDetails,editTest
  } = useMasterContext();

  const { getProfessionalFees, professionalFees } = useOrderContext();

  useEffect(() => {
    getAllTestCategory();
    getAllSpeciesList();
    getProfessionalFees();
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
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [preview, setPreview] = useState(null);
  const [priImages, setPriImages] = useState([]);
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
        image: testDetails.data.address || "",
      });
      setSelectedProducts(testDetails.data.test_species || []);
      setSelectedFees(testDetails.data.professional_fees || []);
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
 


    editTest(id,formDataToSend);
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
              <FormGroup>
                <Label for="test_name">Test Name *</Label>
                <Input
                  type="text"
                  name="test_name"
                  value={inputData.test_name}
                  onChange={handleInputChange}
                  id="test_name"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="price" className="col-form-label">
                  price:
                </Label>
                <Input
                  type="number"
                  name="price"
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
                <Label htmlFor="collection_fee" className="col-form-label">
                  Collection Fee:
                </Label>
                <Input
                  type="number"
                  name="collection_fee"
                  value={inputData.collection_fee}
                  onChange={handleInputChange}
                  id="collection_fee"
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
            <div className="col-md-12">
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
              <FormGroup className="mt-3">
                <Autocomplete
                  multiple
                  options={professionalFees?.data || []}
                  getOptionLabel={(option) =>
                    `${option?.name}` || ""
                  }
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
          <FormGroup>
            <Label htmlFor="image" className="col-form-label font-weight-bold">
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
            Add Test
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditTestList;
