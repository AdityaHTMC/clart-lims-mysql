/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";

const AddTestParameter = () => {
  const navigate = useNavigate();

  const {
    getAllTest,
    alltest,
    getPPL,
    allPPL,
    addTestParameter,
    getDDunitList,
    allUnitList,
  } = useMasterContext();

  useEffect(() => {
    getAllTest();
    getDDunitList();
  }, []);

  console.log(allUnitList, "all unit list");

  const [inputData, setInputData] = useState({
    parameter: "",
    unit: "",
    upper_range: "",
    lower_range: "",
    parentId: "",
    test_id: "",
  });

  const [selectedTestId, setSelectedTestId] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTestSelect = (e) => {
    const testId = e.target.value;
    setSelectedTestId(testId);

    // Fetch parentId list based on selected testId
    if (testId) {
      getPPL(testId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("parameter", inputData.parameter);
    formDataToSend.append("parameter_unit_id", inputData.unit);
    formDataToSend.append("upper_range", inputData.upper_range);
    formDataToSend.append("lower_range", inputData.lower_range);
    formDataToSend.append("parentId", inputData.parentId || "");
    formDataToSend.append("testId", selectedTestId);

    addTestParameter(formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Add Test Parameter" />
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
                <Label for="parameter">Parameter *</Label>
                <Input
                  type="text"
                  name="parameter"
                  value={inputData.parameter}
                  onChange={handleInputChange}
                  id="parameter"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label for="unit">Choose Unit *</Label>
                <Input
                  type="select"
                  name="unit"
                  id="unit"
                  value={inputData.unit}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Unit</option>
                  {allUnitList?.data?.map((parent) => (
                    <option key={parent._id} value={parent._id}>
                      {parent.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
          </div>

          {/* First row with two col-md-6 */}
          <div className="row">
          <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="lower_range" className="col-form-label">
                  Lower Range:
                </Label>
                <Input
                  type="text"
                  name="lower_range"
                  value={inputData.lower_range}
                  onChange={handleInputChange}
                  id="lower_range"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="upper_range" className="col-form-label">
                  Upper Range:
                </Label>
                <Input
                  type="text"
                  name="upper_range"
                  value={inputData.upper_range}
                  onChange={handleInputChange}
                  id="upper_range"
                />
              </FormGroup>
            </div>
           
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="test">Choose Test *</Label>
                <Input
                  type="select"
                  name="test"
                  id="test"
                  value={selectedTestId}
                  onChange={handleTestSelect}
                  required
                >
                  <option value="">Select Test</option>
                  {alltest?.data?.map((test) => (
                    <option key={test._id} value={test._id}>
                      {test.test_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              {selectedTestId && allPPL && (
                <FormGroup>
                  <Label for="parentId">Choose Parent </Label>
                  <Input
                    type="select"
                    name="parentId"
                    id="parentId"
                    value={inputData.parentId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Parent</option>
                    {allPPL?.data?.map((parent) => (
                      <option key={parent._id} value={parent._id}>
                        {parent.parameter}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}
            </div>
          </div>

          <Button type="submit" color="primary">
            Add Test Parameter
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddTestParameter;
