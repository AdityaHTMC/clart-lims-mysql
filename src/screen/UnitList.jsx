/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import CommonBreadcrumb from "../component/common/bread-crumb";
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
import { useCategoryContext } from "../helper/CategoryProvider";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Pagination, Stack } from "@mui/material";
// Register the necessary Chart.js components

const UnitList = () => {
  const navigate = useNavigate();

  const { getunitList, unitLists, DeleteUnit } = useCategoryContext();

  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 15;

  const totalPages =
    unitLists?.total && Math.ceil(unitLists?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      search: searchTerm,
    };
    getunitList(dataToSend);
  }, [currentPage]);

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  const onOpenModal = () => {
    navigate("/add-products");
  };
  const handleEdit = (id) => {
    navigate(`/edit-unit-list/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      DeleteUnit(id);
    }
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <CommonBreadcrumb title="Unit List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Unit
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Unit Name </th>
                          <th>Contact Person Name</th>
                          <th>Mobile</th>
                          <th>District</th>
                          <th>Pin Code</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {unitLists?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : unitLists?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          unitLists?.data?.map((product, index) => (
                            <tr key={index}>
                              <td id={`organization_name-${index}`}>
                                {product?.organization_name
                                  ? product?.organization_name?.length > 20
                                    ? `${product?.organization_name?.slice(
                                        0,
                                        20
                                      )}...`
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
                                    ? `${product?.contact_person?.slice(
                                        0,
                                        20
                                      )}...`
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

export default UnitList;
