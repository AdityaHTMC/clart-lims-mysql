/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCategoryContext } from "../../helper/CategoryProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useMasterContext } from "../../helper/MasterProvider";
const AddPhlebotomist = () => {
  const navigate = useNavigate();

  const {addphlebotomist,getAllCollection,collectionDropdown,getAllUnit,unitDropdown,getAllLabs,labDropdown} = useCategoryContext();

  const { getAlldistrictList, allDistrictList, getAllStateList, allStateList } =useMasterContext();



  const [inputData, setInputData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    pincode: "",
    stateId:"",
    districtId:"",
    image: "",
  });

  useEffect(() => {
    getAllCollection();
    getAllUnit();
    getAllStateList();
    getAllLabs();
    if (inputData.stateId){
      getAlldistrictList(inputData.stateId);
    }
  }, [inputData.stateId]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProducts2, setSelectedProducts2] = useState([]);
  const [selectedProducts3, setSelectedProducts3] = useState([]);
  const [pincode, setPincode] = useState("");
  const [pincodes, setPincodes] = useState([]);

  const handleAddPincode = () => {
    if (pincode) {
      setPincodes([...pincodes, pincode]);
      setPincode(""); // Clear the input field
    }
  };

  // Function to remove a pincode from the array
  const handleRemovePincode = (indexToRemove) => {
    setPincodes(pincodes.filter((_, index) => index !== indexToRemove));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
      // If state is selected, fetch districts for the selected state
  // if (name === 'stateId') {
  //   getAlldistrictList(value); // Call the API with the selected state's _id
  // }
  };

  const handleFileChange = (e) => {
    setInputData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store file object
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const allSelectedProductIds = [
      ...selectedProducts.map((product) => product.id),
    ];

    const allselectedlab = [
      ...selectedProducts2.map((product) => product.id),
    ];

    const allselectedunit = [
      ...selectedProducts3.map((product) => product.id),
    ];

    const selectedState = allStateList?.data?.find(
      (state) => state.id === Number(inputData.stateId)
    );
    const selectedDistrict = allDistrictList?.data?.find(
      (district) => district.id === Number(inputData.districtId)
    );



    const formDataToSend = new FormData();

    formDataToSend.append("name", inputData.name);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("address", inputData.address);
    formDataToSend.append("pincode", inputData.pincode);
    formDataToSend.append("state", selectedState?.state);
    formDataToSend.append("district", selectedDistrict?.district);
    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`associated_collection_centers[${index}]`, id);
    });
    allselectedlab.forEach((id, index) => {
      formDataToSend.append(`associated_lab[${index}]`, id);
    });
    allselectedunit.forEach((id, index) => {
      formDataToSend.append(`associated_unit[${index}]`, id);
    });

    pincodes.forEach((pin, index) => {
      formDataToSend.append(`serviceable_pincode[${index}]`, pin);
    });
    // // Append associated_labs with array index
    // allSelectedProduct2Ids.forEach((id, index) => {
    //   formDataToSend.append(`associated_units[${index}]`, id);
    // });

    if (inputData.image) {
      formDataToSend.append("image", inputData.image); // Append the file as binary
    }

    addphlebotomist(formDataToSend);

    console.log(formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Add Phlebotomist" parent="Physical" />
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
                <Label for="title">Phlebotomist Name *</Label>
                <Input
                  type="text"
                  name="name"
                  value={inputData.name}
                  onChange={handleInputChange}
                  id="name"
                  required
                />
              </FormGroup>
            </div>
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
                  required
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

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="stateId" className="col-form-label">
                  State:
                </Label>
                <Input
                  type="select"
                  name="stateId"
                  value={inputData.stateId}
                  onChange={handleInputChange}
                  id="stateId"
                >
                  <option value="">Select State</option>
                  {allStateList?.data?.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.state}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="districtId" className="col-form-label">
                  District:
                </Label>
                <Input
                  type="select"
                  name="districtId"
                  value={inputData.districtId}
                  onChange={handleInputChange}
                  id="districtId"
                  disabled={!inputData.stateId}
                >
                  <option value="">Select District</option>
                  {allDistrictList?.data?.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.district}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="New">Add New Collection Center</Label>
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
                <Label htmlFor="pincode" className="col-form-label">
                  PinCode:
                </Label>
                <Input
                  type="number"
                  name="pincode"
                  value={inputData.pincode}
                  onChange={handleInputChange}
                  id="address"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
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
                      label="Select Lab Center"
                      placeholder="Select lab Center"
                    />
                  )}
                />
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup>
                <Label for="New">Add New Unit Center</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={unitDropdown.data || []}
                  getOptionLabel={(option) => option?.organization_name || ""}
                  value={selectedProducts3}
                  onChange={(event, newValue) => setSelectedProducts3(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select unit Center"
                      placeholder="Select unit Center"
                    />
                  )}
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="pincode" className="col-form-label">
                  serviceable Pincode:
                </Label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    type="text"
                    name="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    id="pincode"
                    placeholder="Enter pincode"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddPincode}
                    style={{ marginLeft: "5px" }}
                  >
                    <AddLocationIcon />
                  </Button>
                </div>

                {/* Display Chips for each pincode */}
                <div style={{ marginTop: "10px" }}>
                  {pincodes.map((code, index) => (
                    <Chip
                      key={index}
                      label={code}
                      onDelete={() => handleRemovePincode(index)}
                      deleteIcon={<CancelIcon />}
                      style={{ margin: "5px" }}
                    />
                  ))}
                </div>
              </FormGroup>
            </div>

            <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="banner-image" className="col-form-label">
                Upload Image :
              </Label>
              <Input
                id="banner-image"
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </FormGroup>
            </div>
          </div>

          {/* Image previews */}
      
          <Button type="submit" color="primary">
            Add Phlebotomist
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddPhlebotomist;
