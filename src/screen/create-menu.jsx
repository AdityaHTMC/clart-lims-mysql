import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import CommonCardHeader from "../component/common/card-header";

const CreateMenu = () => {
    return (
        <>
            <CommonBreadcrumb title="Create Menu" parent="Menus" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title="Add Menu" />
                            <CardBody>
                                <Form className="needs-validation">
                                    <FormGroup>
                                        <Row>
                                            <Col xl="3" md="4">
                                                <Label>
                                                    <span>*</span> Menu Name
                                                </Label>
                                            </Col>
                                            <Col md="8">
                                                <Input id="validationCustom0" type="text" required />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xl="3" md="4">
                                                <Label>Status</Label>
                                            </Col>
                                            <Col xl="9" md="8">
                                                <Label className="d-block">
                                                    <Input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                    Enable the Coupon
                                                </Label>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <Button color="primary">Save</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CreateMenu;
