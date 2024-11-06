/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";
import { useCategoryContext } from "../../helper/CategoryProvider";

const AddTask = () => {
  const navigate = useNavigate();

  const { addtask} = useMasterContext();
  const {getAllphlebotomist,phlebotomistList} = useCategoryContext();



  useEffect(()=>{

    getAllphlebotomist()
  },[])

  const [inputData, setInputData] = useState({
    task_title: "",
    description: "",
    alloted_to: [],
    status: "",
    target_compilation_date:"",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const allSelectedProductIds = [
      ...selectedProducts.map(product => product._id)
    ];
    


    const formDataToSend = new FormData();

    formDataToSend.append("task_title", inputData.task_title);
    formDataToSend.append("description", inputData.description);
    formDataToSend.append("status", inputData.status);
    formDataToSend.append("target_compilation_date", inputData.target_compilation_date);
    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`alloted_to[${index}]`, id);
    });
  

    addtask(formDataToSend);


  };

  return (
    <>
      <CommonBreadcrumb title="Add Task" />
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
                <Label for="task_title">Task Title *</Label>
                <Input
                  type="text"
                  name="task_title"
                  value={inputData.task_title}
                  onChange={handleInputChange}
                  id="task_title"
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
                <Label for="status">Change Status</Label>
                <Input
                  type="select"
                  name="status"
                  value={inputData.status}
                  onChange={handleInputChange}
                  id="status"
                >
                  <option value="">Select task Status</option>
                  <option value="Allocated">Allocated</option>
                  <option value="Done">Done</option>
                  <option value="Pending">Pending</option>
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label
                  htmlFor="target_compilation_date"
                  className="col-form-label"
                >
                  Target Compilation Date:
                </Label>
                <Input
                  type="date"
                  name="target_compilation_date"
                  value={inputData.target_compilation_date}
                  onChange={handleInputChange}
                  id="target_compilation_date"
                />
              </FormGroup>
            </div>
          </div>



          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="New">Phlebotomist</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={phlebotomistList?.data || []}
                  getOptionLabel={(option) => option?.name || ""}
                  value={selectedProducts}
                  onChange={(event, newValue) => setSelectedProducts(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Phlebotomist"
                      placeholder="Select Phlebotomist"
                    />
                  )}
                />
              </FormGroup>
            </div>
          </div>

          <Button type="submit" color="primary">
            Add Task
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
