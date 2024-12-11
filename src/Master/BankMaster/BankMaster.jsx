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

const BankMaster = () => {
  const navigate = useNavigate();

  const { getBankMasterList, bankList,addBankMaster } = useMasterContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
    bankList?.total && Math.ceil(bankList?.total / itemperPage);

  const [formData, setFormData] = useState({
    beneficiary_name: "",
    bank_name: "",
    account_number: "",
    branch: "",
    ifsc: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    title: "",
    _id: "",
  });

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getBankMasterList(dataToSend);
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
    setSelectedvarity({ title: "", image: "", _id: "" });
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
    //   editSpeciesMasterList(selectedvarity.id, selectedvarity);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      // DeleteSpecies(id);
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
    // Send formData to the backend
    addBankMaster(formData);
    onCloseModal(); // Close modal after saving
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Bank List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Bank
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Bank Name</th>
                        <th>Beneficiary Name</th>
                        <th>Account Number</th>
                        <th>ifsc</th>
                        <th>Branch</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bankList?.loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : bankList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        bankList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.bank_name}</td>
                            <td>{product.beneficiary_name}</td>
                            <td>{product.account_number}</td>
                            <td>{product.ifsc}</td>
                            <td>{product.branch}</td>
                        
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

      <Modal
        isOpen={open}
        toggle={onCloseModal}
        className="modal-lg" // Increases the width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Bank
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="beneficiary_name" className="col-form-label">
                  Beneficiary Name :
                </Label>
                <Input
                  type="text"
                  name="beneficiary_name"
                  value={formData.beneficiary_name}
                  onChange={handleInputChange}
                  id="beneficiary_name"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="bank_name" className="col-form-label">
                  Bank Name :
                </Label>
                <Input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                  id="bank_name"
                />
              </FormGroup>
            </div>
            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="account_number" className="col-form-label">
                  Account Number :
                </Label>
                <Input
                  type="number"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleInputChange}
                  id="account_number"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="ifsc" className="col-form-label">
                  ifsc :
                </Label>
                <Input
                  type="text"
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleInputChange}
                  id="ifsc"
                />
              </FormGroup>
            </div>

            <FormGroup>
              <Label htmlFor="branch" className="col-form-label">
                Branch :
              </Label>
              <Input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                id="branch"
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
            Edit Species
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
          <Form>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Species
              </Label>
              <Input
                type="text"
                name="title"
                value={selectedvarity.title}
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

export default BankMaster;
