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
import { Pagination, Stack } from "@mui/material";


const TestPackageList = () => {
  const navigate = useNavigate();

  const { getAllTestPackage, testpackageList, tpDelete } = useMasterContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
    testpackageList?.total && Math.ceil(testpackageList?.total / itemperPage);


  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getAllTestPackage(dataToSend);
  }, [currentPage]);


  const onOpenModal = () => {
    navigate("/add-test-packages");
  };
  const handleEdit = (id) => {
    navigate(`/testpackage-edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      tpDelete(id);
    }
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Test Package List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Test Package
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Test Package </th>
                          {/* <th>Sample Type</th> */}
                          <th>Sell Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {testpackageList?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : testpackageList?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          testpackageList?.data?.map((product, index) => (
                            <tr key={index}>


                              <td id={`package_name-${index}`}>
                                {product?.package_name
                                  ? product.package_name.length > 25
                                    ? `${product.package_name.slice(0, 25)}...`
                                    : product.package_name
                                  : "NA"}
                                {product?.package_name && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`package_name-${index}`}
                                  >
                                    {product?.package_name}
                                  </UncontrolledTooltip>
                                )}
                              </td>

                              {/* <td>{product.sample_type}</td> */}
                              <td>
                                {product?.price_list?.map((el, i) => (
                                  <div key={i}>
                                    <span><b>{el.category_title}</b> : {el.sell_price}</span>
                                  </div>
                                ))}
                              </td>
                              <td>
                                <div className="circelBtnBx">
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => handleEdit(product.id)}
                                  >
                                    <FaEdit />
                                  </Button>
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => handleDelete(product.id)}
                                  >
                                    <FaTrashAlt />
                                  </Button>
                                </div>
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

export default TestPackageList;
