/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Spinner,
    Table,
    UncontrolledTooltip,
  } from "reactstrap";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { FaEdit, FaTrashAlt } from "react-icons/fa";
  import { Pagination, Stack } from "@mui/material";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useDashboardContext } from "../helper/DashboardProvider";
  
  const NotificationList = () => {
    const navigate = useNavigate();
  
  const { getNotificationList, notificationList } = useDashboardContext();
  
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 15;
  
    const totalPages =
    notificationList?.total && Math.ceil(notificationList?.total / itemperPage);
  
    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
      };
      getNotificationList(dataToSend);
    }, [currentPage]);
  

  
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Notification List" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>

                <CardBody>
                  <div className="btn-popup pull-right">

                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <div className="promo-code-list">
                      <Table hover responsive>
                        <thead>
                          <tr>
                            <th>Organization Name </th>
                            <th>Message </th>
                            <th>Order Id </th>
                          
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Show loading spinner */}
                          {notificationList?.loading ? (
                            <tr>
                              <td colSpan="7" className="text-center">
                                <Spinner color="secondary" className="my-4" />
                              </td>
                            </tr>
                          ) : notificationList?.data?.length === 0 ? (
                            // Show "No products found" when there's no data
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Data Found
                              </td>
                            </tr>
                          ) : (
                            notificationList?.data?.map((product, index) => (
                              <tr key={index}>
                                <td>
                                  {product?.organization_name} 
                                </td>
  
                                <td id={`enquiryTooltip-${index}`}>
                                  {product?.message
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}
                                  ...
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`enquiryTooltip-${index}`}
                                  >
                                    {product?.message}
                                  </UncontrolledTooltip>
                                </td>
  
                                <td>{product?.orderId}</td>
                              
                                <td>
                                  {product?.created_at
                                    ? new Date(
                                        product.created_at
                                      ).toLocaleDateString("en-GB")
                                    : ""}
                                </td>
                               
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
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
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default NotificationList;
  