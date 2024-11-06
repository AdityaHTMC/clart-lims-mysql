/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import CommonBreadcrumb from "../component/common/bread-crumb";
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
  Spinner,
  Table,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../helper/CategoryProvider";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { HexColorPicker } from "react-colorful";
// Register the necessary Chart.js components


import { FaTrashAlt } from "react-icons/fa";

const BannerList = () => {
  const navigate = useNavigate();

  const {
    getBannerList,
    BannerList,
    addBanner,
    bannerDelete,
    switchBranner,
    editBranner,
  } = useCategoryContext();

  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    title2: "",
    description: "",
    primary_color: "#FFFFFF",
    secondary_color: "#000000",
    image: null,
    target_url: "",
    type: "",
  });

  const [selectedBanner, setSelectedBanner] = useState({
    title: "",
    title2: "",
    description: "",
    primary_color: "#FFFFFF",
    secondary_color: "#000000",
    image: "",
    target_url: "",
    type: "",
    _id: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);
  useEffect(() => {
    getBannerList();
  }, []);

  const onOpenModal = () => {
    setOpen(true);
  };
  const handleEdit = (id) => {
    navigate(`/product-edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      bannerDelete(id);
    }
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  const onOpenModal2 = (product) => {
    setSelectedBanner(product);
    setModalOpen(true);
  };

  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    // setSelectedBanner({ title: "", image: "", _id: "" });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store file object
    }));
  };

  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";

    console.log(product._id, newStatus, "mew status: ");
    await switchBranner(product._id, newStatus); // Your API call here
  };

  // Handle form submission
  const handleSubmit = () => {
    // Send formData to the backend
    const formDataToSend = new FormData();

    formDataToSend.append("target_url", formData.target_url);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("title2", formData.title2);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("primary_color", formData.primary_color);
    formDataToSend.append("secondary_color", formData.secondary_color);
    if (formData.image) {
      formDataToSend.append("image", formData.image); // Append the file as binary
    }

    addBanner(formDataToSend);
    console.log(formDataToSend, "formData");
    onCloseModal(); // Close modal after saving
  };

  // Handle form input change
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setSelectedBanner((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file); // Store the new image file in state
  };

  const handleSubmits = () => {
    const formData = new FormData();

    // Append title and brand ID
    formData.append("title", selectedBanner.title || '');
    formData.append("title2", selectedBanner.title2 || '');
    formData.append("description", selectedBanner.description || '');
    formData.append("primary_color", selectedBanner.primary_color || '');
    formData.append("secondary_color", selectedBanner.secondary_color ||'');
    formData.append("target_url", selectedBanner.target_url || '');
    formData.append("type", selectedBanner.type || '');

    // Append image only if a new image is selected, otherwise keep the existing one
    if (newImage) {
      formData.append("image", newImage); // New image file
    } else if (selectedBanner.image) {
      formData.append("image", selectedBanner.image); // Existing image URL or identifier
    }

    editBranner(selectedBanner._id, formData);

    onCloseModal2();
  };

  return (
    <>
      <CommonBreadcrumb title="Banner List"  />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Banner
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Banner Image</th>
                        <th>Banner Title</th>
                        <th>Position</th>
                        <th>Status</th>
                        {/* <th>Banner Color</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BannerList?.loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : BannerList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No BannerList found
                          </td>
                        </tr>
                      ) : (
                        BannerList?.data?.map((product, index) => (
                          <tr key={index}>
                            <th>
                              <img
                                src={product.image}
                                alt="img"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              />
                            </th>
                            <td>
                              {product?.title?.split(" ").length > 5
                                ? product?.title
                                    .split(" ")
                                    .slice(0, 5)
                                    .join(" ") + "..."
                                : product?.title}
                            </td>
                            <td>{product?.type}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id={`flexSwitchCheckChecked-${index}`}
                                  checked={product.status === "Active"}
                                  onChange={() => handleStatusToggle(product)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`flexSwitchCheckChecked-${index}`}
                                >
                                  {product.status === "Active"
                                    ? "Active"
                                    : "Inactive"}
                                </label>
                              </div>
                            </td>
                            {/* <td>
                              <div
                                style={{
                                  backgroundColor: product.primary_color,
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                }}
                              />
                            </td> */}
                            <td>
                              <FaEdit
                                size={20}
                                onClick={() => onOpenModal2(product)}
                                style={{
                                  marginRight: "10px",
                                  cursor: "pointer",
                                }}
                              />
                              <AiOutlineDelete
                                size={20}
                                onClick={() => handleDelete(product._id)}
                                style={{ cursor: "pointer" }}
                              />
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
        style={{ maxWidth: "800px" }} // Optional: further custom width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Banner
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "400px", overflowY: "auto" }}>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
         

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                target url :
              </Label>
              <Input
                type="text"
                name="target_url"
                value={formData.target_url}
                onChange={handleInputChange}
                id="target_url"
              />
            </FormGroup>

            <FormGroup>
              <Label className="col-form-label">Type:</Label>
              <div className="d-flex justify-content-start mt-2">
                <FormGroup check className="me-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="home"
                      checked={formData.type === "home"}
                      onChange={handleInputChange}
                    />
                    home
                  </Label>
                </FormGroup>
                <FormGroup check className="me-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="popup"
                      checked={formData.type === "popup"}
                      onChange={handleInputChange}
                    />
                    Popup
                  </Label>
                </FormGroup>
              </div>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Title :
              </Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                id="title"
              />
            </FormGroup>

            {/* <FormGroup>
              <Label htmlFor="title2" className="col-form-label">
                Title 2 :
              </Label>
              <Input
                type="text"
                name="title2"
                value={formData.title2}
                onChange={handleInputChange}
                id="title2"
              />
            </FormGroup> */}

            <FormGroup>
              <Label htmlFor="description" className="col-form-label">
                Description :
              </Label>
              <Input
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                id="description"
              />
            </FormGroup>

            {/* <div className="row p-5">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="primary_color" className="form-label">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    id="primary_color"
                    name="primary_color"
                    value={formData.primary_color}
                    onChange={handleInputChange}
                    className="form-control form-control-color"
                    style={{ width: "100px", height: "50px" }} // Adjust color picker size
                  />
                </div>
                <div className="mt-2">
                  <strong>Selected Color:</strong> {formData.primary_color}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="secondary_color" className="form-label">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    id="secondary_color"
                    name="secondary_color"
                    value={formData.secondary_color}
                    onChange={handleInputChange}
                    className="form-control form-control-color"
                    style={{ width: "100px", height: "50px" }} // Adjust color picker size
                  />
                </div>
                <div className="mt-2">
                  <strong>Selected Color:</strong> {formData.secondary_color}
                </div>
              </div>
            </div> */}

            <FormGroup>
              <Label htmlFor="banner-image" className="col-form-label">
                Banner Image :
              </Label>
              <Input
                id="banner-image"
                type="file"
                name="image"
                onChange={handleFileChange}
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

      <Modal
        isOpen={modalOpen}
        toggle={onCloseModal2}
        className="modal-lg" // Increases the width
        style={{ maxWidth: "800px" }} // Optional: further custom width
      >
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Banner
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "400px", overflowY: "auto" }}>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
        

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                target url :
              </Label>
              <Input
                type="text"
                name="target_url"
                value={selectedBanner.target_url}
                onChange={handleInputChanges}
                id="target_url"
              />
            </FormGroup>

            <FormGroup>
              <Label className="col-form-label">Type:</Label>
              <div className="d-flex justify-content-start mt-2">
                <FormGroup check className="me-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="home"
                      checked={selectedBanner.type === "home"}
                      onChange={handleInputChanges}
                    />
                    Home
                  </Label>
                </FormGroup>
                <FormGroup check className="me-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="popup"
                      checked={selectedBanner.type === "popup"}
                      onChange={handleInputChanges}
                    />
                    Popup
                  </Label>
                </FormGroup>
               
              </div>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Title :
              </Label>
              <Input
                type="text"
                name="title"
                value={selectedBanner.title}
                onChange={handleInputChanges}
                id="title"
              />
            </FormGroup>

            {/* <FormGroup>
              <Label htmlFor="title2" className="col-form-label">
                Title 2 :
              </Label>
              <Input
                type="text"
                name="title2"
                value={selectedBanner.title2}
                onChange={handleInputChanges}
                id="title2"
              />
            </FormGroup> */}

            <FormGroup>
              <Label htmlFor="description" className="col-form-label">
                Description :
              </Label>
              <Input
                type="textarea"
                name="description"
                value={selectedBanner.description}
                onChange={handleInputChanges}
                id="description"
              />
            </FormGroup>

            {/* <div className="row p-5">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="primary_color" className="form-label">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    id="primary_color"
                    name="primary_color"
                    value={selectedBanner.primary_color}
                    onChange={handleInputChanges}
                    className="form-control form-control-color"
                    style={{ width: "100px", height: "50px" }} // Adjust color picker size
                  />
                </div>
                <div className="mt-2">
                  <strong>Selected Color:</strong>{" "}
                  {selectedBanner.primary_color}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="secondary_color" className="form-label">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    id="secondary_color"
                    name="secondary_color"
                    value={selectedBanner.secondary_color}
                    onChange={handleInputChanges}
                    className="form-control form-control-color"
                    style={{ width: "100px", height: "50px" }} // Adjust color picker size
                  />
                </div>
                <div className="mt-2">
                  <strong>Selected Color:</strong>{" "}
                  {selectedBanner.secondary_color}
                </div>
              </div>
            </div> */}

            <FormGroup>
              <Label htmlFor="image" className="col-form-label">
               existing Branner Image:
              </Label>
              {selectedBanner.image && (
                <div>
                  <img
                    src={selectedBanner.image}
                    alt="Current brand"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      position: "relative",
                    }}
                  />

                  <FaTrashAlt
                    onClick={() =>
                      setSelectedBanner((prevState) => ({
                        ...prevState,
                        image: "",
                      }))
                    }
                    style={{
                      position: "absolute",
                      top: "118%",
                      right: "82%",
                      cursor: "pointer",
                      color: "red",
                      fontSize: "20px",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="banner-image" className="col-form-label">
                Banner Image :
              </Label>
              <Input
                id="banner-image"
                type="file"
                name="image"
                onChange={handleImageChange}
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

export default BannerList;
