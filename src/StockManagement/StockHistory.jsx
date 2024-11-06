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

  import { useNavigate, useParams } from "react-router-dom";
  import { FaEdit } from "react-icons/fa";

  import { FaTrashAlt } from "react-icons/fa";

  // Register the necessary Chart.js components

  import { Spinner } from "reactstrap";
  import ReactQuill from "react-quill";
  import "react-quill/dist/quill.snow.css";
import { useMasterContext } from "../helper/MasterProvider";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useStockContext } from "../helper/StockManagement";
import { Pagination, Stack } from "@mui/material";


  const StockHistory = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const {  getItemGrList, itemgroup,addItemGr,getStockHistoryList,stockhistory } = useStockContext();
  
    const [formData, setFormData] = useState({
      title: "",
    });
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 8;
  
    const totalPages =
    stockhistory?.total && Math.ceil(stockhistory?.total / itemperPage);
  
    const [selectedvarity, setSelectedvarity] = useState({
      title: "",
      _id: "",
    });
  
    useEffect(() => {
      const dataToSend={
        item_id: id,
        page: currentPage,
       limit: itemperPage,
      }
      getStockHistoryList(dataToSend)
      getItemGrList();
    }, [id,currentPage]);
  
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
      setSelectedvarity({ title: "", image: "", _id: "" });
    };
  
    const onCloseModal = () => {
      setOpen(false);
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
      // editcms(selectedvarity._id, selectedvarity);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        // deleteCms(id);
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
      addItemGr(formData);
      onCloseModal(); 
    };

    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
  
    return (
      <>
        <CommonBreadcrumb title="Stock History"  />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  {/* <div className="btn-popup pull-right">
                    <Button color="primary" onClick={onOpenModal}>
                      Add 
                    </Button>
                  </div> */}
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Purchased Quantity</th>
                          <th>Used Quantity</th>
                          <th>Stock Quantity</th>
                          <th>Vendor Name</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {stockhistory?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : stockhistory?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          stockhistory?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product?.item_name}</td>
                              <td>{product?.purchased_quantity}</td>
                              <td>{product?.used_quantity}</td>
                              <td>{product?.stock_quantity}</td>
                              <td>{product?.vendor_name}</td>
                              
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
          className="modal-xs" // Increases the width
        >
          <ModalHeader toggle={onCloseModal}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Add Item Group
            </h5>
          </ModalHeader>
          <ModalBody>
            {" "}
            {/* Scroll in Y-axis */}
            <Form>
              <FormGroup>
                <Label htmlFor="title" className="col-form-label">
                  Item Group :
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  id="title"
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
          className="modal-lg"
          style={{ maxWidth: "800px" }}
        >
          <ModalHeader toggle={onCloseModal2}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Edit Unit
            </h5>
          </ModalHeader>
          <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
            <Form>
              <FormGroup>
                <Label htmlFor="title" className="col-form-label">
                  Unit:
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={selectedvarity.title}
                  onChange={handleInputChanges}
                  id="title"
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
  
  export default StockHistory;
  