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
  
  const ParameterGroup = () => {
  
    const { getParameterGrList,parameterGrList,addParameterGrMaster,editParameterGrList,DeleteParameterGr} =
      useMasterContext();
  

  
    const [formData, setFormData] = useState({
      name: "",
    });
  
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 8;
  
    const totalPages = parameterGrList?.total && Math.ceil(parameterGrList?.total / itemperPage);
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
  
    const [selectedvarity, setSelectedvarity] = useState({
      name: "",
      id: "",
    });
  
    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
      };
      getParameterGrList(dataToSend);
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
        id: "",
      });
    };
  
    const onCloseModal = () => {
      setOpen(false);
      setFormData({
        name: "",
        id: "",
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
      }
      editParameterGrList(selectedvarity.id,dataToSend);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        DeleteParameterGr(id);
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
        addParameterGrMaster(formData);
      onCloseModal();
    };
  
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Parameter Group List" />
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
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parameterGrList?.loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : parameterGrList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                            parameterGrList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.name}</td>
                    
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
          className="modal-xg" 
        >
          <ModalHeader toggle={onCloseModal}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Add
            </h5>
          </ModalHeader>
          <ModalBody>
            {" "}
            {/* Scroll in Y-axis */}
            <Form onSubmit={(e) => e.preventDefault()}>
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
            <Form onSubmit={(e) => e.preventDefault()}>
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
  
  export default ParameterGroup;
  