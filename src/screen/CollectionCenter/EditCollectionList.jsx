/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCategoryContext } from "../../helper/CategoryProvider";

const EditCollectionList = () => {
  const navigate = useNavigate();
  const { id } = useParams();


  const { getCCDetails,CCDetails,getallstateList,getallDistrictList,allstateList,alldistrictList, getAllCollection,collectionDropdown,getAllUnit,unitDropdown,getAllLabs,labDropdown,editCC } = useCategoryContext();

  useEffect(() => {
    getAllCollection()
    getAllUnit()
    getallstateList();
    getAllLabs()
  }, []);

  useEffect(() => {
    if (id) {
        getCCDetails(id);
    }
  }, [id]);

  const [inputData, setInputData] = useState({
    organization_name: "",
    associated_unit_details: [],
    associated_lab_details: [],
    contact_person: "",
    country: "",
    district: "",
    email: "",
    mobile: "",
    state: "",
    pincode: "",
    address: "",
    geofencing_km: "",
    serviceable_pin_code:"",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProducts2, setSelectedProducts2] = useState([]);

  useEffect(() => {
    if (CCDetails) {
      setInputData({
        organization_name: CCDetails.data.organization_name || "",
        contact_person: CCDetails.data.contact_person || "",
        tests: CCDetails.data.tests || [],
        country: CCDetails.data.country || "",
        email: CCDetails.data.email || "",
        mobile: CCDetails.data.mobile || "",
        state: CCDetails.data.state || "",
        district: CCDetails.data.district || "",
        geofencing_km: CCDetails.data.geofencing_km || "",
        serviceable_pin_code: CCDetails.data.serviceable_pin_code || "",
        pincode: CCDetails.data.pincode || "",
        address: CCDetails.data.address || "",
      });
      if(allstateList?.data?.length > 0){
        const selectedState = allstateList?.data?.find((state) => state.state === CCDetails.data.state);
      
        if (selectedState) {
          // Pass the selected state's _id to get the district list
          getallDistrictList(selectedState.id);
        }
      }
      setSelectedProducts(CCDetails.data.associated_lab_details || []);
      setSelectedProducts2(CCDetails.data.associated_unit_details || []);
    }
  }, [CCDetails]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStateChange = (e) => {
    const selectedStateName = e.target.value;
    setInputData({ ...inputData, state: selectedStateName, district: '' }); // Update state and reset district

    // Find the selected state object based on the state name
    const selectedState = allstateList?.data?.find((state) => state.state === selectedStateName);
    
    if (selectedState) {
      // Pass the selected state's _id to get the district list
      getallDistrictList(selectedState.id);
    }
  };

  const handleDistrictChange = (e) => {
    setInputData({ ...inputData, district: e.target.value });
  };


  const handleTestRemove = (testToRemove) => {
    setSelectedProducts((prev) =>
      prev.filter((test) => test._id !== testToRemove._id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const SelectedProductIdsLL = [
      ...selectedProducts.map((product) => product.id),
    ];

    const SelectedProduct2IdsUl = [
        ...selectedProducts2.map((product) => product.id),
      ];

    const formDataToSend = new FormData();

    formDataToSend.append("organization_name", inputData.organization_name);
    formDataToSend.append("contact_person", inputData.contact_person);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("address", inputData.address);
    formDataToSend.append("district", inputData.district);
    formDataToSend.append("state", inputData.state);
    formDataToSend.append("pincode", inputData.pincode);
    formDataToSend.append("geofencing_km", inputData.geofencing_km);
    formDataToSend.append("serviceable_pin_code", inputData.serviceable_pin_code);

    SelectedProductIdsLL.forEach((id, index) => {
      formDataToSend.append(`associated_labs[${index}]`, id);
    });

    SelectedProduct2IdsUl.forEach((id, index) => {
      formDataToSend.append(`associated_units[${index}]`, id);
    });

    editCC(id,formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Edit Collection" />
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
                <Label for="organization_name">organization Name </Label>
                <Input
                  type="text"
                  name="organization_name"
                  value={inputData.organization_name}
                  onChange={handleInputChange}
                  id="organization_name"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="contact_person" className="col-form-label">
                  Contact Person:
                </Label>
                <Input
                  type="text"
                  name="contact_person"
                  value={inputData.contact_person}
                  onChange={handleInputChange}
                  id="contact_person"
                />
              </FormGroup>
            </div>
          </div>

   
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="email" className="col-form-label">
                  Email:
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
                <Label htmlFor="mobile" className="col-form-label">
                  mobile:
                </Label>
                <Input
                  type="number"
                  name="mobile"
                  value={inputData.mobile}
                  onChange={handleInputChange}
                  id="mobile"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="geofencing_km" className="col-form-label">
                 Geofencing km:
                </Label>
                <Input
                  type="number"
                  name="geofencing_km"
                  value={inputData.geofencing_km}
                  onChange={handleInputChange}
                  id="geofencing_km"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="serviceable_pin_code" className="col-form-label">
                Serviceable Pin Code:
                </Label>
                <Input
                  type="number"
                  name="mobile"
                  value={inputData.serviceable_pin_code}
                  onChange={handleInputChange}
                  id="serviceable_pin_code"
                />
              </FormGroup>
            </div>
          </div>

      
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="pincode" className="col-form-label">
                  Pincode
                </Label>
                <Input
                  type="number"
                  name="pincode"
                  value={inputData.pincode}
                  onChange={handleInputChange}
                  id="pincode"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="address" className="col-form-label">
                  Address
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
                <Label htmlFor="state" className="col-form-label">
                  State:
                </Label>
                <Input
                  type="select"
                  name="state"
                  value={inputData.state}
                  onChange={handleStateChange}
                  id="state"
                >
                  <option value="">Select State</option>
                  {allstateList?.data?.map((state) => (
                    <option key={state._id} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="district" className="col-form-label">
                  District:
                </Label>
                <Input
                  type="select"
                  name="district"
                  value={inputData.district}
                  onChange={handleDistrictChange}
                  id="district"
                 
                >
                  <option value="">Select District</option>
                  {alldistrictList?.data?.map((district) => (
                    <option key={district._id} value={district.district}>
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
                <Label for="New">Associated Lab Centers</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={labDropdown?.data || []}
                  getOptionLabel={(option) => option?.organization_name || ""}
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
                <Label for="New">Associated Unit Details</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={unitDropdown?.data || []}
                  getOptionLabel={(option) => option?.organization_name || ""}
                  value={selectedProducts2}
                  onChange={(event, newValue) => setSelectedProducts2(newValue)}
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
          </div>

          <Button type="submit" color="primary">
            Edit
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditCollectionList;
