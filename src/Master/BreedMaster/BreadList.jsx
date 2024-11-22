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
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";
import { Pagination, Stack } from "@mui/material";

// Register the necessary Chart.js components

const BreadList = () => {
  const navigate = useNavigate();

  const { breedLists, getBreedList, getAllSpeciesList, allspecies,editBreed,deleteBreed } =
    useMasterContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 8;

    const totalPages =
    breedLists?.total && Math.ceil(breedLists?.total / itemperPage);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    name: "",
    discount_percentage: "",
    species: "",
    breed: "",
    id: "",
  });

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getBreedList(dataToSend);
    getAllSpeciesList();
  }, [currentPage]);

  const onOpenModal = () => {
    navigate("/add-breed");
  };
  const handleEdit = (product) => {
    setSelectedvarity(product);
    setModalOpen(true);
    console.log(selectedvarity,'setSelectedvarity')
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setSelectedvarity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this ?")) {
      console.log(id,'delete')
      deleteBreed(id);
    }
  };

  const handleSubmits = () => {
    editBreed(selectedvarity.id,selectedvarity)
    console.log(selectedvarity,'submit edit')
    onCloseModal2();
  };

  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedvarity({ name: "" });
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Animal and Breed List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Breed
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Name </th>
                          <th>Species</th>
                          <th>Breed</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {breedLists?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : breedLists?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Animal and Breed Master List Found
                            </td>
                          </tr>
                        ) : (
                          breedLists?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product?.name}</td>
                              <td>{product?.species}</td>
                              <td>{product?.breed}</td>
                              <td>
                                <div className="circelBtnBx">
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => handleEdit(product)}
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

      <Modal isOpen={modalOpen} toggle={onCloseModal2}>
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Breed
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="name" className="col-form-label">
                name:
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
              <Label htmlFor="breed" className="col-form-label">
                breed:
              </Label>
              <Input
                type="text"
                name="breed"
                value={selectedvarity.breed}
                onChange={handleInputChanges}
                id="breed"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="species" className="col-form-label">
                Species:
              </Label>
              <Input
                type="select"
                name="species"
                value={selectedvarity.species}
                onChange={handleInputChanges}
                id="species"
              >
                <option value="">Select Species</option>
                {allspecies?.data?.map((variety) => (
                  <option key={variety._id} value={variety.title}>
                    {variety.title}
                  </option>
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

export default BreadList;
