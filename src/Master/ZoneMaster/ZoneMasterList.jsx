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
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Chip, TextField } from "@mui/material";

const ZoneMasterList = () => {
  const navigate = useNavigate();

  const { getZoneList, zoneList,addZoneMaster } = useMasterContext();

  const [formData, setFormData] = useState({
    zone_name: "",
    charge : "",
  });


  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodes, setPincodes] = useState([]);

  const handleAddPincode = () => {
    if (pincode) {
      setPincodes([...pincodes, pincode]);
      setPincode(""); // Clear the input field
    }
  };

  const handleRemovePincode = (indexToRemove) => {
    setPincodes(pincodes.filter((_, index) => index !== indexToRemove));
  };


  const [selectedvarity, setSelectedvarity] = useState({
    name: "",
    sahc_id: "",
    registration_number: "",
    id: "",
  });

  useEffect(() => {
    getZoneList();
  }, []);

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
    setSelectedvarity({
      name: "",
      sahc_id: "",
      registration_number: "",
      id: "",
    });
  };

  const onCloseModal = () => {
    setOpen(false);
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
    //   editOrderStatus(selectedvarity.id, selectedvarity);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // DeleteOrderStatus(id);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const dataToSend ={
      zone_name: formData.zone_name,
      charge: formData.charge,
      pincode: pincodes.join(","),
    }
    addZoneMaster(dataToSend);
    onCloseModal();
  };

  return (
    <>
      <CommonBreadcrumb title="Zone Master List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Zone Name </th>
                        <th>pincodes </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {zoneList?.loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : zoneList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        zoneList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.zone_name}</td>
                            <td>{product.pincode}</td>
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
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        isOpen={open}
        toggle={onCloseModal}
        className="modal-lg" // Increases the width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <FormGroup>
              <Label htmlFor="zone_name" className="col-form-label">
               Zone Name
              </Label>
              <Input
                type="text"
                name="zone_name"
                value={formData.zone_name}
                onChange={handleInputChange}
                id="zone_name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="charge" className="col-form-label">
               Charge
              </Label>
              <Input
                type="number"
                name="charge"
                value={formData.charge}
                onChange={handleInputChange}
                id="charge"
              />
            </FormGroup>
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
            Edit
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
          <Form>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Name:
              </Label>
              <Input
                type="text"
                name="title"
                value={selectedvarity.name}
                onChange={handleInputChanges}
                id="title"
              />
            </FormGroup>
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

export default ZoneMasterList;