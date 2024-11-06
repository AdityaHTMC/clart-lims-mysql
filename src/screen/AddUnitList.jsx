/* eslint-disable no-unused-vars */
import { Card, CardBody, Col, Container, Row } from "reactstrap";
// import ProductCodePrice from "./ProductCodeAndPrice";
// import ProductSizeAndDescription from "./ProductSizeAndDescription";
// import TotalProducts from "./TotalProducts";
import CommonBreadcrumb from "../component/common/bread-crumb";
import CommonCardHeader from "../component/common/card-header";
import ProductAddForm from "../component/product/product-add-form";
import { Fragment } from "react";
import AddProductForm from "./AddUnitForm";
import AddUnitForm from "./AddUnitForm";

const AddUnitList = () => {
    const handleValidSubmit = () => { };
    return (
        <Fragment>
            <CommonBreadcrumb title="Add Unit" parent="Physical" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Add Product" /> */}
                            <CardBody>
                                <Row className="product-adding">
                                    <AddUnitForm />
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default AddUnitList;




