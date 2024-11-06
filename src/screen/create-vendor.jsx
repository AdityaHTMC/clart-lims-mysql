import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import CommonCardHeader from "../component/common/card-header";
import UserTabs from "../component/user/user-tabs";

const CreateVendors = () => {
  return (
    <>
      <CommonBreadcrumb title="Create Vendor" parent="Vendors" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title="Add Vendor" />
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

export default CreateVendors;
