/* eslint-disable no-unused-vars */
import { Unlock, User } from "react-feather";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Card, CardBody, Col } from "reactstrap";
import LoginForm from "./login-form";
import RegisterForm from "./registration-form";
import { useAuthContext } from "../../../helper/AuthProvider";
import { SignIn } from "./sign-in-form";

const LoginTabs = () => {
  const { Authtoken } = useAuthContext()
  return (
    <Col md="7" className="p-0 card-right">
      <Card className="tab2-card">
        <CardBody>
          <Tabs>
            <TabList className="nav nav-tabs tab-coupon">
              <Tab className="nav-link">
                <User />
                {Authtoken ? 'Login' : 'Sign In' }
              </Tab>
              {/* <Tab className="nav-link">
                <Unlock />
                Register
              </Tab> */}
            </TabList>
            <TabPanel>
              {Authtoken ? (
                <SignIn />
              ): (
                <LoginForm />
              )}
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
