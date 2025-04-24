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
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { IconButton, Pagination, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const TestList = () => {
  const navigate = useNavigate();

  const { gettestTestList, testList, deleteTest } = useMasterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const itemperPage = 15;

  const totalPages =
    testList?.total && Math.ceil(testList?.total / itemperPage);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 700); // Delay API call by 700ms

    return () => clearTimeout(handler); // Cleanup previous timer
  }, [searchTerm]);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      keyword_search: debouncedSearchTerm,
    };
    gettestTestList(dataToSend);
  }, [currentPage, debouncedSearchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onOpenModal = () => {
    navigate("/add-test");
  };
  const handleEdit = (id) => {
    navigate(`/edit-test/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteTest(id);
    }
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Test List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <form className="searchBx" style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      id="search-box"
                      label="Search Test"
                      variant="outlined"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      fullWidth
                      sx={{
                        maxWidth: "400px",
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                      }}
                    />
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon style={{ fill: "#979797" }} />
                    </IconButton>
                  </form>

                  {/* Add Test Button */}
                  <div className="btn-popup">
                    <Button
                      color="primary"
                      onClick={onOpenModal}
                      style={{ marginLeft: "15px" }}
                    >
                      Add Test
                    </Button>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Test Name </th>
                          <th>Group</th>
                          <th>Sell Price</th>
                          <th>Test Code</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {testList?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : testList?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          testList?.data?.map((product, index) => {
                            return (
                              <tr key={index}>
                                <td id={`test_name-${index}`}>
                                  {product?.test_name
                                    ? product.test_name.length > 30
                                      ? `${product.test_name.slice(0, 35)}...`
                                      : product.test_name
                                    : "NA"}
                                  {product?.test_name && (
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`test_name-${index}`}
                                    >
                                      {product?.test_name}
                                    </UncontrolledTooltip>
                                  )}
                                </td>


                                <td id={`group_name-${index}`}>
                                  {product?.group_name
                                    ? product?.group_name.length > 20
                                      ? `${product?.group_name.slice(0, 20)}...`
                                      : product?.group_name
                                    : "NA"}
                                  {product?.group_name && (
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`group_name-${index}`}
                                    >
                                      {product?.group_name}
                                    </UncontrolledTooltip>
                                  )}
                                </td>

                                <td>
                                  {product?.price_list?.map((el, i) => (
                                    <div key={i}>
                                      <span><b>{el.category_title}</b> : {el.sell_price}</span>
                                    </div>
                                  ))}
                                </td>
                                <td>{product?.testcode || "NA"}</td>
                                {/* <td>{product.pincode}</td> */}

                                <td>
                                  <div className="circelBtnBx">
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleEdit(product?.id)}
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleDelete(product?.id)}
                                    >
                                      <FaTrashAlt />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                        )}
                      </tbody>
                      <Stack className="rightPagination mt10" spacing={2}>
                        <Pagination
                          color="primary"
                          count={totalPages}
                          page={currentPage}
                          shape="rounded"
                          onChange={(event, value) => handlepagechange(value)}
                        />
                      </Stack>
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

export default TestList;
