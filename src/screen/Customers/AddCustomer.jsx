/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus } from "react-icons/fa";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";
import { Autocomplete, TextField } from "@mui/material";
const AddCustomer = () => {
  const navigate = useNavigate();

  const { addBreed, allBreedList, allbreed,addCustomer,getSpeciesMasterList,speciesMasterList } = useMasterContext();
  useEffect(() => {
    allBreedList();
    getSpeciesMasterList();
  }, []);

  console.log(allbreed, "allBreedList");

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    mobile: "",
    image: "",
    address: "",
    password: "",
    city: "",
    state: "",
    district: "",
    pet: [
      {
        date_of_birth: "",
        sex: "",
        color: "",
        breed: "", 
        species: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle input changes for each pet
  const handleBreedChange = (e, index) => {
    const { value } = e.target;
    const updatedPets = [...inputData.pet];
    updatedPets[index].breed = value;
    setInputData((prevData) => ({
      ...prevData,
      pet: updatedPets,
    }));
  };

  const handleSpeciesChange = (e, index) => {
    const { value } = e.target;
    const updatedPets = [...inputData.pet];
    updatedPets[index].species = value;
    setInputData((prevData) => ({
      ...prevData,
      pet: updatedPets,
    }));
  };

  const handlePetChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPets = [...inputData.pet];
    updatedPets[index][name] = value;
    setInputData((prevData) => ({
      ...prevData,
      pet: updatedPets,
    }));
  };

  // Add new pet entry
  const handleAddPet = () => {
    setInputData((prevData) => ({
      ...prevData,
      pet: [
        ...prevData.pet,
        {
          date_of_birth: "",
          sex: "",
          color: "",
          breed: "", 
          species:''
        },
      ],
    }));
  };


  // Remove pet entry
  const handleRemovePet = (index) => {
    const updatedPets = inputData.pet.filter((_, i) => i !== index);
    setInputData((prevData) => ({
      ...prevData,
      pet: updatedPets,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("name", inputData.name);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("address", inputData.address);
    formDataToSend.append("password", inputData.password);
    formDataToSend.append("city", inputData.city);
    formDataToSend.append("state", inputData.state);
    formDataToSend.append("district", inputData.district);

    inputData.pet.forEach((pet, index) => {
      formDataToSend.append(`pet[${index}][date_of_birth]`, pet.date_of_birth);
      formDataToSend.append(`pet[${index}][sex]`, pet.sex);
      formDataToSend.append(`pet[${index}][color]`, pet.color);
      formDataToSend.append(`pet[${index}][breed]`, pet.breed);
      formDataToSend.append(`pet[${index}][species]`, pet.species);
    });

    // inputData.images.forEach((image, index) => {
    //   formDataToSend.append(`images[${index}]`, image);
    // });

    addCustomer(formDataToSend);

    console.log(formDataToSend);
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
                <Label for="name"> Name *</Label>
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
                  Email:
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
                  Mobile:
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
                <Label htmlFor="password" className="col-form-label">
                  Password:
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={inputData.password}
                  onChange={handleInputChange}
                  id="password"
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
                  type="text"
                  name="state"
                  value={inputData.state}
                  onChange={handleInputChange}
                  id="state"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="district" className="col-form-label">
                  District:
                </Label>
                <Input
                  type="text"
                  name="district"
                  value={inputData.district}
                  onChange={handleInputChange}
                  id="district"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            {/* Pets Section */}
            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
              <h5 className="mb-0">Pets</h5>
              <Button color="primary" onClick={handleAddPet} className="mr-3">
                <FaPlus /> Add Pet
              </Button>
            </div>

            {inputData.pet.map((pet, index) => (
              <Card className="mb-3" key={index}>
                <CardBody>
                  <div className="row">
                    <div className="col-md-2">
                      <FormGroup>
                        <Label for={`date_of_birth_${index}`}>
                          Date of Birth
                        </Label>
                        <Input
                          type="date"
                          id={`date_of_birth_${index}`}
                          name="date_of_birth"
                          value={pet.date_of_birth}
                          onChange={(e) => handlePetChange(e, index)}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-2">
                      <FormGroup>
                        <Label for={`sex_${index}`}>Sex</Label>
                        <Input
                          type="text"
                          id={`sex_${index}`}
                          name="sex"
                          value={pet.sex}
                          onChange={(e) => handlePetChange(e, index)}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-2">
                      <FormGroup>
                        <Label for={`color_${index}`}>Color</Label>
                        <Input
                          type="text"
                          id={`color_${index}`}
                          name="color"
                          value={pet.color}
                          onChange={(e) => handlePetChange(e, index)}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-2">
                      <FormGroup>
                        <Label for={`breed-${index}`}>Breed</Label>
                        <Input
                          type="select"
                          name="breed"
                          id={`breed-${index}`}
                          value={pet.breed}
                          onChange={(e) => handleBreedChange(e, index)}
                        >
                          <option value="">Select Breed</option>
                          {allbreed?.data?.map((breed) => (
                            <option key={breed._id} value={breed.name}>
                              {breed.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-2">
                      <FormGroup>
                        <Label for={`species-${index}`}>Species</Label>
                        <Input
                          type="select"
                          name="species"
                          id={`species-${index}`}
                          value={pet.species}
                          onChange={(e) => handleSpeciesChange(e, index)}
                        >
                          <option value="">Select Species</option>
                          {speciesMasterList?.data?.map((breed) => (
                            <option key={breed._id} value={breed.title}>
                              {breed.title}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-12 text-right">
                      <ButtonGroup>
                        <Button
                          color="danger"
                          onClick={() => handleRemovePet(index)}
                          className="ml-2"
                        >
                          <FaTrash />
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <Button type="submit" color="primary">
            Add Customer
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
