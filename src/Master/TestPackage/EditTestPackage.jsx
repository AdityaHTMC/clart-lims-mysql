/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";

const EditTestPackage = () => {
  const navigate = useNavigate();
 const {id} = useParams()
  const {
    addtestPackage,getAllTest, alltest,TestPackageDetail,tpdetails,editTestPackage} = useMasterContext();

  useEffect(()=>{
    getAllTest()
  },[])

  useEffect(() => {
    if (id) {
    TestPackageDetail(id);
    }
  }, [id]);



  const [inputData, setInputData] = useState({
    package_name: "",
    description: "",
    tests: [],
    sample_type: "",
    turn_around_time: "",
    price: "",
    sell_price: "",
    is_popular: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);


  useEffect(() => {
    if (tpdetails) {
      setInputData({
        package_name: tpdetails.data.package_name || "",
        description: tpdetails.data.description || "",
        tests: tpdetails.data.tests || [],
        sample_type: tpdetails.data.sample_type || "",
        turn_around_time: tpdetails.data.turn_around_time || "",
        price: tpdetails.data.price || "",
        sell_price: tpdetails.data.sell_price || "",
        is_popular: tpdetails.data.is_popular || "",
      });
      setSelectedProducts(tpdetails.data.test_details || []);
    }
  }, [tpdetails]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePopularChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      is_popular: e.target.value,
    }));
  };

  const handleTestRemove = (testToRemove) => {
    setSelectedProducts((prev) =>
      prev.filter((test) => test._id !== testToRemove._id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allSelectedProductIds = [
      ...selectedProducts.map(product => product._id)
    ];
    
    const formDataToSend = new FormData();

    formDataToSend.append("package_name", inputData.package_name);
    formDataToSend.append("description", inputData.description);
    formDataToSend.append("sample_type", inputData.sample_type);
    formDataToSend.append("turn_around_time", inputData.turn_around_time);
    formDataToSend.append("price", inputData.price);
    formDataToSend.append("sell_price", inputData.sell_price );
    formDataToSend.append("is_popular", inputData.is_popular );
    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`tests[${index}]`, id);
    });
  
    editTestPackage(formDataToSend,id);


  };

  return (
    <>
      <CommonBreadcrumb title="Edit Test Package" />
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
                <Label for="package_name">Package Name *</Label>
                <Input
                  type="text"
                  name="package_name"
                  value={inputData.package_name}
                  onChange={handleInputChange}
                  id="package_name"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="description" className="col-form-label">
                  Description:
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={inputData.description}
                  onChange={handleInputChange}
                  id="description"
                />
              </FormGroup>
            </div>
          </div>

          {/* First row with two col-md-6 */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="mobile" className="col-form-label">
                  Sample Type:
                </Label>
                <Input
                  type="text"
                  name="sample_type"
                  value={inputData.sample_type}
                  onChange={handleInputChange}
                  id="sample_type"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="turn_around_time" className="col-form-label">
                  Turn Around Time (in Hours):
                </Label>
                <Input
                  type="text"
                  name="turn_around_time"
                  value={inputData.turn_around_time}
                  onChange={handleInputChange}
                  id="turn_around_time"
                />
              </FormGroup>
            </div>
          </div>

          {/* Second row with two col-md-6 */}

          {/* Continue adding pairs in rows */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="price" className="col-form-label">
                  Price(Rs.):
                </Label>
                <Input
                  type="text"
                  name="price"
                  value={inputData.price}
                  onChange={handleInputChange}
                  id="price"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="sell_price" className="col-form-label">
                  Sell Price:
                </Label>
                <Input
                  type="text"
                  name="sell_price"
                  value={inputData.sell_price}
                  onChange={handleInputChange}
                  id="sell_price"
                />
              </FormGroup>
            </div>
          </div>

          {/* Add the remaining inputs similarly, organizing them into rows as needed */}

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
        
    
    {/* Display selected tests in MUI Chip
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {selectedProducts.map((test) => (
        <Chip
          key={test._id}
          label={test.test_name}
          onDelete={() => handleTestRemove(test)}
          style={{ margin: 2 }}
        />
      ))}
    </div> */}
                <Label for="New">Test</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={alltest?.data || []}
                  getOptionLabel={(option) => option?.test_name || ""}
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

          <Button type="submit" color="primary">
            Add Test Package
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditTestPackage;
