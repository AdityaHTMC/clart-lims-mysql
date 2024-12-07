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
    allbreed,
    editPetList,
    deletePetList,
  } = useMasterContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    name: "",
    species: "",
    breed: "",
    id: "",
    color: "",
    date_of_birth: "",
    sex: "",
  });

  useEffect(() => {
    getCustomerPetList(id);
    getAllSpeciesList();
  }, [id]);

  useEffect(() => {
    const dataToSend = {
      species: selectedvarity.species,
    };
    allBreedList(dataToSend);
  }, [selectedvarity.species]);

  const addpetpage = () => {
    navigate(`/add-pet/${id}`);
  };
  const handleEdit = (product) => {
    setSelectedvarity(product);
    setExistingImages(product.images || []); // Populate existing images
    setNewImages([]); // Reset new images
    setModalOpen(true);
  };

  // Remove existing image
  const removeExistingImage = (imageUrl) => {
    setExistingImages((prev) => prev.filter((img) => img !== imageUrl));
  };

  // Remove new image
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Add new images
  const addNewImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setSelectedvarity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = (petid) => {
    if (window.confirm("Are you sure you wish to delete this ?")) {
      deletePetList(petid, id);
    }
  };

  const handleSubmits = async () => {
    const formData = new FormData();

    // Add all images (existing and new) to the same "images" field, indexed sequentially
    [...existingImages, ...newImages].forEach((imgOrFile, index) => {
      if (typeof imgOrFile === "string") {
        // Existing images as strings
        formData.append(`images[${index}]`, imgOrFile);
      } else {
        // New images as binary
        formData.append(`images[${index}]`, imgOrFile);
      }
    });

    formData.append("date_of_birth", selectedvarity.date_of_birth);
    formData.append("sex", selectedvarity.sex);
    formData.append("color", selectedvarity.color);
    formData.append("breed", selectedvarity.breed);
    formData.append("species", selectedvarity.species);
    formData.append("name", selectedvarity.name);
    setIsProcessing(true);
    const res = await  editPetList(selectedvarity.id, formData, id);
    setIsProcessing(false);
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
                              No Data Found
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
                                    onClick={() => handleDelete(product?.id)}
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
            Edit Pet
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
            <div className="row">
              <FormGroup>
                <Label
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "10px",
                  }}
                >
                  Images:
                </Label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                    marginBottom: "10px",
                  }}
                  className="image-preview-container"
                >
                  {/* Display existing images */}
                  {existingImages.map((img, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: "120px",
                        height: "120px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}
                      className="image-preview"
                    >
                      <img
                        src={img}
                        alt="Existing"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        className="preview-img"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          background: "rgba(255, 0, 0, 0.8)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {/* Display new images */}
                  {newImages.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: "120px",
                        height: "120px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}
                      className="image-preview"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="New"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        className="preview-img"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          background: "rgba(255, 0, 0, 0.8)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* File input for adding new images */}
                <Input
                  type="file"
                  multiple
                  onChange={addNewImages}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "10px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </FormGroup>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleSubmits}>
            Save
          </Button>
          <Button color="primary" onClick={onCloseModal2}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PetList;
