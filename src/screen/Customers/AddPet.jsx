/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useCategoryContext } from "../../helper/CategoryProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";

const AddPet = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { allBreedList, allbreed, getSpeciesMasterList, speciesMasterList } =
    useMasterContext();

  useEffect(() => {
    allBreedList();
    getSpeciesMasterList();
  }, []);

  const [inputData, setInputData] = useState({
    date_of_birth: "",
    sex: "",
    color: "",
    breed: "",
    species: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //   const handleBreedChange = (e) => {
  //     setInputData((prevData) => ({
  //       ...prevData,
  //       breed: e.target.value,
  //     }));
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", inputData);

  };

  return (
    <>
      <CommonBreadcrumb title="Add Pet" parent="Physical" />
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
                <Label htmlFor="species">Species</Label>
                <Input
                  type="select"
                  name="species"
                  value={inputData.species}
                  onChange={handleInputChange}
                >
                  <option value="">Select species</option>
                  {speciesMasterList?.data?.map((breed) => (
                    <option key={breed._id} value={breed.name}>
                      {breed.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="breed">Breed</Label>
                <Input
                  type="select"
                  name="breed"
                  value={inputData.breed}
                  onChange={handleInputChange}
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
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="color">Color:</Label>
                <Input
                  type="text"
                  name="color"
                  value={inputData.color}
                  onChange={handleInputChange}
                  id="color"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="sex">Gender:</Label>
                <Input
                  type="text"
                  name="sex"
                  value={inputData.sex}
                  onChange={handleInputChange}
                  id="sex"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  type="date"
                  name="date_of_birth"
                  value={inputData.date_of_birth}
                  onChange={handleInputChange}
                  id="date_of_birth"
                />
              </FormGroup>
            </div>
          </div>

          <Button type="submit" color="primary">
            Add Pet
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddPet;
