/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Autocomplete, Chip, TextField } from "@mui/material";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";
import { useOrderContext } from "../../helper/OrderProvider";
import { useCommonContext } from "../../helper/CommonProvider";
import { toast } from "react-toastify";

const AddTestPackage = () => {
  const navigate = useNavigate();

  const {
    addtestPackage, getAllTest, alltest
  } = useMasterContext();

  const { test_package, getTestPackageList } = useOrderContext()
  const { getSpeciesCategoryList, speciesCategoryList } = useCommonContext()

  useEffect(() => {
    getAllTest()
    getTestPackageList()
    getSpeciesCategoryList()
  }, [])

  const [inputData, setInputData] = useState({
    package_name: "",
    description: "",
    tests: [],
    sample_type: "",
    turn_around_time: "",
    is_popular: "",
    hsn_code: "",
  });
  const [selectedPackages, setSelectedPackages] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [priceCatalog, setPriceCatalog] = useState([{
    category_id: '', sell_price: '', price: ''
  }])

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

    const allSelectedProductIds = [
      ...selectedProducts.map(product => product.id)
    ];

    const formDataToSend = new FormData();

    formDataToSend.append("package_name", inputData.package_name);
    formDataToSend.append("description", inputData.description);
    formDataToSend.append("sample_type", inputData.sample_type);
    formDataToSend.append("turn_around_time", inputData.turn_around_time);
    formDataToSend.append("is_popular", inputData.is_popular);
    formDataToSend.append("hsn_code", inputData.hsn_code);
    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`tests[${index}]`, parseInt(id, 10));
    });

    priceCatalog.forEach((item, index) => {
      formDataToSend.append(`catalogs[${index}][category_id]`, item?.category_id)
      formDataToSend.append(`catalogs[${index}][price]`, item?.price)
      formDataToSend.append(`catalogs[${index}][sell_price]`, item?.sell_price)
    })


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
          {/* <div className="row">
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
          </div> */}
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
