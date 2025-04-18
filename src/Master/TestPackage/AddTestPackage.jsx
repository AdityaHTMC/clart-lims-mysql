/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Autocomplete, Chip, TextField } from "@mui/material";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";
import { useOrderContext } from "../../helper/OrderProvider";

const AddTestPackage = () => {
  const navigate = useNavigate();

  const {
    addtestPackage, getAllTest, alltest
  } = useMasterContext();

  const { test_package, getTestPackageList } = useOrderContext()

  useEffect(() => {
    getAllTest()
    getTestPackageList()
  }, [])

  const [inputData, setInputData] = useState({
    package_name: "",
    description: "",
    tests: [],
    sample_type: "",
    turn_around_time: "",
    price: "",
    sell_price: "",
    is_popular: "",
    hsn_code: "",
  });
  const [selectedPackages, setSelectedPackages] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : ["turn_around_time", "price", "sell_price"].includes(name)
            ? parseInt(value, 10) || 0
            : value,
    }));
  };



  const handlePopularChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      is_popular: e.target.value,
    }));
  };

  const onPackageSelect = (data) => {
    setSelectedPackages(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allSelectedProductIds = [
      ...selectedProducts.map(product => product.id)
    ];



    const formDataToSend = new FormData();

    formDataToSend.append("package_name", inputData.package_name);
    formDataToSend.append("description", inputData.description);
    formDataToSend.append("sample_type", inputData.sample_type);
    formDataToSend.append("turn_around_time", inputData.turn_around_time);
    formDataToSend.append("price", inputData.price);
    formDataToSend.append("sell_price", inputData.sell_price);
    formDataToSend.append("is_popular", inputData.is_popular);
    formDataToSend.append("hsn_code", inputData.hsn_code);
    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`tests[${index}]`, parseInt(id, 10));
    });

    selectedPackages?.forEach((el, index) => {
      formDataToSend.append(`packages[${index}]`, el.id)
    })

    addtestPackage(formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Add Test Package" />
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
                  type="number"
                  name="turn_around_time"
                  min={0}
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
                  Price(Rs):
                </Label>
                <Input
                  type="number"
                  name="price"
                  min={0}
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
                  type="number"
                  name="sell_price"
                  min={0}
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

          <div className="row">
            <div className="col-md-6">
              <FormGroup className="mt-3">
                <Label for="selectPackage" className="fw-bold">
                  Select Package
                </Label>
                <Autocomplete
                  multiple
                  options={test_package?.data || []}
                  getOptionLabel={(option) =>
                    `${option?.package_name}`
                  }
                  disableCloseOnSelect
                  value={selectedPackages}
                  onChange={(event, newValue) =>
                    onPackageSelect(newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Health Package"
                      placeholder="Select Health Package"
                    />
                  )}
                />
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

          <Button type="submit" color="primary">
            Add Test Package
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddTestPackage;
