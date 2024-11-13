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
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useCategoryContext } from "../../helper/CategoryProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Pagination, Stack } from "@mui/material";




const CollectionList = () => {
  const navigate = useNavigate();

  const { collectionLists , getCollectionList } = useCategoryContext();

  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 15;

  const totalPages = collectionLists?.total && Math.ceil(collectionLists?.total / itemperPage);


  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      search: searchTerm,
    };
    getCollectionList();
  }, [currentPage]);

  
  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };


  const onOpenModal = () => {
    navigate("/add-connection");
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

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <CommonBreadcrumb title="Collection List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Collection Center 
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Collection Name </th>
                          <th>Contact Person Name</th>
                          <th>Mobile</th>
                          <th>District</th>
                          <th>Pin Code</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {collectionLists?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : collectionLists?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Unit List Found
                            </td>
                          </tr>
                        ) : (
                          collectionLists?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.organization_name}</td>
                              <td>{product.contact_person}</td>
                              <td>{product.mobile}</td>
                              <td>{product.district}</td>
                              <td>{product.pincode}</td>

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

export default CollectionList;
