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

import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";
import { Pagination, Stack } from "@mui/material";

const NewsLetter = () => {
  const navigate = useNavigate();

  const { getNewLetterList, newsletterlist } = useCommonContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
  newsletterlist?.total && Math.ceil(newsletterlist?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getNewLetterList(dataToSend);
  }, [currentPage]);

  console.log(newsletterlist, "newsletterlist");

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

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="New Letter List" />
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
                          <th>Email </th>
                          <th>Date</th>
                          {/* <th>status</th> */}
                          {/* <th>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {newsletterlist?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : newsletterlist?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          newsletterlist?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product?.email}</td>
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

export default NewsLetter;
