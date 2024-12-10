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

const Transaction = () => {
  const navigate = useNavigate();

  const { getTransationList, transationList } = useMasterContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
    transationList?.total && Math.ceil(transationList?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getTransationList(dataToSend);
  }, [currentPage]);

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Transaction List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                        
                          <th>Debit Amount</th>
                          <th>Credit Amount</th>
                          <th>Closing Balance</th>
                          <th>Transaction From</th>
                          <th>Transaction To</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {transationList?.loading ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : transationList?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="6" className="text-center">
                              No Data List Found
                            </td>
                          </tr>
                        ) : (
                          transationList?.data?.map((transaction, index) => (
                            <tr key={index}>
                            
                              <td>{transaction.debit_amount}</td>
                              <td>{transaction.credit_amount}</td>
                              <td>{transaction.closing_balance}</td>
                              <td>
                                {transaction.transaction_from === "phlebotomist"
                                  ? transaction.phlebotomist_name 
                                  : transaction.transaction_from === "lab"
                                  ? transaction.lab_name
                                  : transaction.transaction_from === "unit"
                                  ? transaction.unit_name
                                  : transaction.transaction_from ===
                                    "collection_center"
                                  ? transaction.collection_center_name
                                  : transaction.transaction_from ===
                                    "transporter"
                                  ? transaction.transporter_name
                                  : transaction.transaction_from} ({transaction.transaction_from})
                              </td>
                              <td>
                                {transaction.transaction_to === "phlebotomist"
                                  ? transaction.phlebotomist_name
                                  : transaction.transaction_to === "lab"
                                  ? transaction.lab_name
                                  : transaction.transaction_to === "unit"
                                  ? transaction.unit_name
                                  : transaction.transaction_to ===
                                    "collection_center"
                                  ? transaction.collection_center_name
                                  : transaction.transaction_to === "transporter"
                                  ? transaction.transporter_name
                                  : transaction.transaction_to} ({transaction.transaction_to})
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

export default Transaction;
