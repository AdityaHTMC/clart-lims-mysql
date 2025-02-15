/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
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
  UncontrolledTooltip,
} from "reactstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";
import { IconButton, Pagination, Stack, TextField, Grid, Grid2 } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CrmMaster = () => {
  const navigate = useNavigate();

  const { crmList, crmListsdata } = useMasterContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemperPage = 10;

  const totalPages =
    crmListsdata?.total && Math.ceil(crmListsdata?.total / itemperPage);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    // Debounce effect (500ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 1000);
  
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
        keyword_search: debouncedSearch, 
        min_price: "",
        max_price: "",
        start_date: startDate ? formatDate(startDate) : null,
        end_date: endDate ? formatDate(endDate) : null,
      };
      crmList(dataToSend);
    }, [currentPage, debouncedSearch, startDate, endDate]);

  const fetchCRMList = () => {
    const dataToSend = {
      page: currentPage,
      keyword_search: searchTerm,
      min_price: minPrice || null, 
      max_price: maxPrice || null,
    };

    crmList(dataToSend); 
  };

  // Auto-fetch on search or pagination changes
  useEffect(() => {
    fetchCRMList();
  }, [currentPage]);



  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="CRM List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div
                  style={{
                    padding: "16px",
                    background: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <Grid2 container spacing={2} alignItems="center">
                    {/* Search Input */}
                    <Grid2 item xs={12} md={6} lg={4}>
                      <TextField
                        id="search-box"
                        label="Search Customer"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <IconButton>
                              <SearchIcon style={{ color: "#979797" }} />
                            </IconButton>
                          ),
                        }}
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: "4px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </Grid2>

                    {/* Price Filters */}
                    <Grid2 item xs={6} md={3} lg={2}>
                      <TextField
                        type="number"
                        label="Min Price"
                        variant="outlined"
                        fullWidth
                        value={minPrice}
                        inputProps={{ min: 0 }}
                        onChange={(e) => setMinPrice(e.target.value)}
                        sx={{ backgroundColor: "#fff" }}
                      />
                    </Grid2>
                    <Grid2 item xs={6} md={3} lg={2}>
                      <TextField
                        type="number"
                        label="Max Price"
                        variant="outlined"
                        fullWidth
                        value={maxPrice}
                        inputProps={{ min: 0 }}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        sx={{ backgroundColor: "#fff" }}
                      />
                    </Grid2>

                    {/* Filter Button */}
                    <Grid2 item xs={12} md={3} lg={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={fetchCRMList}
                        sx={{
                          height: "100%",
                          fontWeight: "bold",
                          textTransform: "none",
                          borderRadius: "8px",
                        }}
                      >
                        Apply Filter
                      </Button>
                    </Grid2>
                    {/* date filter */}
                    <Grid2 item xs={12} md={3} lg={2}>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        placeholderText="Start Date"
                        className="form-control"
                      />
                    </Grid2>
                    <Grid2 item xs={12} md={3} lg={2}>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        placeholderText="End Date"
                        className="form-control"
                      />
                    </Grid2>

                    <Grid2 item xs={12} md={3} lg={2}>
                      <Button
                        color="primary"
                        onClick={() => {
                          setStartDate(null);
                          setEndDate(null);
                        }}
                      >
                        Clear Dates
                      </Button>
                    </Grid2>
                    
                  </Grid2>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Pincode</th>
                          <th>Mobile</th>
                          <th>Address</th>
                          <th>District</th>
                          <th> Total Order </th>
                          <th>Total Paid </th>
                          <th> Total Paid </th>
                          <th>Unpaid Order </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {crmListsdata?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : crmListsdata?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Customer List Found
                            </td>
                          </tr>
                        ) : (
                          crmListsdata?.data?.map((product, index) => (
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
                              <td>{product?.pincode || "NA"}</td>
                              <td>{product?.mobile || "NA"}</td>
                              <td id={`address-${index}`}>
                                {product?.address
                                  ? product.address.length > 15
                                    ? `${product.address.slice(0, 15)}...`
                                    : product.address
                                  : "NA"}
                                {product?.address && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`address-${index}`}
                                  >
                                    {product?.address}
                                  </UncontrolledTooltip>
                                )}
                              </td>
                              <td>{product?.district || "NA"}</td>
                              <td>{product?.total_orders || "NA"}</td>
                              <td> {product?.total_paid} </td>
                              <td>
                                <Link to={`/payments/${product?.id}/Paid`}>
                                  <Badge
                                    color="primary"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {product?.paid_orders || "NA"}
                                  </Badge>
                                </Link>
                              </td>
                              <td>
                                <Link to={`/payments/${product?.id}/Unpaid`}>
                                  <Badge
                                    color="danger"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {product?.unpaid_orders || "NA"}
                                  </Badge>
                                </Link>
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

export default CrmMaster;
