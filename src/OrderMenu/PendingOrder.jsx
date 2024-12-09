/* eslint-disable no-unused-vars */
import {
    Badge,
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Spinner,
    Table,
  } from "reactstrap";
  
  import { useNavigate } from "react-router-dom";
  
  import { useEffect, useState } from "react";
  
  import { FaDeleteLeft, FaEye } from "react-icons/fa6";
  
  import { FiEdit } from "react-icons/fi";
  import CommonBreadcrumb from "../component/common/bread-crumb";
  import { useOrderContext } from "../helper/OrderProvider";
  import { useMasterContext } from "../helper/MasterProvider";
  import { Pagination, Stack } from "@mui/material";
  import { useDashboardContext } from "../helper/DashboardProvider";
  
  const PendingOrder = () => {
    const Navigate = useNavigate();
    const { getPendingOrderList,pendingOrder } = useOrderContext();
    const { getOrderMasterList, addOrderMasterList, orderMasterList } = useMasterContext();
  
    const { getTestOrderCount,testOrderCount } = useDashboardContext();
  
    const [selectedStatus, setSelectedStatus] = useState("");
  
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 15;
  
    const totalPages =
    pendingOrder?.total && Math.ceil(pendingOrder?.total / itemperPage);
  
    useEffect(() => {
      const dataToSend = {
        status: selectedStatus,
        page: currentPage,
        limit: itemperPage,
      };
      getPendingOrderList(dataToSend);
    }, [selectedStatus, currentPage, searchTerm]);
  
    useEffect(() => {
      getOrderMasterList();
      getTestOrderCount();
    }, []);
  
    // useEffect(() => {
    //     if(orderStatus?.data?.length > 0){
    //         setSelectedStatus(orderStatus?.data[0].title)
    //     }
    // }, [orderStatus.data])
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    const navigatOrderDetails = (id) => {
      Navigate(`/order-details/${id}`);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Pending Orders" parent="" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Add Product" /> */}
                <CardBody>
             
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Order Id</th>
                          <th>Collection Date</th>
                          <th>Customer Info</th>
                          <th>Pet</th>
                          <th>Total Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {!pendingOrder.loading &&
                          pendingOrder?.data?.map((order, index) => (
                            <tr key={index}>
                              <td>
                                <Badge color="danger">{order.order_id}</Badge>
                              </td>
                              <td>
                                {order?.booking_date
                                  ? new Date(
                                    order.booking_date
                                    ).toLocaleDateString("en-GB")
                                  : ""}
                              </td>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  {/* <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={order?.customer_image || `/assets/images/profile.png`} alt="header-user" /> */}
                                  <div>
                                    <h5 className="mb-0">
                                      {order?.customer_name}
                                    </h5>
                                    <p>{order?.customer_phone}</p>
                                  </div>
                                  <Badge></Badge>
                                </div>
                              </td>
                              <td>
                                {order.pet_details?.breed} (
                                {order.pet_details?.sex})
                              </td>
                              <td>{order?.total_amount}</td>
                              <td>
                                <Badge>{order.status}</Badge>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="circelBtnBx">
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() =>
                                        navigatOrderDetails(order?.id)
                                      }
                                    >
                                      <FaEye />
                                    </Button>
                                  </div>
                                  {/* <div className="circelBtnBx">
                                    <Button
                                      className="btn"
                                      color="link"
                                      // onClick={() => handleRemove(lab)}
                                    >
                                      <FiEdit />
                                    </Button>
                                  </div> */}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    {pendingOrder.loading && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Spinner color="secondary" className="my-4" />
                      </div>
                    )}
                    {!pendingOrder.loading && pendingOrder?.data?.length === 0 && (
                      <p className="my-4 text-center">No data found</p>
                    )}
  
                    <Stack className="rightPagination mt10" spacing={2}>
                      <Pagination
                        color="primary"
                        count={totalPages}
                        page={currentPage}
                        shape="rounded"
                        onChange={(event, value) => handlepagechange(value)}
                      />
                    </Stack>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default PendingOrder;
  