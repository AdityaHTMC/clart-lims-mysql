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
  
  import CommonBreadcrumb from "../../component/common/bread-crumb";
  import { useCommonContext } from "../../helper/CommonProvider";
  
  const EnquiryList = () => {
    const navigate = useNavigate();
  
    const { getEnquiryList,enquirylist } = useCommonContext();
  
    useEffect(() => {
        getEnquiryList();
    }, []);
  
    console.log(enquirylist, "enquirylist");
  
    const onOpenModal = () => {
      navigate("/add-task");
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
  
    return (
      <>
        <CommonBreadcrumb title="Enquiry List" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                    {/* <Button color="primary" onClick={onOpenModal}>
                        Add Task
                      </Button> */}
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <div className="promo-code-list">
                      <Table hover responsive>
                        <thead>
                          <tr>
                           <th>First Name </th>
                           <th>Last Name </th>
                            <th>message </th>
                            <th>Email </th>
                            <th>phone </th>
                            <th>Date</th>
                            {/* <th>status</th> */}
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Show loading spinner */}
                          {enquirylist?.loading ? (
                            <tr>
                              <td colSpan="7" className="text-center">
                                <Spinner color="secondary" className="my-4" />
                              </td>
                            </tr>
                          ) : enquirylist?.data?.length === 0 ? (
                            // Show "No products found" when there's no data
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Data Found
                              </td>
                            </tr>
                          ) : (
                            enquirylist?.data?.map((product, index) => (
                              <tr key={index}>
                                <td>{product?.first_name}</td>
                                <td>{product?.last_name}</td>
                        
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
                                <td>{product?.email}</td>
                                <td>{product?.phone}</td>
                                <td>
                                  {product?.created_at
                                    ? new Date(
                                        product.created_at
                                      ).toLocaleDateString("en-GB")
                                    : ""}
                                </td>
                                {/* <td>{product?.status}</td> */}
                                {/* <td>
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
                                      onClick={() => handleDelete(product._id)}
                                    >
                                      <FaTrashAlt />
                                    </Button>
                                  </div>
                                </td> */}
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
  
  export default EnquiryList;
  