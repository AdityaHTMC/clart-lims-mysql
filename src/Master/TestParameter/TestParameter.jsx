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
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Pagination, Stack } from "@mui/material";
  


  const TestParameter = () => {
    const navigate = useNavigate();
  
    const { getTPList , testParameter } = useMasterContext();
    const [currentPage, setCurrentPage] = useState(1);
    const itemperPage = 10;

    const totalPages = testParameter?.total && Math.ceil(testParameter?.total / itemperPage);
  
    useEffect(() => {
        const dataToSend = {
            page: currentPage,
            limit: itemperPage,
          };
        getTPList(dataToSend);
    }, [currentPage]);
  
    console.log(testParameter, "test parameter");
  
    const onOpenModal = () => {
      navigate("/add-test-parameters");
    };
    const handleEdit = (id) => {
      // navigate(`/product-edit/${id}`);
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        // ProductDelete(id);
      }
    };

    const handlepagechange = (newpage) => {
        setCurrentPage(newpage);
      };
  

  
    return (
      <>
        <CommonBreadcrumb title="Test parameter List" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                    <Button color="primary" onClick={onOpenModal}>
                      Add Test parameter
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <div className="promo-code-list">
                      <Table hover responsive>
                        <thead>
                          <tr>
                            <th>Test Name </th>
                            <th>Parameter</th>
                            <th>Range</th>
                            <th>Unit</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Show loading spinner */}
                          {testParameter?.loading ? (
                            <tr>
                              <td colSpan="7" className="text-center">
                                <Spinner color="secondary" className="my-4" />
                              </td>
                            </tr>
                          ) : testParameter?.data?.length === 0 ? (
                            // Show "No products found" when there's no data
                            <tr>
                              <td colSpan="7" className="text-center">
                                No test Parameter Found
                              </td>
                            </tr>
                          ) : (
                            testParameter?.data?.map((product, index) => (
                              <tr key={index}>
                                {/* <td>{product?.test_name}</td> */}
                                <td>
                                {product?.test_name?.length > 20
                                  ? `${product.test_name.slice(0, 20)}...`
                                  : product.test_name}
                              </td>
                                <td>{product?.parameter}</td>
                                <td>
                                  {product?.lower_range} -{" "}
                                  {product?.upper_range}{" "}
                                </td>
                                <td>{product?.unit}</td>
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
  
  export default TestParameter;
  