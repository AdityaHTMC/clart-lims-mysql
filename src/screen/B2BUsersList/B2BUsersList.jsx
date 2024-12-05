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
  
  import CommonBreadcrumb from "../../component/common/bread-crumb";
  import { useCategoryContext } from "../../helper/CategoryProvider";
  import { Pagination, Stack } from "@mui/material";
  // Register the necessary Chart.js components
  
  
  const B2BUsersList = () => {
    const navigate = useNavigate();
  
    const { b2busers,getB2bList,DeleteLab } = useCategoryContext();
  
    const [open, setOpen] = useState(false);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 15;
  
    const totalPages = b2busers?.total && Math.ceil(b2busers?.total / itemperPage);
  
    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
        search: searchTerm,
      };
      getB2bList(dataToSend);
    }, [currentPage]);
  
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    const onOpenModal = () => {
      navigate("/add-b2b-users");
    };
    const handleEdit = (id) => {
      navigate(`/edit-b2b-edit/${id}`);
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        DeleteLab(id);
      }
    };
  
    const onCloseModal = () => {
      setOpen(false);
    };
  
    return (
      <>
        <CommonBreadcrumb title="B2B List" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                    <Button color="primary" onClick={onOpenModal}>
                    Add B2B User
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <div className="promo-code-list">
                      <Table hover responsive>
                        <thead>
                          <tr>
                            <th>Organization Name </th>
                            <th>Contact Person Name</th>
                            <th>Mobile</th>
                            <th>District</th>
                            <th>Pin Code</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Show loading spinner */}
                          {b2busers?.loading ? (
                            <tr>
                              <td colSpan="7" className="text-center">
                                <Spinner color="secondary" className="my-4" />
                              </td>
                            </tr>
                          ) : b2busers?.data?.length === 0 ? (
                            // Show "No products found" when there's no data
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Data Found
                              </td>
                            </tr>
                          ) : (
                            b2busers?.data?.map((product, index) => (
                              <tr key={index}>
                               <td id={`organization_name-${index}`}>
                                {product?.organization_name
                                  ? product?.organization_name?.length > 20
                                    ? `${product?.organization_name?.slice(0, 20)}...`
                                    : product?.organization_name
                                  : "NA"}
                                {product?.organization_name && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`organization_name-${index}`}
                                  >
                                    {product?.organization_name}
                                  </UncontrolledTooltip>
                                )}
                              </td>
                              <td id={`contact_person-${index}`}>
                                {product?.contact_person
                                  ? product?.contact_person?.length > 20
                                    ? `${product?.contact_person?.slice(0, 20)}...`
                                    : product?.contact_person
                                  : "NA"}
                                {product?.contact_person && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`contact_person-${index}`}
                                  >
                                    {product?.contact_person}
                                  </UncontrolledTooltip>
                                )}
                              </td>
                                <td>{product?.mobile || "NA"}</td>
                                <td>{product?.district || "NA"}</td>
                                <td>{product?.pincode || "NA"}</td>
  
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
  
  export default B2BUsersList;
  