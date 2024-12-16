/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
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

import { IconButton, Pagination, Stack, TextField } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";

const Audit = () => {
  const navigate = useNavigate();

  const { getAuditTrailList, auditTrailsList } = useMasterContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 15;

  const totalPages =
    auditTrailsList?.total && Math.ceil(auditTrailsList?.total / itemperPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      keyword_search: searchTerm,
    };
    getAuditTrailList(dataToSend);
  }, [currentPage, searchTerm]);

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Audit Trails" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>User Type </th>
                          <th>User contact</th>
                          <th> Action</th>
                          <th>Ip</th>
                          <th>Action Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {auditTrailsList?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : auditTrailsList?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No List Found
                            </td>
                          </tr>
                        ) : (
                          auditTrailsList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product?.user_type}</td>

                              <td id={`user_email-${index}`}>
                                {product?.user_email
                                  ? product?.user_email.length > 20
                                    ? `${product?.user_email.slice(0, 20)}...`
                                    : product?.user_email
                                  : "NA"}
                                {product?.user_mobile && (
                                  <span>
                                    <br />({product?.user_mobile})
                                  </span>
                                )}
                                {product?.user_email && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`user_email-${index}`}
                                  >
                                    {product?.user_email}
                                  </UncontrolledTooltip>
                                )}
                              </td>

                              <td id={`action_done-${index}`}>
                                {product?.action_done
                                  ? product?.action_done?.length > 20
                                    ? `${product?.action_done?.slice(0, 20)}...`
                                    : product?.action_done
                                  : "NA"}
                                {product?.action_done && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`action_done-${index}`}
                                  >
                                    {product?.action_done}
                                  </UncontrolledTooltip>
                                )}
                              </td>

                              <td id={`ip-${index}`}>
                                {product?.ip
                                  ? product?.ip?.length > 40
                                    ? `${product?.ip?.slice(0, 40)}...`
                                    : product?.ip
                                  : "NA"}
                                {product?.ip && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`ip-${index}`}
                                  >
                                    {product?.ip}
                                  </UncontrolledTooltip>
                                )}
                              </td>

                              <td>
                                {product?.created_at
                                  ? new Date(product.created_at).toLocaleString(
                                      "en-GB",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: false, // Use 24-hour format; set to `true` for 12-hour format with AM/PM
                                      }
                                    )
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

export default Audit;
