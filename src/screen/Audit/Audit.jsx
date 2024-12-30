/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
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
import { MdFilterAlt } from "react-icons/md";

const Audit = () => {
  const navigate = useNavigate();

  const { getAuditTrailList, auditTrailsList, getcsvAudit, csvAuditData } =
    useMasterContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);

  const itemperPage = 15;

  const totalPages =
    auditTrailsList?.total && Math.ceil(auditTrailsList?.total / itemperPage);

  console.log(csvAuditData, "csvAuditData");

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      keyword_search: searchTerm,
      user_type: userType,
    };
    getAuditTrailList(dataToSend);
  }, [currentPage, searchTerm, userType]);

  const handleDownloadCsv = async () => {
    setLoading(true);
    try {
      const url = await getcsvAudit(userType);
      // Check if csvAuditData contains the file blob
      if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.download = `${url}_Report.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("No data available for CSV download.");
      }
    } catch (error) {
      console.error("Error downloading CSV:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

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
                  <div className="d-flex flex-column mb-4">
                    {/* Filter Label */}
                    <p className="d-flex align-items-center m-0 mb-2">
                      <MdFilterAlt
                        fontSize={20}
                        className="text-primary mr-2"
                      />
                      <span style={{ fontSize: "15px", fontWeight: "500" }}>
                        Filter Audit Trails By User Type
                      </span>
                    </p>

                    {/* Dropdown and Button */}
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      {/* Dropdown */}
                      <Input
                        type="select"
                        value={userType}
                        onChange={handleUserTypeChange}
                        className="form-control shadow-sm"
                        style={{ maxWidth: "300px" }}
                      >
                        <option value="">Select User Type</option>
                        <option value="">All</option>
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                        <option value="Unit">Unit</option>
                        <option value="B2B User">B2B User</option>
                        <option value="Lab">Lab</option>
                        <option value="Collection Center">
                          Collection Center
                        </option>
                        <option value="Phlebotomist">Phlebotomist</option>
                        <option value="Transporter">Transporter</option>
                      </Input>

                      {/* Download Button */}
                      <Button
                        color="primary"
                        onClick={handleDownloadCsv}
                        disabled={loading}
                        className="shadow-sm"
                        style={{ marginLeft: "10px" }}
                      >
                        {loading ? (
                          <>
                            <Spinner size="sm" className="mr-2" />
                            Downloading...
                          </>
                        ) : (
                          "Download CSV"
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>User Type </th>
                          <th>User contact</th>
                          <th> Action</th>
                          <th>IP Address</th>
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
                                  ? product?.user_email.length > 35
                                    ? `${product?.user_email.slice(0, 35)}...`
                                    : product?.user_email
                                  : "NA"}
                                {product?.user_mobile ? (
                                  <span>
                                    <br />({product?.user_mobile})
                                  </span>
                                ) : (
                                  <span>
                                    <br />
                                    (No Mobile Number Found)
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
                                  ? product?.action_done?.length > 30
                                    ? `${product?.action_done?.slice(0, 30)}...`
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
