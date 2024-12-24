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
  UncontrolledTooltip,
} from "reactstrap";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaEdit, FaHistory } from "react-icons/fa";

import { FaTrashAlt } from "react-icons/fa";

import { Spinner } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMasterContext } from "../helper/MasterProvider";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useStockContext } from "../helper/StockManagement";
import { Pagination, Stack } from "@mui/material";

const ItemManagement = () => {
  const navigate = useNavigate();

  const {
    getItemGrList,
    itemgroup,
    getIMList,
    addIM,
    imList,
    editIM,
    deleteIMList,
  } = useStockContext();

  const {getDDunitList,allUnitList} = useMasterContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const itemperPage = 8;

  const totalPages =
  imList?.total && Math.ceil(imList?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getItemGrList();
    getIMList(dataToSend);
    getDDunitList()
  }, [currentPage]);



  const [formData, setFormData] = useState({
    name: "",
    item_group_id: "",
    amount: "",
    low_quantity_alert: "",
    unit: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [selectedvarity, setSelectedvarity] = useState({
    name: "",
    item_group_id: "",
    amount: "",
    low_quantity_alert: "",
    id: "",
    unit: "",
  });

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
      item_group_id: "",
      amount: "",
      low_quantity_alert: "",
      id: "",
      unit: "",
    });
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({
      name: "",
      item_group_id: "",
      amount: "",
      low_quantity_alert: "",
      id: "",
    });
  };

  // Handle form input change
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setSelectedvarity((prevState) => ({
      ...prevState,
      [name]: ["low_quantity_alert", "item_group_id", "amount"].includes(name)
        ? parseInt(value, 10) || 0
        : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle submit for updating the brand
  const handleSubmits = async() => {

    try {
      setIsLoading(true);
      await editIM(selectedvarity.id, selectedvarity);
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }

    
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      deleteIMList(id);
    }
  };
  const handlehistory = (id) => {
   navigate(`/stock-history/${id}`)
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: ["low_quantity_alert", "item_group_id", "amount"].includes(name)
        ? parseInt(value, 10) || 0
        : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  
  // Handle form submission
  const handleSubmit = async() => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.item_group_id) newErrors.item_group_id = "Item Group is required.";
    if (!formData.amount) newErrors.amount = "Amount is required.";
    // if (!formData.stock_quantity) newErrors.stock_quantity = "Stock Quantity is required.";
    if (!formData.low_quantity_alert) newErrors.low_quantity_alert = "Low Quantity Alert is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors to display
      return; // Stop form submission
    }
  
    try {
      setIsLoading(true);
      await  addIM(formData);;
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
   
    onCloseModal();
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Item Management" />
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
                        <th>Item Name</th>
                        <th>Group Name</th>
                        <th>Amount</th>
                        <th>Stock Quantity</th>
                        <th>Low Quantity alert</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {imList?.loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : imList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        imList?.data?.map((product, index) => (
                          <tr key={index}>
                            
                            
                            <td id={`name-${index}`}>
                                {product?.name
                                  ? product.name.length > 15
                                    ? `${product.name.slice(0, 15)}...`
                                    : product.name
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

                            <td>{product?.item_group_name}</td>
                            <td>{product?.amount}</td>
                            <td>{product?.stock_quantity}</td>
                            <td>{product?.low_quantity_alert}</td>
                            <td>
                              <div className="circelBtnBx">
                                <Button
                                  className="btn"
                                  color="link"
                                  id={`editTooltip-${product.id}`}
                                >
                                  <FaEdit
                                    onClick={() => onOpenModal2(product)}
                                  />
                                </Button>
                                <UncontrolledTooltip
                                  target={`editTooltip-${product.id}`}
                                >
                                  Edit
                                </UncontrolledTooltip>

                                <Button
                                  className="btn"
                                  color="link"
                                  id={`deleteTooltip-${product.id}`}
                                >
                                  <FaTrashAlt
                                    onClick={() => handleDelete(product.id)}
                                  />
                                </Button>
                                <UncontrolledTooltip
                                  target={`deleteTooltip-${product.id}`}
                                >
                                  Delete
                                </UncontrolledTooltip>

                                <Button
                                  className="btn"
                                  color="link"
                                  id={`historyTooltip-${product._id}`}
                                >
                                  <FaHistory onClick={() => handlehistory(product.id)} />
                                </Button>
                                <UncontrolledTooltip
                                  target={`historyTooltip-${product._id}`}
                                >
                                  Stock History
                                </UncontrolledTooltip>
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
            Add Item
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="name" className="col-form-label">
                  Name :
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  id="name"
                  required
                />
                 {errors.name && <span className="text-danger">{errors.name}</span>}
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="amount" className="col-form-label">
                  Amount :
                </Label>
                <Input
                  type="number"
                  name="amount"
                  min={0}
                  value={formData.amount}
                  onChange={handleInputChange}
                  id="amount"
                  required
                />
                {errors.amount && <span className="text-danger">{errors.amount}</span>}
              </FormGroup>
            </div>
            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="low_quantity_alert" className="col-form-label">
                  Low Quantity Alert :
                </Label>
                <Input
                  type="number"
                  name="low_quantity_alert"
                  min={0}
                  value={formData.low_quantity_alert}
                  onChange={handleInputChange}
                  id="low_quantity_alert"
                  required
                />
               {errors.amount && <span className="text-danger">{errors.low_quantity_alert}</span>}
              </FormGroup>

            </div>
            <div className="row">
            <FormGroup className="col-md-6">
              <Label htmlFor="item_group_id" className="col-form-label">
                Item Group:
              </Label>
              <Input
                type="select"
                name="item_group_id"
                value={formData.item_group_id}
                onChange={handleInputChange}
                id="item_group_id"
                required
              >
                <option value="">Select Item Group</option>
                {itemgroup.data.map((group) => (
                  <option key={group._id} value={group.id}>
                    {group.title}
                  </option>
                ))}
              </Input>
              {errors.item_group_id && <span className="text-danger">{errors.item_group_id}</span>}
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label htmlFor="unit" className="col-form-label">
                Item Unit:
              </Label>
              <Input
                type="select"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                id="unit"
                required
              >
                <option value="">Select Item Group</option>
                {allUnitList.data.map((group) => (
                  <option key={group._id} value={group.id}>
                    {group.title}
                  </option>
                ))}
              </Input>
              {errors.item_group_id && <span className="text-danger">{errors.item_group_id}</span>}
            </FormGroup>
            </div>
           
          </Form>
        </ModalBody>
        <ModalFooter>
        
        <Button
            type="submit"
            color="primary"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" /> Submitting...
              </>
            ) : (
              "Add"
            )}
          </Button>
          <Button color="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={modalOpen}
        toggle={onCloseModal2}
        className="modal-lg"
        style={{ maxWidth: "800px" }}
      >
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Item
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
          <Form>
            
            <FormGroup>
              <Label htmlFor="name" className="col-form-label">
                Name :
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
              <Label htmlFor="amount" className="col-form-label">
                Amount :
              </Label>
              <Input
                type="number"
                name="amount"
                value={selectedvarity.amount}
                onChange={handleInputChanges}
                id="amount"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="low_quantity_alert" className="col-form-label">
                low_quantity_alert :
              </Label>
              <Input
                type="number"
                name="low_quantity_alert"
                value={selectedvarity.low_quantity_alert}
                onChange={handleInputChanges}
                id="low_quantity_alert"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="item_group_id" className="col-form-label">
                Item Group:
              </Label>
              <Input
                type="select"
                name="item_group_id"
                value={selectedvarity.item_group_id}
                onChange={handleInputChanges}
                id="item_group_id"
              >
                <option value="">Select Item Group</option>
                {itemgroup.data.map((group) => (
                  <option key={group._id} value={group.id}>
                    {group.title}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup >
              <Label htmlFor="unit" className="col-form-label">
                Item Unit:
              </Label>
              <Input
                type="select"
                name="unit"
                value={selectedvarity.unit}
                onChange={handleInputChanges}
                id="unit"
                required
              >
                <option value="">Select Item Group</option>
                {allUnitList.data.map((group) => (
                  <option key={group._id} value={group.id}>
                    {group.title}
                  </option>
                ))}
              </Input>
              {errors.item_group_id && <span className="text-danger">{errors.item_group_id}</span>}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
        <Button
            type="submit"
            color="primary"
            disabled={isLoading}
            onClick={handleSubmits}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" /> Submitting...
              </>
            ) : (
              "edit"
            )}
          </Button>
          
          <Button color="secondary" onClick={onCloseModal2}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ItemManagement;
