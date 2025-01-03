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
  UncontrolledTooltip,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Pagination, Stack } from "@mui/material";



const TestCategory = () => {
  const navigate = useNavigate();

  const { testCategory, gettestCategoryList, addtestCategory,deleteTestcate,editTestCategory,getReportTemplateList, reportTemplateList  } =useMasterContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemperPage = 8;

  const totalPages = testCategory?.total && Math.ceil(testCategory?.total / itemperPage);

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    discount_percentage:'',
    template_id: '',
  });

  const [selectedvarity, setSelectedvarity] = useState({
    name: "",
    discount_percentage:'',
    template_id: '',
  });

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    gettestCategoryList(dataToSend);
    getReportTemplateList()
  }, [currentPage]);

  const handleTemplateSelect = (templateId) => {
    setFormData({ ...formData, template_id: templateId });
  };

  const handleeditTemplateSelect = (templateId) => {
    setSelectedvarity({ ...selectedvarity, template_id: templateId });
  };

  const handleEdit = (product) => {
    setSelectedvarity(product);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      deleteTestcate(id);
    }
  };

  const onOpenModal = () => {
    setOpen(true);
  };


  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedvarity({ name: "" });
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({ name: "",discount_percentage:'' });
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
    editTestCategory(selectedvarity.id, selectedvarity);
    onCloseModal2();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "discount_percentage" ? parseInt(value, 10) || 0 : value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Send formData to the backend
    addtestCategory(formData);
    onCloseModal(); // Close modal after saving
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Test Category List" />
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
                          <th>Disscount Percentage </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {testCategory?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : testCategory?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Test Category List Found
                            </td>
                          </tr>
                        ) : (
                          testCategory?.data?.map((product, index) => (
                            <tr key={index}>
                               <td id={`name-${index}`}>
                                {product?.name
                                  ? product?.name?.length > 30
                                    ? `${product?.name?.slice(0, 30)}...`
                                    : product?.name
                                  : "NA"}
                                {product?.name && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`name-${index}`}
                                  >
                                    {product?.name}
                                  </UncontrolledTooltip>
                                )}
                              </td>
                              <td>{product?.discount_percentage}</td>
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
                      <Stack className="rightPagination mt10" spacing={2}>
                          <Pagination
                            color="primary"
                            count={totalPages}
                            page={currentPage}
                            shape="rounded"
                            onChange={(event, value) => handlepagechange(value)}
                          />
                        </Stack>
                    </Table>
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
        className="modal-xg" 
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Test Category
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
                id="title"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="discount_percentage" className="col-form-label">
                Discount :
              </Label>
              <Input
                type="number"
                name="discount_percentage"
                value={formData.discount_percentage}
                onChange={handleInputChange}
                id="discount_percentage"
              />
            </FormGroup>
            <FormGroup>
        
          <FormGroup>
          <Label className="col-form-label">Select Template:</Label>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {reportTemplateList.data.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                style={{
                  cursor: "pointer",
                  border: formData.template_id === template.id ? "2px solid #007bff" : "2px solid transparent",
                  padding: "8px",
                  textAlign: "center",
                  backgroundColor: formData.template_id === template.id ? "#e6f7ff" : "transparent",
                }}
              >
                <img
                  src={template.preview}
                  alt={template.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <p style={{ margin: "8px 0 0" }}>{template.title}</p>
              </div>
            ))}
          </div>
        </FormGroup>
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

      <Modal isOpen={modalOpen} toggle={onCloseModal2}  className="modal-xg">
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Test Category Master
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="name" className="col-form-label">
                Title:
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
              <Label htmlFor="discount_percentage" className="col-form-label">
                Discount :
              </Label>
              <Input
                type="number"
                name="discount_percentage"
                value={selectedvarity.discount_percentage}
                onChange={handleInputChanges}
                id="discount_percentage"
              />
            </FormGroup>
            <FormGroup>
          <Label className="col-form-label">Select Template:</Label>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {reportTemplateList.data?.map((template) => (
              <div
                key={template.id}
                onClick={() => handleeditTemplateSelect(template.id)}
                style={{
                  cursor: "pointer",
                  border: selectedvarity.template_id === template.id ? "2px solid #007bff" : "2px solid transparent",
                  padding: "8px",
                  textAlign: "center",
                  backgroundColor: selectedvarity.template_id === template.id ? "#e6f7ff" : "transparent",
                }}
              >
                <img
                  src={template.preview}
                  alt={template.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <p style={{ margin: "8px 0 0" }}>{template.title}</p>
              </div>
            ))}
          </div>
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

export default TestCategory;
