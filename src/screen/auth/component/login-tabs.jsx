/* eslint-disable no-unused-vars */
import { Unlock, User } from "react-feather";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Card, CardBody, Col } from "reactstrap";
import LoginForm from "./login-form";
import RegisterForm from "./registration-form";

const LoginTabs = () => {
  return (
    <Col md="7" className="p-0 card-right">
      <Card className="tab2-card">
        <CardBody>
          <Tabs>
            <TabList className="nav nav-tabs tab-coupon">
              <Tab className="nav-link">
                <User />
                Login
              </Tab>
              {/* <Tab className="nav-link">
                <Unlock />
                Register
              </Tab> */}
            </TabList>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            {/* <TabPanel>
              <RegisterForm />
            </TabPanel> */}
          </Tabs>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LoginTabs;
