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
const OrderDetailspage = () => {
  const { id } = useParams();
  const { OrderStatusUpdate } = useCommonContext();

  const { getOrderMasterList, orderMasterList, orderDetails, getOrderDetails } =
    useMasterContext();
  const { getAllphlebotomist, phlebotomistList } = useCategoryContext();

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
      getOrderMasterList();
      getAllphlebotomist();
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

  const totalProfessionalFees = orderDetails.data?.professional_fees?.reduce(
    (total, item) => total + item.price,
    0
  );

  const handleSubmit = () => {
    const dataToSend = {
      id: id,
      shipping_method:
        selectedOption === "Courier" ? "Courier" : "Delivery Boy",
      delivery_boy_id:
        selectedOption === "DeliveryBoy" ? selectedDeliveryBoy : "",
    };

    if (selectedDeliveryBoy) {
      OrderStatusUpdate(dataToSend);
    } else {
      toast.error("Select a delivery boy before Updating order status");
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
                    {orderDetails?.data?.order_id}
                  </span>
                </h5>
                <p style={{ color: "#777", margin: 0 }}>
                  {" "}
                  Booking Date : {""}
                  {new Date(orderDetails.data?.booking_date).toLocaleString(
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
              {orderDetails?.data?.tests && (
                <>
                  <div className="mt-2 h6 fs-4">Test List </div>
                  <Table bordered hover style={{ marginTop: "10px" }}>
                    <thead>
                      <tr>
                        <th>Sample&nbsp;ID</th>
                        <th className="text-break">Product</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.data?.tests?.map((item) => (
                        <>
                          <tr>
                            <td>{item.sample_id}</td>
                            <td className="text-break">{item.test_name}</td>
                            <td>₹{item.price}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              {orderDetails.data.professional_fees && (
                <>
                  <div className="mt-2 h6 fs-4">Professional Fees</div>
                  <Table bordered hover style={{ marginTop: "10px" }}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Professional Service</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.data?.professional_fees?.map((item) => (
                        <>
                          <tr>
                            <td>{item._id}</td>
                            <td className="text-wrap">
                              {item.professional_service}
                            </td>
                            <td>₹{item.price}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              {orderDetails.data.package_name && (
                <>
                  <div className="mt-2 h6 fs-4">Test Package</div>
                  <Table bordered hover style={{ marginTop: "10px" }}>
                    <thead>
                      <tr>
                        <th>package_name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-wrap">
                          {orderDetails.data.package_name}
                        </td>
                        <td>₹{orderDetails.data.package_price}</td>
                      </tr>
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
                {orderDetails?.data?.discount_price && (
                  <p>Discount: ₹{orderDetails?.data?.discount_price}</p>
                )}
                {orderDetails?.data?.professional_fees && (
                  <p>Total Professional Fees: ₹{totalProfessionalFees || 0} </p>
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
                {orderDetails?.data.payment_status && (
                  <>
                    <h5>
                      Payment Status:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {orderDetails?.data?.payment_status}{" "}
                      </span>
                    </h5>
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

                {orderDetails?.data?.phlebotomist_name && (
                  <h5>
                    Phlebotomist Name:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      {orderDetails?.data?.phlebotomist_name}{" "}
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
                  {orderMasterList?.data?.map((order) => (
                    <option key={order._id} value={order.title}>
                      {order.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              {/* Conditional Delivery Boy Dropdown */}

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
                    <option key={boy._id} value={boy._id}>
                      {boy.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              {/* Submit Button */}
              <Button color="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Card>

            {/* <Card
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
            </Card> */}

            <Card
              body
              style={{
                padding: "20px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h5>Customer Info</h5>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderDetailspage;
