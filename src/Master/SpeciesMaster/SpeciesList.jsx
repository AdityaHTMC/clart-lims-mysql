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
import { useCommonContext } from "../../helper/CommonProvider";
import { toast } from "react-toastify";

const SpeciesList = () => {
  const navigate = useNavigate();

  const { getSpeciesMasterList, speciesMasterList, addSpeciesMasterList, editSpeciesMasterList, DeleteSpecies } = useMasterContext();
  const { getSpeciesCategoryList, speciesCategoryList } = useCommonContext()

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
    speciesMasterList?.total && Math.ceil(speciesMasterList?.total / itemperPage);

  const [formData, setFormData] = useState({
    title: "",
    species_category_id: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    title: "",
    species_category_id: "",
    _id: "",
  });

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getSpeciesMasterList(dataToSend);
  }, [currentPage]);

  useEffect(() => {
    if (speciesCategoryList?.data?.length === 0 && speciesCategoryList?.loading === true) {
      getSpeciesCategoryList()
    }

  }, [speciesCategoryList])

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
    setSelectedvarity({ title: "", });
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({ title: "" });
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
    if(!selectedvarity.title) {
      toast.info("Species name required!")
      return
    }
    if(!selectedvarity?.species_category_id) {
      toast.info("Species category required")
      return
    }
    
    editSpeciesMasterList(selectedvarity.id, selectedvarity);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      DeleteSpecies(id);
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
    if(!formData.title) {
      toast.info("Species name required!")
      return
    }
    if(!formData?.species_category_id) {
      toast.info("Species category required")
      return
    }

    addSpeciesMasterList(formData);
    onCloseModal(); // Close modal after saving
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Species List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Species
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Species</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {speciesMasterList?.loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : speciesMasterList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        speciesMasterList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.title}</td>
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
        className="modal-xg" // Increases the width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Species
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Species Name :
              </Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                id="title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="species_category_id">
                Species Category
              </Label>
              <Input
                id="species_category_id"
                name="species_category_id"
                value={formData.species_category_id}
                onChange={handleInputChange}
                type="select"
              >
                <option value="">Select Species Category</option>
                {speciesCategoryList?.data?.map((item, index) => (
                  <option value={item?.id} key={index}>{item?.title}</option>
                ))}
              </Input>
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

      <Modal
        isOpen={modalOpen}
        toggle={onCloseModal2}
        className="modal-xg"

      >
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Species
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
          <Form onSubmit={(e) => e.preventDefault()}>
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
            <FormGroup>
              <Label for="species_category_id">
                Species Category
              </Label>
              <Input
                id="species_category_id"
                name="species_category_id"
                value={selectedvarity.species_category_id}
                onChange={handleInputChanges}
                type="select"
              >
                <option value="">Select Species Category</option>
                {speciesCategoryList?.data?.map((item, index) => (
                  <option value={item?.id} key={index}>{item?.title}</option>
                ))}
              </Input>
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

export default SpeciesList;
