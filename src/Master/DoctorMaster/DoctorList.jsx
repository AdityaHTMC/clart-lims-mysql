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
import { Autocomplete, Pagination, Stack, TextField } from "@mui/material";
import { useCategoryContext } from "../../helper/CategoryProvider";

const DoctorList = () => {
  const navigate = useNavigate();

  const { getDocList, docList, addDocMaster, editDocList, DeleteDoc } =
    useMasterContext();

  const { getAllCollection, collectionDropdown } = useCategoryContext();

  const [formData, setFormData] = useState({
    name: "",
    collection_center_id: "",
    registration_number: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages = docList?.total && Math.ceil(docList?.total / itemperPage);

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    name: "",
    collection_center_id: "",
    registration_number: "",
    id: "",
  });

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getDocList(dataToSend);
    getAllCollection();
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
    setSelectedvarity({
      name: "",
      collection_center_id: "",
      registration_number: "",
      id: "",
    });
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({
      name: "",
      collection_center_id: "",
      registration_number: "",
    });
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
    const dataToSend = {
      name: selectedvarity.name,
      collection_center_id: selectedvarity.collection_center_id,
      registration_number: selectedvarity.registration_number,
      id: selectedvarity.id,
    };
    // console.log(dataToSend, 'update')
    editDocList(dataToSend);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      DeleteDoc(id);
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
    // console.log(formData, 'submit');
    addDocMaster(formData);
    onCloseModal();
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Doctor Master List" />
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
                        <th>Name </th>
                        <th>Registration Number</th>
                        <th>Collection Center Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docList?.loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : docList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        docList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.registration_number}</td>
                            <td>{product.collection_center_name}</td>
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

      <Modal isOpen={open} toggle={onCloseModal} className="modal-xg">
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
              <Label htmlFor="name" className="col-form-label">
                Name
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                id="name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="registration_number" className="col-form-label">
                Registration Number
              </Label>
              <Input
                type="number"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleInputChange}
                id="registration_number"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="collection_center_id" className="col-form-label">
                Collection Center:
              </Label>
              <Autocomplete
                id="collection_center_id"
                options={collectionDropdown?.data || []} // Ensure it's an array
                getOptionLabel={(option) => option.organization_name || ""}
                onChange={(event, newValue) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    collection_center_id: newValue ? newValue.id : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Collection Center"
                    variant="outlined"
                  />
                )}
              />
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
              <Label htmlFor="name" className="col-form-label">
                Name:
              </Label>
              <Input
                type="text"
                name="name"
                value={selectedvarity.name}
                onChange={handleInputChanges}
                id="name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="registration_number" className="col-form-label">
                Registration Number
              </Label>
              <Input
                type="number"
                name="registration_number"
                value={selectedvarity.registration_number}
                onChange={handleInputChanges}
                id="registration_number"
              />
            </FormGroup>
            <FormGroup>
  <Label htmlFor="collection_center_id" className="col-form-label">
    Collection Center:
  </Label>
  <Autocomplete
    id="collection_center_id"
    options={collectionDropdown?.data || []} // Ensure it's an array
    getOptionLabel={(option) => option.organization_name || ""}
    value={collectionDropdown?.data?.find(
      (item) => item.id === selectedvarity.collection_center_id
    ) || null}
    onChange={(event, newValue) => {
      handleInputChanges({
        target: {
          name: "collection_center_id",
          value: newValue ? newValue.id : "",
        },
      });
    }}
    renderInput={(params) => (
      <TextField {...params} label="Select Collection" variant="outlined" />
    )}
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

export default DoctorList;
