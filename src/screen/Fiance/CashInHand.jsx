/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
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
  Spinner,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { IconButton, Pagination, Stack, TextField } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import SearchIcon from "@mui/icons-material/Search";
const CashInHand = () => {
  const navigate = useNavigate();

  const { getCashinHandList, cihList } = useMasterContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 15;

  const totalPages = cihList?.total && Math.ceil(cihList?.total / itemperPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
     keyword_search: searchTerm,
    };
    getCashinHandList(dataToSend);
  }, [currentPage, searchTerm]);

  const handlesearchicon = () => {
    if (searchTerm) {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
        keyword_search: searchTerm,
      };
      getCashinHandList(dataToSend);
    }
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Phlebotomist Cash in hand" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div
                  className=""
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <TextField
                    id="search-box"
                    label="Search Phlebotomist"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    fullWidth
                    sx={{
                      maxWidth: "400px",
                      backgroundColor: "#fff",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <IconButton
                    type="submit"
                    aria-label="search"
                    onClick={handlesearchicon}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </div>

                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th> Name </th>
                          <th>Mobile</th>
                          <th>District</th>
                          <th>Pin Code</th>
                          <th> Cash In Hand </th>
                          <th> Work Status </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {cihList?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : cihList?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Unit List Found
                            </td>
                          </tr>
                        ) : (
                          cihList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td id={`name-${index}`}>
                                {product?.name
                                  ? product?.name?.length > 20
                                    ? `${product?.name?.slice(0, 20)}...`
                                    : product?.name
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
                              <td>{product?.mobile || "NA"}</td>
                              <td>{product?.district || "NA"}</td>
                              <td>{product?.pincode || "NA"}</td>
                              <td>{product?.cash_in_hand || "NA"}</td>
                              <td>{product?.work_status || "NA"}</td>
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

export default CashInHand;
