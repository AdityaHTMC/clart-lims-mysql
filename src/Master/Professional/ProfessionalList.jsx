/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
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
  Spinner,
  Table,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Autocomplete, Pagination, Stack, TextField } from "@mui/material";

const ProfessionalList = () => {
  const navigate = useNavigate();

  const {
    getProfessionalList,
    professionalList,
    addProfessional,
    getAllItemList,
    allItemList,
    DeleteProfessionalFees,editProfessionalFees
  } = useMasterContext();

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
  professionalList?.total && Math.ceil(professionalList?.total / itemperPage);



  const [formData, setFormData] = useState({
    name: "",
    expected_charges: "",
    item_id: "",
  });

  const [selectedvarity, setSelectedvarity] = useState({
    name: "",
    expected_charges: "",
    item_id: "",
  });

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getProfessionalList(dataToSend);
    getAllItemList();
  }, [currentPage]);

  const handleEdit = (id) => {
    // navigate(`/product-edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      // ProductDelete(id);
      DeleteProfessionalFees(id);
    }
  };

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
    setSelectedvarity({ name: "" });
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
    editProfessionalFees(selectedvarity.id, selectedvarity);
    onCloseModal2();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "expected_charges" ? parseInt(value, 10) || 0 : value,
    }));
  };
  

  // Handle form submission
  const handleSubmit = () => {
    // Send formData to the backend
    addProfessional(formData);
    onCloseModal(); // Close modal after saving
  };


  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Professional Fees List" />
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
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Name </th>
                          <th>Expected Charges</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {professionalList?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : professionalList?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          professionalList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product?.name}</td>
                              <td>{product?.expected_charges}</td>
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
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        isOpen={open}
        toggle={onCloseModal}
        className="modal-xg" // Increases the width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Professional Fees
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <FormGroup>
              <Label htmlFor="name" className="col-form-label">
                Name :
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
              <Label htmlFor="expected_charges" className="col-form-label">
                Expected Charges :
              </Label>
              <Input
                type="number"
                name="expected_charges"
                min={0}
                value={formData.expected_charges}
                onChange={handleInputChange}
                id="expected_charges"
              />
            </FormGroup>

            {/* <FormGroup>
              <Autocomplete
                options={allItemList?.data || []}
                getOptionLabel={(option) => option.name} // Display name in the dropdown
                onChange={(event, newValue) => {
                  // Update the formData with the selected item's ID
                  setFormData((prevData) => ({
                    ...prevData,
                    item_id: newValue ? newValue._id : "", // Set item_id or empty string
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Item"
                    variant="outlined"
                    fullWidth
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                } // Check if option is equal to value
              />
            </FormGroup> */}
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

      <Modal isOpen={modalOpen} toggle={onCloseModal2}>
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Professional Fees
          </h5>
        </ModalHeader>
        <ModalBody>
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
              <Label htmlFor="expected_charges" className="col-form-label">
                Expected Charges:
              </Label>
              <Input
                type="number"
                name="expected_charges"
                value={selectedvarity.expected_charges}
                onChange={handleInputChanges}
                id="expected_charges"
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

export default ProfessionalList;
