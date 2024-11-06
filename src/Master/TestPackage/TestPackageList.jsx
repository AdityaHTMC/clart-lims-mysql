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
  

  const TestPackageList = () => {
    const navigate = useNavigate();
  
    const { getAllTestPackage , testpackageList,tpDelete } = useMasterContext();
  
  
    useEffect(() => {
        getAllTestPackage();
    }, []);
  
    console.log(testpackageList, "testList");
  
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
                            <th>Sample Type</th>
                            <th>Price</th>
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
                                No test Package List Found
                              </td>
                            </tr>
                          ) : (
                            testpackageList?.data?.map((product, index) => (
                              <tr key={index}>
                                <td>{product.package_name}</td>
                                <td>{product.sample_type}</td>
                                <td>{product.price}</td>
                                <td>{product.sell_price}</td>
                                <td>
                                  <div className="circelBtnBx">
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleEdit(product._id)}
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleDelete(product._id)}
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
  