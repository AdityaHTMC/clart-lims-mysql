import { Card, CardBody, Col, Container, Row } from "reactstrap";
import UserTabs from "../component/user/user-tabs";
import CommonBreadcrumb from "../component/common/bread-crumb";
import CommonCardHeader from "../component/common/card-header";

const CreateUser = () => {
    return (
        <>
            <CommonBreadcrumb title="Create User" parent="Users" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title="Add User" />
                            <CardBody>
                                <UserTabs />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CreateUser;
