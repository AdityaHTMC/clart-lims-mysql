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
const OrderDetails = () => {
  const { id } = useParams();
  const {
    getOrderDetails,
    orderDetails,
    getOrderStatus,
    orderStatusList,
    OrderStatusUpdate,
    allDeliveryBoyList,
    allDeliveryList,
    UpdateShipping,
  } = useCommonContext();
  const [activeTab, setActiveTab] = useState("1");

  const [orderStatusUpdates, setOrderStatusUpdates] = useState();

  const [selectedOption, setSelectedOption] = useState("Courier");
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState("");

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    setSelectedDeliveryBoy(""); // Reset selected delivery boy when switching to "Courier"
  };

  useEffect(() => {
    if (id) {
      getOrderDetails(id);
      getOrderStatus();
      allDeliveryBoyList();
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

    if (newStatus) {
      try {
        const dataToSend = {
          id: id,
          status: newStatus,
        };
        await OrderStatusUpdate(dataToSend);
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  const handleSubmit = () => {
    const dataToSend = {
      id: id,
      shipping_method:
        selectedOption === "Courier" ? "Courier" : "Delivery Boy",
      delivery_boy_id:
        selectedOption === "DeliveryBoy" ? selectedDeliveryBoy : "",
    };

    OrderStatusUpdate(dataToSend);
  };

  // console.log(orderDetails, "orderDetails");

  return (
    <>
      <CommonBreadcrumb title="Order Details" parent="Physical" />
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
                    {orderDetails.data?.order_id}{" "}
                  </span>
                </h5>
                <p style={{ color: "#777", margin: 0 }}>
                  {new Date(orderDetails.data?.order_date).toLocaleString(
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

              <Table bordered hover style={{ marginTop: "20px" }}>
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.data?.items?.map((item) => (
                    <>
                      <tr>
                        <td>1</td>
                        <td>{item.itemName}</td>
                        <td>{item.quantity} </td>
                        <td>₹{item.total_price}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <p>Total Price: ₹ {orderDetails?.data?.total_amount} </p>
                <p>Coupon Discount: ₹0</p>
                <p>Delivery Charge: ₹0</p>
                <h5 style={{ fontWeight: "bold" }}>
                  Grand Total: ₹ {orderDetails?.data?.final_amount}{" "}
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
              <Button
                color="primary"
                style={{ marginBottom: "10px", float: "right" }}
              >
                <FaReceipt fontSize={12} /> Print Invoice
              </Button>
              <div style={{ marginBottom: "10px", clear: "both" }}>
                <h5>
                  Order Status:{" "}
                  <Badge color="warning"> {orderDetails?.data?.status} </Badge>
                </h5>
                <h5>
                  Payment Status:{" "}
                  <Badge color="warning">
                    {" "}
                    {orderDetails?.data?.payment_status}{" "}
                  </Badge>
                </h5>
                <h5>
                  Payment Method:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {orderDetails?.data?.payment_mode}{" "}
                  </span>
                </h5>
                <h5>
                  Shipping Method:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {orderDetails?.data?.shipping_method}{" "}
                  </span>
                </h5>
                {orderDetails?.data?.delivery_boy_name && (
                  <h5>
                    Delivery Boy Name:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      {orderDetails?.data?.delivery_boy_name}{" "}
                    </span>
                  </h5>
                )}
              </div>

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
                  {orderStatusList?.data?.map((order) => (
                    <option key={order._id} value={order.title}>
                      {order.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              {/* Radio Buttons */}
              <FormGroup tag="fieldset">
                <legend>Delivery Method</legend>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="deliveryMethod"
                      value="Courier"
                      checked={selectedOption === "Courier"}
                      onChange={handleRadioChange}
                    />{" "}
                    Courier
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="deliveryMethod"
                      value="DeliveryBoy"
                      checked={selectedOption === "DeliveryBoy"}
                      onChange={handleRadioChange}
                    />{" "}
                    Delivery Boy
                  </Label>
                </FormGroup>
              </FormGroup>

              {/* Conditional Delivery Boy Dropdown */}
              {selectedOption === "DeliveryBoy" && (
                <FormGroup>
                  <Label for="deliveryBoy">Select Delivery Boy</Label>
                  <Input
                    type="select"
                    name="deliveryBoy"
                    id="deliveryBoy"
                    value={selectedDeliveryBoy}
                    onChange={(e) => setSelectedDeliveryBoy(e.target.value)}
                  >
                    <option value="">Select Delivery Boy</option>
                    {allDeliveryList?.data?.map((boy) => (
                      <option key={boy._id} value={boy._id}>
                        {boy.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}

              {/* Submit Button */}
              <Button color="success" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Card>

            <Card
              style={{
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                border: "none",
              }}
            >
              <Nav tabs style={{ marginBottom: "20px" }}>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active-tab" : ""}
                    onClick={() => toggleTab("1")}
                    style={{
                      cursor: "pointer",
                      padding: "8px 8px",
                      marginRight: "10px",
                      borderRadius: "5px",
                      backgroundColor:
                        activeTab === "1" ? "#007bff" : "#f8f9fa",
                      color: activeTab === "1" ? "#fff" : "#007bff",
                      fontWeight: activeTab === "1" ? "bold" : "normal",
                      transition: "background-color 0.3s ease",
                      fontSize: "14px",
                    }}
                  >
                    Shipping Address
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active-tab" : ""}
                    onClick={() => toggleTab("2")}
                    style={{
                      cursor: "pointer",
                      padding: "8px 8px",
                      borderRadius: "5px",
                      backgroundColor:
                        activeTab === "2" ? "#007bff" : "#f8f9fa",
                      color: activeTab === "2" ? "#fff" : "#007bff",
                      fontWeight: activeTab === "2" ? "bold" : "normal",
                      transition: "background-color 0.3s ease",
                      fontSize: "14px",
                    }}
                  >
                    Billing Address
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} style={{ marginTop: "20px" }}>
                {/* Shipping Address Tab */}
                <TabPane tabId="1">
                  <h5 style={{ fontWeight: "bold", marginBottom: "15px" }}>
                    Shipping Address
                  </h5>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Name:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.first_name}{" "}
                    {orderDetails?.data?.shipping_address?.last_name}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Phone:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.phone_number}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>State:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.state}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>city:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.city}
                  </p>

                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Post Code:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.postal_code}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Address Line:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.address_line_1}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Address Line 2:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.address_line_2}
                  </p>
                </TabPane>

                {/* Billing Address Tab */}
                <TabPane tabId="2">
                  <h5 style={{ fontWeight: "bold", marginBottom: "15px" }}>
                    Billing Address
                  </h5>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Name:</strong>{" "}
                    {orderDetails?.data?.billing_address?.first_name}{" "}
                    {orderDetails?.data?.billing_address?.last_name}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Phone:</strong>{" "}
                    {orderDetails?.data?.billing_address?.phone_number}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>State:</strong>{" "}
                    {orderDetails?.data?.billing_address?.state}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>city:</strong>{" "}
                    {orderDetails?.data?.billing_address?.city}
                  </p>

                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Post Code:</strong>{" "}
                    {orderDetails?.data?.billing_address?.postal_code}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Address Line:</strong>{" "}
                    {orderDetails?.data?.billing_address?.address_line_1}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Address Line 2:</strong>{" "}
                    {orderDetails?.data?.billing_address?.address_line_2}
                  </p>
                </TabPane>
              </TabContent>
            </Card>

            <Card
              body
              style={{
                padding: "20px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h5>Customer Info</h5>
              <p style={{ marginBottom: "5px" }}>
                Name: {orderDetails?.data?.user_name}{" "}
              </p>
              <p style={{ marginBottom: "5px" }}>
                Phone: {orderDetails?.data?.user_email}{" "}
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderDetails;
