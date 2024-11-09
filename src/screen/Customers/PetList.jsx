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
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";

// Register the necessary Chart.js components

const PetList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    getAllSpeciesList,
    allspecies,
    getCustomerPetList,
    petList,
    allBreedList,
    allbreed,editPetList
  } = useMasterContext();

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    name: "",
    species: "",
    breed: "",
    id: "",
    color: "",
    date_of_birth:"",
    sex:"",
  });

  useEffect(() => {
    const dataToSend = {};
    getCustomerPetList(id);
    getAllSpeciesList();
    allBreedList();
  }, [id]);

  const addpetpage = () => {
    navigate(`/add-pet/${id}`);
  };
  const handleEdit = (product) => {
    setSelectedvarity(product);
    setModalOpen(true);
    console.log(selectedvarity, "setSelectedvarity");
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
      console.log(id, "delete");
      // deleteBreed(id);
    }
  };

  const handleSubmits = () => {
    editPetList(selectedvarity.id,selectedvarity);
    console.log(selectedvarity, "submit edit");
    onCloseModal2();
  };

  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedvarity({ name: "" });
  };

  return (
    <>
      <CommonBreadcrumb title="Pet List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={addpetpage}>
                    Add Pet
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
                          <th>color</th>
                          <th>Date of Birth</th>
                          <th>Gender</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {petList?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : petList?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Animal and Breed Master List Found
                            </td>
                          </tr>
                        ) : (
                          petList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product?.name}</td>
                              <td>{product?.species}</td>
                              <td>{product?.breed}</td>
                              <td>{product?.color}</td>
                              <td>
                                {new Date(
                                  product.date_of_birth
                                ).toLocaleDateString("en-GB")}
                              </td>
                              <td>{product?.sex}</td>
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
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modalOpen} toggle={onCloseModal2} className="modal-lg">
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Breed
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="row">
              <FormGroup className="col-md-6">
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

              <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  type="date"
                  name="date_of_birth"
                  value={selectedvarity.date_of_birth}
                  onChange={handleInputChanges}
                  id="date_of_birth"
                />
              </FormGroup>
            </div>
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
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

              <FormGroup className="col-md-6">
                <Label htmlFor="breed" className="col-form-label">
                  Breed:
                </Label>
                <Input
                  type="select"
                  name="breed"
                  value={selectedvarity.breed}
                  onChange={handleInputChanges}
                  id="breed"
                >
                  <option value="">Select Breed</option>
                  {allbreed?.data?.map((variety) => (
                    <option key={variety._id} value={variety.title}>
                      {variety.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>

            <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="color">Color:</Label>
                <Input
                  type="text"
                  name="color"
                  value={selectedvarity.color}
                  onChange={handleInputChanges}
                  id="color"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="sex">Gender:</Label>
                <Input
                  type="text"
                  name="sex"
                  value={selectedvarity.sex}
                  onChange={handleInputChanges}
                  id="sex"
                />
              </FormGroup>
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

export default PetList;
