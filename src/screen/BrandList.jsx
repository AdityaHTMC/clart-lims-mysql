/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
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
  Table,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../helper/CategoryProvider";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { HexColorPicker } from "react-colorful";
// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale
);

const BrandList = () => {
  const navigate = useNavigate();

  const { getBrandList, addBrand, brandList, editBrand,switchBrand,brandDelete } = useCategoryContext();

  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState({
    title: "",
    image: "",
    _id: "",
  });
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    getBrandList();
  }, []);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onOpenModal2 = (product) => {
    setSelectedBrand(product);
    setModalOpen(true);
  };

  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedBrand({ title: "", image: "", _id: "" });
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  // Handle form input change
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setSelectedBrand((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file); // Store the new image file in state
  };


  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
    await switchBrand(product._id, newStatus); // Your API call here
  };

  // Handle submit for updating the brand
  const handleSubmits = () => {
    const formData = new FormData();

    // Append title and brand ID
    formData.append("title", selectedBrand.title);

    // Append image only if a new image is selected, otherwise keep the existing one
    if (newImage) {
      formData.append("image", newImage); // New image file
    } else if (selectedBrand.image) {
      formData.append("image", selectedBrand.image); // Existing image URL or identifier
    }

    editBrand(selectedBrand._id, formData);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
        brandDelete(id)
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

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store file object
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Send formData to the backend
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    if (formData.image) {
      formDataToSend.append("image", formData.image); // Append the file as binary
    }

    addBrand(formDataToSend);
    console.log(formDataToSend, "formData");
    onCloseModal(); // Close modal after saving
  };

  return (
    <>
      <CommonBreadcrumb title="Brand List"  />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Brand
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Brand Image</th>
                        <th>Brand Title</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brandList?.data?.map((product, index) => (
                        <>
                          <tr>
                            <th>
                              {" "}
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

                            <td>{product?.title} </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id={`flexSwitchCheckChecked-${index}`} // unique ID for each row
                                  checked={product.status === "Active"} // Reflects current status
                                  onChange={() => handleStatusToggle(product)} // Toggle status on change
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
                                    onClick={() => handleDelete(product._id)}
                                  >
                                    <FaTrashAlt />
                                  </Button>
                                </div>
                              </td>


                          </tr>
                        </>
                      ))}
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
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Brand
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
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

            <FormGroup>
              <Label htmlFor="banner-image" className="col-form-label">
                Brand Image :
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

      <Modal isOpen={modalOpen} toggle={onCloseModal2}>
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Brand
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Title:
              </Label>
              <Input
                type="text"
                name="title"
                value={selectedBrand.title}
                onChange={handleInputChanges}
                id="title"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="image" className="col-form-label">
                Brand Image:
              </Label>
              {selectedBrand.image && (
                <div>
                  <img
                    src={selectedBrand.image}
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
                      setSelectedBrand((prevState) => ({
                        ...prevState,
                        image: "",
                      }))
                    }
                    style={{
                      position: "absolute",
                      top: "58%",
                      right: "78%",
                      cursor: "pointer",
                      color: "red",
                      fontSize: "20px",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
              )}
              <Input
                type="file"
                name="image"
                id="image"
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

export default BrandList;
