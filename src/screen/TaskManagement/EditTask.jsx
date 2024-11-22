/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCategoryContext } from "../../helper/CategoryProvider";

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();


  const { getAllphlebotomist,phlebotomistList,getTaskDetails,taskdetails,editTask } = useCategoryContext();



  useEffect(() => {
    getAllphlebotomist();
  }, []);

  useEffect(() => {
    if (id) {
    getTaskDetails(id);
    }
  }, [id]);

  const [inputData, setInputData] = useState({
    task_title: "",
    description: "",
    alloted_to: [],
    status: "",
    target_compilation_date:"",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (taskdetails) {
      setInputData({
        task_title: taskdetails.data.task_title || "",
        description: taskdetails.data.description || "",
        alloted_to: taskdetails.data.alloted_to || [],
        status: taskdetails.data.status || "",
        target_compilation_date: taskdetails.data.target_compilation_date || "",
      });
      
      setSelectedProducts(taskdetails.data.assigned_phlebotomists_details || []);

    }
  }, [taskdetails]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };





  const handleSubmit = (e) => {
    e.preventDefault();

    const SelectedProductIdsCC = [
      ...selectedProducts.map((product) => product.id),
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
 
    SelectedProductIdsCC.forEach((id, index) => {
      formDataToSend.append(`associated_collection_centers[${index}]`, id);
    });


    editTask(id,formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Edit Task" />
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
            Edit Task
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditTask;
