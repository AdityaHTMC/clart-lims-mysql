/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
    Badge,
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
    Table,
  } from "reactstrap";
  import { useEffect, useState } from "react";
  import { TiDeleteOutline } from "react-icons/ti";
  
  import { useNavigate } from "react-router-dom";
  
  import { Spinner } from "reactstrap";
  import "react-quill/dist/quill.snow.css";
  import { useMasterContext } from "../helper/MasterProvider";
  import CommonBreadcrumb from "../component/common/bread-crumb";
  import { useStockContext } from "../helper/StockManagement";
  import { IoCloseSharp } from "react-icons/io5";
  import { AiOutlinePlus } from "react-icons/ai";
  import { useCategoryContext } from "../helper/CategoryProvider";
  import { Autocomplete, TextField } from "@mui/material";
  const StockLQA = () => {
    const navigate = useNavigate();
    const {getStockLQAList,stocklqa} = useStockContext();

  
 

    useEffect(() => {

      getStockLQAList()
    }, []);
  
console.log(stocklqa,'stock')

  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        // deletevendor(id);
      }
    };
  
 

  
    return (
      <>
        <CommonBreadcrumb title="Stock Low quantity alart list" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                   
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Item Name </th>
                          <th>Item Group </th>
                          <th>Low Quantity Alert</th>
                          <th>Stock Quantity</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {stocklqa?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : stocklqa?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No purchase-to-stock Found
                            </td>
                          </tr>
                        ) : (
                            stocklqa?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.item_name}</td>
                              <td>{product.item_group_name}</td>
                              <td>{product.low_quantity_alert}</td>
                              <td>{product.stock_quantity}</td>
                              <td>{product.amount}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
  
      
  
     
      </>
    );
  };
  
  export default StockLQA;
  