/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCategoryContext } from "../../helper/CategoryProvider";
import { toast } from "react-toastify";

const EditTestParameter = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getTpDetails, tpDetails, editLab, editTp } = useCategoryContext();

  const {
    getAllTest,
    alltest,
    getPPL,
    allPPL,
    addTestParameter,
    getDDunitList,
    allUnitList, getTestParaGr, allTestParaGr, getAllSpeciesList, allspecies
  } = useMasterContext();

  useEffect(() => {
    if (id) {
      getTpDetails(id);
    }
  }, [id]);

  useEffect(() => {
    getAllSpeciesList()
  }, [])



  const [inputData, setInputData] = useState({
    parameter: "",
    unit: "",
    upper_range: "",
    lower_range: "",
    parentId: "",
    test_id: "",
    group_id: "",
    species_id: ""
  });

  const [selectedTestId, setSelectedTestId] = useState("");
  useEffect(() => {
    if (tpDetails) {
      setInputData({
        parameter: tpDetails.data.parameter || "",
        unit: tpDetails.data.parameter_unit_id || "",
        upper_range: tpDetails.data.upper_range || [],
        lower_range: tpDetails.data.lower_range || "",
        parentId: tpDetails.data.parent_id || "",
        test_id: tpDetails.data.test_id || "",
        group_id: tpDetails.data.group_id || "",
        species_id: tpDetails.data.species_id || "",
      });
      setSelectedTestId(tpDetails.data.test_id);
    }
  }, [tpDetails]);


  useEffect(() => {
    getAllTest();
    getDDunitList();
    getTestParaGr(tpDetails?.data?.test_id);
  }, [tpDetails?.data?.test_id]);

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
    if (testId) {
      getPPL(testId);
      getTestParaGr(testId)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!inputData.species_id) {
      toast.info("Please select a species")
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("parameter", inputData.parameter);
    formDataToSend.append("parameter_unit_id", inputData.unit);
    formDataToSend.append("upper_range", inputData.upper_range);
    formDataToSend.append("lower_range", inputData.lower_range);
    formDataToSend.append("parent_id", inputData.parentId || "");
    formDataToSend.append("test_id", selectedTestId);
    formDataToSend.append("group_id", inputData.group_id);
    formDataToSend.append("species_id", inputData.species_id);

    editTp(id, formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Edit Test Parameter" />
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
            <div className="col-md-12">
              <FormGroup>
                <Label htmlFor="species_id">
                  Select Species
                </Label>
                <Input
                  type="select"
                  name="species_id"
                  id="species_id"
                  value={inputData.species_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Species</option>
                  {allspecies?.data?.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                      {breed.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
          </div>
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
                    <option key={parent._id} value={parent.id}>
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
                >
                  <option value="">Select Test</option>
                  {alltest?.data?.map((test) => (
                    <option key={test._id} value={test.id}>
                      {test.test_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              {selectedTestId && allPPL?.data?.length > 0 && (
                <FormGroup>
                  <Label for="parentId">Choose Parent Parameter </Label>
                  <Input
                    type="select"
                    name="parentId"
                    id="parentId"
                    value={inputData.parentId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Parent</option>
                    {allPPL?.data?.map((parent) => (
                      <option key={parent._id} value={parent.id}>
                        {parent.parameter}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}
            </div>
          </div>

          <div className="row">
            {tpDetails?.data?.group_name && (
              <div className="col-md-6">
                <FormGroup>
                  <Label for="group_id">Test Parameter Group </Label>
                  <Input
                    type="select"
                    name="group_id"
                    id="group_id"
                    value={inputData.group_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Test Parameter Group</option>
                    {allTestParaGr?.data?.map((parent) => (
                      <option key={parent._id} value={parent.id}>
                        {parent.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </div>
            )}
          </div>

          <Button type="submit" color="primary">
            Edit Test Parameter
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditTestParameter;
