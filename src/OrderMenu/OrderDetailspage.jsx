/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Input,
  FormGroup,
  Label,
  TabPane,
  TabContent,
  NavItem,
  NavLink,
  Nav,
  CardBody,
} from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { FaReceipt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useCommonContext } from "../helper/CommonProvider";
import { toast } from "react-toastify";
import { useOrderContext } from "../helper/OrderProvider";
import { useCategoryContext } from "../helper/CategoryProvider";
import { useMasterContext } from "../helper/MasterProvider";
import { FaEdit } from "react-icons/fa";
import Slider from "react-slick";

const OrderDetailspage = () => {
  const { id } = useParams();
  const sliderRef = React.useRef(null);
  const settings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    arrows: false, // Disable default arrows
  };

  // Custom button handlers
  const handlePrev = () => {
    sliderRef.current.slickPrev(); // Move slider to the previous slide
  };

  const handleNext = () => {
    sliderRef.current.slickNext(); // Move slider to the next slide
  };

  const {
    updateOrderRefund,
    updateOrderStatus,
    getallPhelboList,
    phlebotomistList,
    updateItemStatus,
  } = useCommonContext();

  const { getOrderMasterList, orderMasterList, orderDetails, getOrderDetails } =
    useMasterContext();

  const [activeTab, setActiveTab] = useState("1");

  const [orderStatusUpdates, setOrderStatusUpdates] = useState();

  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingPhelbo, setIsEditingPhelbo] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const handleStatusUpdate = (itemId, status) => {
    const dataToSend = {
      status,
      item_id: itemId,
    };
    updateItemStatus(dataToSend);
  };

  const handleDownloadInvoice = () => {
    const invoiceUrl = orderDetails?.data?.invoice;
    if (invoiceUrl) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = invoiceUrl;
      link.download = "Invoice.pdf"; // Set the file name
      link.target = "_blank"; // Open in a new tab if required
      link.click();
    } else {
      toast.error("Invoice is not available.");
    }
  };

  const handleDownloadReport = () => {
    const reportUrl = orderDetails?.data?.report;
    if (reportUrl) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = reportUrl;
      link.download = "Repoet.pdf"; // Set the file name
      link.target = "_blank"; // Open in a new tab if required
      link.click();
    } else {
      toast.error("Report is not available.");
    }
  };

  const toggleEditStatus = () => {
    setIsEditingStatus(!isEditingStatus);
    setIsEditingPayment(false);
    setIsEditingPhelbo(false);
  };

  const toggleEditPhelbo = () => {
    setIsEditingPhelbo(!isEditingPhelbo);
    setIsEditingPayment(false);
    setIsEditingStatus(false);
  };

  const toggleEditPayment = () => {
    setIsEditingPayment(!isEditingPayment);
    setIsEditingStatus(false);
    setIsEditingPhelbo(false);
  };

  const handlePaymentStatusChange = (status) => {
    setSelectedPaymentStatus(status);
  };

  useEffect(() => {
    if (id) {
      getOrderDetails(id);
      getOrderMasterList();
      getallPhelboList();
    }
  }, [id]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const handleInputChange = async (event) => {
    const newStatus = event.target.value;
    setOrderStatusUpdates(newStatus);

    // if (newStatus) {
    //   try {
    //     const dataToSend = {
    //       id: id,
    //       status: newStatus,
    //     };
    //     await updateOrderStatus(dataToSend);
    //   } catch (error) {
    //     console.error("Error updating order status:", error);
    //   }
    // }
  };

  const totalProfessionalFees = orderDetails.data?.professional_fees?.reduce(
    (total, item) => total + item.price,
    0
  );

  const handleSubmit = async () => {
    try {
      if (selectedDeliveryBoy) {
        const dataToSend = {
          phlebotomist_id: selectedDeliveryBoy,
          id: parseInt(id, 10),
        };

        await updateOrderStatus(dataToSend);
      }

      if (orderStatusUpdates) {
        const dataToSend = {
          id: parseInt(id, 10),
          status: orderStatusUpdates,
        };

        await updateOrderStatus(dataToSend);
      }

      if (selectedPaymentStatus) {
        const dataToSend = {
          id: parseInt(id, 10),
          payment_status: selectedPaymentStatus,
        };

        await updateOrderStatus(dataToSend);
      }

      // After successful update, fetch order details again
      getOrderDetails(id);
    } catch (error) {
      console.error("Failed to update order status", error);
      // Handle the error if needed
    }
  };

  // console.log(orderDetails, "orderDetails");

  return (
    <>
      <CommonBreadcrumb title="Order Details" />
      <Container style={{ padding: "20px", maxWidth: "1200px" }}>
        <Row>
          <Col md="8">
            <Card
              body
              style={{
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <h5>
                  Order Id:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {orderDetails?.data?.orderId}
                  </span>
                </h5>
                <p style={{ color: "#777", margin: 0 }}>
                 Order Collection Date :{" "}
                  {orderDetails.data?.booking_date
                    ? new Date(orderDetails.data.booking_date).toLocaleString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "No Date"}
                </p>

                <p style={{ color: "#777", margin: 0 }}>
                  {" "}
                  Order Placed Date : {""}
                  {new Date(orderDetails.data?.createdAt).toLocaleString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </p>
              </div>
              {orderDetails?.data?.tests?.length > 0 && (
                <>
                  <div className="mt-2 h6 fs-4">Test List </div>
                  <Table bordered hover style={{ marginTop: "10px" }}>
                    <thead>
                      <tr>
                        <th>Sample&nbsp;ID</th>
                        <th className="text-break">Test Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.data?.tests?.map((item) => (
                        <>
                          <tr>
                            <td>{item?.sample_id}</td>
                            <td className="text-break">{item?.test_name}</td>
                            <td>₹{item?.price}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              {orderDetails.data.professional_fees?.length > 0 && (
                <>
                  <div className="mt-2 h6 fs-4">Professional Fees</div>
                  <Table bordered hover style={{ marginTop: "10px" }}>
                    <thead>
                      <tr>
                        <th>Professional Service</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.data?.professional_fees?.map((item) => (
                        <>
                          <tr>
                            <td className="text-wrap">
                              {item?.professional_service}
                            </td>
                            <td>₹{item?.price}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              {orderDetails.data.test_packages?.length > 0 && (
                <>
                  <div className="mt-2 h6 fs-4">Test Package</div>
                  <Table bordered hover style={{ marginTop: "10px" }}>
                    <thead>
                      <tr>
                        <th>Package Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.data?.test_packages?.map((item) => (
                        <>
                          <tr>
                            <td className="text-wrap">{item?.package_name}</td>
                            <td>₹{item?.price}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              <div className="mt-2 h6 fs-4">Pet Details</div>
              <Table bordered hover style={{ marginTop: "10px" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Species</th>
                    <th>Color</th>
                    <th>Gender</th>
                    <th>Date Of Birth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-wrap">
                      {orderDetails.data?.pet_details?.name}
                    </td>
                    <td className="text-wrap">
                      {orderDetails.data?.pet_details?.breed}
                    </td>
                    <td className="text-wrap">
                      {orderDetails.data?.pet_details?.species}
                    </td>
                    <td className="text-wrap">
                      {orderDetails.data?.pet_details?.color}
                    </td>
                    <td className="text-wrap">
                      {orderDetails.data?.pet_details?.sex}
                    </td>
                    <td className="text-wrap">
                      {orderDetails.data?.pet_details?.date_of_birth
                        ? new Date(
                            orderDetails.data.pet_details.date_of_birth
                          ).toLocaleDateString("en-GB")
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                {orderDetails?.data?.discount_price > 0 && (
                  <p>Discount: ₹{orderDetails?.data?.discount_price}</p>
                )}
                {orderDetails?.data?.professional_fees?.length > 0 && (
                  <p>Total Professional Fees: ₹{totalProfessionalFees || 0} </p>
                )}
                {orderDetails?.data?.collection_fees > 0 && (
                  <p>
                    Collection Fees: ₹{orderDetails?.data?.collection_fees || 0}{" "}
                  </p>
                )}
                <h5 style={{ fontWeight: "bold" }}>
                  Grand Total: ₹ {orderDetails?.data?.total_amount}{" "}
                </h5>
              </div>
            </Card>
          </Col>

          <Col md="4">
            <Card
              body
              style={{
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              {orderDetails?.data?.invoice && (
                <Button
                  color="primary"
                  style={{ marginBottom: "10px", float: "right" }}
                  onClick={handleDownloadInvoice}
                >
                  <FaReceipt fontSize={12} /> Print Invoice
                </Button>
              )}

               {orderDetails?.data?.report && (
                <Button
                  color="primary"
                  style={{ marginBottom: "10px", float: "right" }}
                  onClick={handleDownloadReport}
                >
                  <FaReceipt fontSize={12} /> Report
                </Button>
              )}

              <div style={{ marginBottom: "10px", clear: "both" }}>
                <div className="d-flex align-items-center">
                  Order Status:{" "}
                  <Badge color="warning" className="mx-2">
                    {orderDetails?.data?.status}
                  </Badge>
                  <div className="circelBtnBx">
                    <Button
                      className="btn p-0"
                      color="link"
                      onClick={toggleEditStatus}
                    >
                      <FaEdit />
                    </Button>
                  </div>
                </div>
                {orderDetails?.data.payment_status && (
                  <>
                    <div className="d-flex align-items-center">
                      Payment Status:{" "}
                      <Badge color="warning" className="mx-2">
                        {orderDetails?.data?.payment_status}
                      </Badge>
                      <div className="circelBtnBx">
                        <Button
                          className="btn p-0"
                          color="link"
                          onClick={toggleEditPayment}
                        >
                          <FaEdit />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                {orderDetails?.data.payment_mode && (
                  <>
                    <h5>
                      Payment Method:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {orderDetails?.data?.payment_mode}{" "}
                      </span>
                    </h5>
                  </>
                )}

                {orderDetails?.data.lab_name && (
                  <>
                    <h5>
                      Lab Name:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {orderDetails?.data?.lab_name}{" "}
                      </span>
                    </h5>
                  </>
                )}

                {orderDetails?.data.collection_center_name && (
                  <>
                    <h5>
                      CC Name:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {orderDetails?.data?.collection_center_name}{" "}
                      </span>
                    </h5>
                  </>
                )}

                {orderDetails?.data.unit_name && (
                  <>
                    <h5>
                      Unit Name :{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {orderDetails?.data?.unit_name}{" "}
                      </span>
                    </h5>
                  </>
                )}

                <div className="d-flex align-items-center">
                  Phlebotomist Name:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {orderDetails?.data?.phlebotomist_name || "NA"}
                  </span>
                  <div className="circelBtnBx mx-2">
                    <Button
                      className="btn p-0"
                      color="link"
                      onClick={toggleEditPhelbo}
                    >
                      <FaEdit />
                    </Button>
                  </div>
                </div>
              </div>

              {isEditingStatus && (
                <FormGroup>
                  <Label for="orderStatus">Change Order Status</Label>
                  <Input
                    type="select"
                    name="orderStatus"
                    value={orderStatusUpdates}
                    onChange={handleInputChange}
                    id="orderStatus"
                  >
                    <option value="">Select Order Status</option>
                    {orderMasterList?.data?.map((order) => (
                      <option key={order._id} value={order.title}>
                        {order.title}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}

              {/* Conditional Delivery Boy Dropdown */}

              {isEditingPhelbo && (
                <FormGroup>
                  <Label for="deliveryBoy">Change Phlebotomist</Label>
                  <Input
                    type="select"
                    name="deliveryBoy"
                    id="deliveryBoy"
                    value={selectedDeliveryBoy}
                    onChange={(e) => setSelectedDeliveryBoy(e.target.value)}
                  >
                    <option value="">Select Phlebotomist</option>
                    {phlebotomistList?.data?.map((boy) => (
                      <option key={boy._id} value={boy.id}>
                        {boy.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}

              {isEditingPayment && (
                <FormGroup>
                  <Label for="paymentStatus">Change Payment Status</Label>
                  <Input
                    type="select"
                    name="paymentStatus"
                    id="paymentStatus"
                    value={selectedPaymentStatus}
                    onChange={(e) => handlePaymentStatusChange(e.target.value)}
                  >
                    <option value="">Select Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </Input>
                </FormGroup>
              )}

              {(isEditingPhelbo || isEditingStatus || isEditingPayment) && (
                <Button color="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              )}

              {orderDetails.data?.payment_status === "Paid" && 
                (orderDetails.data?.status === "Order Received" ||
                  orderDetails.data?.status === "Rejected" ||
                  orderDetails.data?.status === "Cancelled") && (
                  <button
                    style={{
                      background: "red",
                      color: "white",
                      padding: "8px 12px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const dataToSend = {
                        order_id: orderDetails.data.order_id,
                      };
                      updateOrderRefund(dataToSend);
                    }}
                  >
                    Refund & Cancel
                  </button>
                )}
            </Card>

            <Card
              body
              style={{
                padding: "20px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h5 style={{ fontWeight: "600" }}>Customer Info</h5>
              <p style={{ marginBottom: "5px" }}>
                Name: {orderDetails?.data?.customer_name}{" "}
              </p>
              <p style={{ marginBottom: "5px" }}>
                Phone: {orderDetails?.data?.customer_phone}{" "}
              </p>
              <p style={{ marginBottom: "5px" }}>
                State: {orderDetails?.data?.state}{" "}
              </p>
              <p style={{ marginBottom: "5px" }}>
                District: {orderDetails?.data?.district}{" "}
              </p>
            </Card>

            {orderDetails?.data?.item_requests?.length > 0 && (
              <Card
                style={{
                  position: "relative",
                  padding: "20px",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                  height: "270px",
                }}
              >
                <h5 style={{ fontWeight: "600" }}>
                  Item Request From : {orderDetails?.data?.lab_name || "NA"}
                </h5>
                <Slider ref={sliderRef} className="single-item" {...settings}>
                  {orderDetails?.data?.item_requests?.map(
                    (itemRequest, index) => (
                      <div key={index}>
                        <p style={{ marginBottom: "5px" }}>
                          Item Name: {itemRequest?.item_name}
                        </p>
                        <p style={{ marginBottom: "5px" }}>
                          Item Quantity: {itemRequest?.quantity}
                        </p>
                        <p style={{ marginBottom: "5px" }}>
                          Reason: {itemRequest?.quantity}
                        </p>
                        <p style={{ marginBottom: "5px" }}>
                          Status: {itemRequest?.status}
                        </p>
                        {itemRequest.status === "Pending" && (
                          <div align="center" className="mt-5">
                            <button
                              style={{
                                padding: "10px 20px",
                                background: "green",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginRight: "20px",
                              }}
                              onClick={() =>
                                handleStatusUpdate(
                                  itemRequest?.item_id,
                                  "Approved"
                                )
                              }
                            >
                              Approve
                            </button>
                            <button
                              style={{
                                padding: "10px 20px",
                                background: "red",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleStatusUpdate(
                                  itemRequest?.item_id,
                                  "Rejected"
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </Slider>

                {/* Left Button */}
                <button
                  style={{
                    position: "absolute",
                    top: "90%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    background: "#ccc",
                    border: "none",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={handlePrev}
                >
                  ←
                </button>

                {/* Right Button */}
                <button
                  style={{
                    position: "absolute",
                    top: "90%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    background: "#ccc",
                    border: "none",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleNext}
                >
                  →
                </button>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderDetailspage;
