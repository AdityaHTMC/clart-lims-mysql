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
  import { AiOutlineDelete } from "react-icons/ai";
  import { FaEdit, FaTrashAlt } from "react-icons/fa";
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
  
  import { Spinner } from "reactstrap";
  import { useCommonContext } from "../helper/CommonProvider";
  import avtar from "../../src/assets/profile.png";
  import { BsFillEyeFill } from "react-icons/bs";
  import Switch from "@mui/material/Switch";
  
  const DeliveryBoyList = () => {
    const navigate = useNavigate();
  
    const { getDeliveryBoyList , boyList,switchDelivery,deliveryDelete } = useCommonContext();
  
    const onOpenModal = () => {
      navigate("/add-delivery-boys");
    };
  
    useEffect(() => {
        getDeliveryBoyList();
    }, []);

    const handleEdit = (id) => {
        navigate(`/editDelivery/${id}`); 
      };
  
      const handleStatusToggle = async (product) => {
        const newStatus = product.status === "Active" ? "Inactive" : "Active";
        await switchDelivery(product._id, newStatus); 
        // Optionally, update the state to reflect the change if you want immediate feedback
      };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        deliveryDelete(id)
      }
    };
  
    return (
      <>
        <CommonBreadcrumb title="Delivery Boy List"  />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                    <Button color="primary" onClick={onOpenModal}>
                      Add Delivery Boy
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <div className="promo-code-list">
                      <Table bordered hover responsive>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Mobile</th>
                            <th>City</th>
                            <th>State</th>
                            <th>PinCode</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Show loading spinner */}
                          {boyList?.loading ? (
                            <tr>
                              <td colSpan="8" className="text-center">
                                <Spinner color="secondary" className="my-4" />
                              </td>
                            </tr>
                          ) : boyList?.data?.length === 0 ? (
                            // Show "No vendor found" when there's no data
                            <tr>
                              <td colSpan="8" className="text-center">
                                No Delivery Boy Found
                              </td>
                            </tr>
                          ) : (
                            boyList?.data?.map((event, index) => (
                              <tr key={index}>
                                <td>{event?.name}</td>
                                <td>{event?.username}</td>
                                <td>{event?.mobile}</td>
                                <td>{event?.city}</td>
                                <td>{event?.state}</td>
                                <td>{event?.pin_code}</td>
                                <td>
                                  <Switch
                                    checked={event.status === "Active"}
                                    onChange={() => handleStatusToggle(event)}
                                    color="secondary"
                                  />
                                </td>
                                <td>
                                  <div className="circelBtnBx">
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleEdit(event._id)}
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleDelete(event._id)}
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
      </>
    );
  };
  
  export default DeliveryBoyList;
  