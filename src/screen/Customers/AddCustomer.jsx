/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  FormGroup,
  FormText,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus } from "react-icons/fa";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";
import { useCategoryContext } from "../../helper/CategoryProvider";

const AddCustomer = () => {
  const navigate = useNavigate();

  const {  allBreedList,addCustomer,getSpeciesMasterList } = useMasterContext();

  const {getallstateList,getallDistrictList,allstateList,alldistrictList} = useCategoryContext();
  useEffect(() => {
    allBreedList();
    getSpeciesMasterList();
    getallstateList();
  }, []);

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    mobile: "",
    image: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    district: "",

  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && value.length > 10) {
      setError("Mobile number cannot exceed 10 digits"); // Set error message
      return;
    } else {
      setError(""); // Clear error message if valid
    }
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setInputData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store file object
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


  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataToSend = new FormData();

    formDataToSend.append("name", inputData.name);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("address", inputData.address);
    formDataToSend.append("pincode", inputData.pincode);
    formDataToSend.append("city", inputData.city);
    formDataToSend.append("district", inputData.district);
    formDataToSend.append("state", inputData.state);

    if (inputData.image) {
      formDataToSend.append("image", inputData.image); // Append the file as binary
    }


    // inputData.pet.forEach((pet, index) => {
    //   formDataToSend.append(`pet[${index}][date_of_birth]`, pet.date_of_birth);
    //   formDataToSend.append(`pet[${index}][sex]`, pet.sex);
    //   formDataToSend.append(`pet[${index}][color]`, pet.color);
    //   formDataToSend.append(`pet[${index}][breed]`, pet.breed);
    //   formDataToSend.append(`pet[${index}][species]`, pet.species);
    // });

    // inputData.images.forEach((image, index) => {
    //   formDataToSend.append(`images[${index}]`, image);
    // });

    try {
      await addCustomer(formDataToSend);;
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <>
      <CommonBreadcrumb title="Add Customer" parent="Physical" />
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
                <Label for="name"> Name  <span className="text-danger">*</span></Label>
                <Input
                  type="text"
                  name="name"
                  value={inputData.name}
                  onChange={handleInputChange}
                  id="organization_name"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="email" className="col-form-label">
                  Email <span className="text-danger">*</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={inputData.email}
                  onChange={handleInputChange}
                  id="email"
                  required
                />
              </FormGroup>
            </div>
          </div>

          {/* Add the remaining inputs similarly, organizing them into rows as needed */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="mobile" className="col-form-label">
                  Mobile <span className="text-danger">*</span>
                </Label>
                <Input
                  type="number"
                  name="mobile"
                  min={0}
                  value={inputData.mobile}
                  onChange={handleInputChange}
                  id="mobile"
                  required
                />
                {error && <FormText color="danger">{error}</FormText>} 
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
                <Label htmlFor="pincode" className="col-form-label">
                  Pincode <span className="text-danger">*</span>
                </Label>
                <Input
                  type="number"
                  name="pincode"
                  min={0}
                  value={inputData.pincode}
                  onChange={handleInputChange}
                  id="pincode"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="city" className="col-form-label">
                  city:
                </Label>
                <Input
                  type="text"
                  name="city"
                  value={inputData.city}
                  onChange={handleInputChange}
                  id="city"
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
                  disabled={!inputData.state} // Disable until a state is selected
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

          <Button type="submit" color="primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner size="sm" /> Submitting...
              </>
            ) : (
              "Add Customer"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
