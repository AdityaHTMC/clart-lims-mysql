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
  
  const ContainerBox = () => {
    const navigate = useNavigate();
  
    const {
      getConatinerList,containerList,addContainerMaster,editContainerList,DeleteContainer
    } = useMasterContext();
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 8;
  
    const totalPages =
    containerList?.total && Math.ceil(containerList?.total / itemperPage);
  
  
  
    const [formData, setFormData] = useState({
      container_name:''
    });
  
    const [selectedvarity, setSelectedvarity] = useState({
      container_name:''
    });
  
    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
      };
      getConatinerList(dataToSend);
    }, [currentPage]);
  
    const handleEdit = (id) => {
      // navigate(`/product-edit/${id}`);
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        // ProductDelete(id);
        DeleteContainer(id);
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
      setSelectedvarity({ container_name: "" });
    };
  
    const onCloseModal = () => {
      setOpen(false);
      setFormData({ container_name: "" });
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
      editContainerList(selectedvarity.id, selectedvarity);
      onCloseModal2();
    };
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  
    // Handle form submission
    const handleSubmit = () => {
      // Send formData to the backend
      addContainerMaster(formData);
      onCloseModal(); // Close modal after saving
    };
  
  
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Container List" />
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
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Show loading spinner */}
                          {containerList?.loading ? (
                            <tr>
                              <td colSpan="7" className="text-center">
                                <Spinner color="secondary" className="my-4" />
                              </td>
                            </tr>
                          ) : containerList?.data?.length === 0 ? (
                            // Show "No products found" when there's no data
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Data Found
                              </td>
                            </tr>
                          ) : (
                            containerList?.data?.map((product, index) => (
                              <tr key={index}>
                                <td>{product?.container_name}</td>
                              
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
          className="modal-lg" // Increases the width
        >
          <ModalHeader toggle={onCloseModal}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Add Container
            </h5>
          </ModalHeader>
          <ModalBody>
            {" "}
            {/* Scroll in Y-axis */}
            <Form>
              <FormGroup>
                <Label htmlFor="container_name" className="col-form-label">
                 Container Name :
                </Label>
                <Input
                  type="text"
                  name="container_name"
                  value={formData.container_name}
                  onChange={handleInputChange}
                  id="container_name"
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
  
        <Modal isOpen={modalOpen} toggle={onCloseModal2}>
          <ModalHeader toggle={onCloseModal2}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Edit
            </h5>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label htmlFor="container_name" className="col-form-label">
                Container Name :
                </Label>
                <Input
                  type="text"
                  name="container_name"
                  value={selectedvarity.container_name}
                  onChange={handleInputChanges}
                  id="container_name"
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
  
  export default ContainerBox;
  