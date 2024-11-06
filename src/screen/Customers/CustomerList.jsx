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
  } from "reactstrap";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { FaEdit, FaTrashAlt } from "react-icons/fa";
  import { IoAddCircle } from "react-icons/io5";
  import SearchIcon from "@mui/icons-material/Search";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";
import { IconButton, Pagination, Stack, TextField } from "@mui/material";

  
  const CustomerList = () => {
    const navigate = useNavigate();
  
    const { allCustomerList,customerLists,customerDelete } = useMasterContext();
  
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemperPage = 10;

    const totalPages = customerLists?.total && Math.ceil(customerLists?.total / itemperPage);
  
    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
        keyword_search: searchTerm,
      };
        allCustomerList(dataToSend);
    }, [currentPage,searchTerm]);
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const onOpenModal = () => {
      navigate("/add-customer");
    };
    const handleEdit = (id) => {
      // navigate(`/product-edit/${id}`);
    };

    const handleaddPet = (id) => {
      navigate(`/add-pet/${id}`);
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this?")) {
        customerDelete(id);
      }
    };
  
    const onCloseModal = () => {
      setOpen(false);
    };

    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Customer List" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <form className="searchBx" style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      id="search-box"
                      label="Search Customer"
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
                       Add Customer
                    </Button>
                  </div>
                </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <div className="promo-code-list">
                      <Table hover responsive>
                        <thead>
                          <tr>
                            <th>Name </th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            {/* <th>Pin Code</th> */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Show loading spinner */}
                          {customerLists?.loading ? (
                            <tr>
                              <td colSpan="7" className="text-center">
                                <Spinner color="secondary" className="my-4" />
                              </td>
                            </tr>
                          ) : customerLists?.data?.length === 0 ? (
                            // Show "No products found" when there's no data
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Phlebotomist List Found
                              </td>
                            </tr>
                          ) : (
                            customerLists?.data?.map((product, index) => (
                              <tr key={index}>
                                <td>{product?.name}</td>
                                <td>{product?.email}</td>
                                <td>{product?.mobile}</td>
                                <td>{product?.address}</td>
                                {/* <td>{product.pincode}</td> */}
  
                                <td>
                                  <div className="circelBtnBx">
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleEdit(product?._id)}
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleDelete(product?._id)}
                                    >
                                      <FaTrashAlt />
                                    </Button>
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleaddPet(product?._id)}
                                    >
                                     <IoAddCircle />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
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
  
  export default CustomerList;
  