/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import { FaTrashAlt } from "react-icons/fa";

import { Spinner } from "reactstrap";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Pagination, Stack } from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const TimeSlotsList = () => {
  const navigate = useNavigate();

  const {
    getTimeList,
    timeListdata,
    addTimeMaster,
    editTimeMaster,
    timeDelete,
  } = useMasterContext();

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
    timeListdata?.total && Math.ceil(timeListdata?.total / itemperPage);

  const [selectedvarity, setSelectedvarity] = useState({
    start_time: "",
    end_time: "",
    id: "",
  });

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getTimeList(dataToSend);
  }, [currentPage]);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onOpenModal2 = (product) => {
    setSelectedvarity(product);
    setModalOpen(true);
  };

  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedvarity({ start_time: "", end_time: "", _id: "" });
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({ start_time: "", end_time: "", _id: "" });
  };

  // Handle form input change
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setSelectedvarity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle submit for updating the brand
  const handleSubmits = () => {
    editTimeMaster(selectedvarity.id, selectedvarity);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this?")) {
      // delete product logic here
      timeDelete(id);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleTimeChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value ? value.format("hh:mm A") : "", // Format time as hh:mm AM/PM
    }));
  };

  const handleEditTimeChange = (field, value) => {
    setSelectedvarity((prev) => ({
      ...prev,
      [field]: value ? value.format("hh:mm A") : "",
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.start_time) newErrors.start_time = "Start Time is required.";
    if (!formData.end_time) newErrors.end_time = "End Time is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addTimeMaster(formData); // Pass formData to the API
    onCloseModal(); // Close modal after submission
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Time Slots List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Time Slots
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Time Slots</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeListdata?.loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : timeListdata?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        timeListdata?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>
                              {product.start_time} - {product.end_time}{" "}
                            </td>
                            <td>
                              <div className="circelBtnBx">
                                <Button
                                  className="btn"
                                  color="link"
                                  onClick={() => onOpenModal2(product)}
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  className="btn"
                                  color="link"
                                  onClick={() => handleDelete(product.id)}
                                >
                                  <FaTrashAlt />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <Stack className="rightPagination mt10" spacing={2}>
                    <Pagination
                      color="primary"
                      count={totalPages}
                      page={currentPage}
                      shape="rounded"
                      onChange={(event, value) => handlepagechange(value)}
                    />
                  </Stack>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={open} toggle={onCloseModal} className="modal-lg">
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Time Slots
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            {/* <FormGroup>
              <Label htmlFor="start_time" className="col-form-label">
                Start Time :
              </Label>
              <Input
                type="text"
                name="start_time"
                value={formData.start_time}
                onChange={handleInputChange}
                id="start_time"
                required
              />
              {errors.start_time && <span className="text-danger">{errors.start_time}</span>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="end_time" className="col-form-label">
                End Time :
              </Label>
              <Input
                type="text"
                name="end_time"
                value={formData.end_time}
                onChange={handleInputChange}
                id="end_time"
                required
              />
              {errors.end_time && <span className="text-danger">{errors.end_time}</span>}
            </FormGroup> */}

            <div className="row">
              <div className="col-md-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Start Time"
                    value={
                      formData.start_time
                        ? dayjs(formData.start_time, "hh:mm A")
                        : null
                    }
                    onChange={(value) => handleTimeChange("start_time", value)}
                    renderInput={(params) => (
                      <div>
                        <input {...params.inputProps} />
                        {errors.start_time && (
                          <span className="error">{errors.start_time}</span>
                        )}
                      </div>
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-md-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="End Time"
                    value={
                      formData.end_time
                        ? dayjs(formData.end_time, "hh:mm A")
                        : null
                    }
                    onChange={(value) => handleTimeChange("end_time", value)}
                    renderInput={(params) => (
                      <div>
                        <input {...params.inputProps} />
                        {errors.end_time && (
                          <span className="error">{errors.end_time}</span>
                        )}
                      </div>
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalOpen} toggle={onCloseModal2} className="modal-xg">
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Time Slots
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
          <Form>
            {/* <FormGroup>
              <Label htmlFor="start_time" className="col-form-label">
                Start Time :
              </Label>
              <Input
                type="text"
                name="start_time"
                value={selectedvarity.start_time}
                onChange={handleInputChanges}
                id="start_time"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="end_time" className="col-form-label">
                End Time :
              </Label>
              <Input
                type="text"
                name="end_time"
                value={selectedvarity.end_time}
                onChange={handleInputChanges}
                id="end_time"
              />
            </FormGroup> */}

            <div className="row">
              <div className="col-md-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Start Time"
                    value={
                      selectedvarity.start_time
                        ? dayjs(selectedvarity.start_time, "hh:mm A")
                        : null
                    }
                    onChange={(value) => handleEditTimeChange("start_time", value)}
                    renderInput={(params) => (
                      <div>
                        <input {...params.inputProps} />
                        {errors.start_time && (
                          <span className="text-danger">
                            {errors.start_time}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-md-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="End Time"
                    value={
                      selectedvarity.end_time
                        ? dayjs(selectedvarity.end_time, "hh:mm A")
                        : null
                    }
                    onChange={(value) => handleEditTimeChange("end_time", value)}
                    renderInput={(params) => (
                      <div>
                        <input {...params.inputProps} />
                        {errors.end_time && (
                          <span className="text-danger">{errors.end_time}</span>
                        )}
                      </div>
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmits}>
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal2}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TimeSlotsList;
