/* eslint-disable no-unused-vars */
import CountUp from "react-countup";
import { Card, CardBody, Col, Media } from "reactstrap";
import { TopDashboardCardsData } from "../../Data/Dashboard";
import { useDashboardContext } from "../../helper/DashboardProvider";
import { useEffect } from "react";
import { Box, MessageSquare, Navigation, Users } from "react-feather";
const TopDashboardCards = () => {
 
  const { getDashboardCount,orderCount } = useDashboardContext();

  useEffect(() => {
    getDashboardCount();
  }, []);

  console.log(orderCount,'orderCount')

  return (
    <>
    
        <Col  xl="3 xl-50" md="6">
          <Card className=" o-hidden widget-cards">
            <CardBody className="bg-warning">
              <Media className="static-top-widget row">
                <div className="icons-widgets col-4">
                  <div className="align-self-center text-center">
                  <Navigation className="font-warning" />
                  </div>
                </div>
                <Media body className="col-8">
                  <span className="m-0"> Total Unit</span>
                  <h3 className="mb-0">
                   
                    <CountUp className="counter" end={orderCount?.data?.unit_count}  />
                    <small> </small>
                  </h3>
                </Media>
              </Media>
            </CardBody>
          </Card>
        </Col>

        <Col  xl="3 xl-50" md="6">
          <Card className=" o-hidden widget-cards">
            <CardBody className="bg-secondary">
              <Media className="static-top-widget row">
                <div className="icons-widgets col-4">
                  <div className="align-self-center text-center">
                  <Box className="font-secondary" />
                  </div>
                </div>
                <Media body className="col-8">
                  <span className="m-0">Total Labs</span>
                  <h3 className="mb-0">
                   
                    <CountUp className="counter" end={orderCount?.data?.lab_count}  />
                    <small> </small>
                  </h3>
                </Media>
              </Media>
            </CardBody>
          </Card>
        </Col>


        <Col  xl="3 xl-50" md="6">
          <Card className=" o-hidden widget-cards">
            <CardBody className="bg-primary">
              <Media className="static-top-widget row">
                <div className="icons-widgets col-4">
                  <div className="align-self-center text-center">
                  <Box className="font-secondary" />
                  </div>
                </div>
                <Media body className="col-8">
                  <span className="m-0">Total Collection Center</span>
                  <h3 className="mb-0">
                   
                    <CountUp className="counter" end={orderCount?.data?.collection_center_count}  />
                    <small> </small>
                  </h3>
                </Media>
              </Media>
            </CardBody>
          </Card>
        </Col>



        <Col  xl="3 xl-50" md="6">
          <Card className=" o-hidden widget-cards">
            <CardBody className="bg-danger">
              <Media className="static-top-widget row">
                <div className="icons-widgets col-4">
                  <div className="align-self-center text-center">
                  <Box className="font-secondary" />
                  </div>
                </div>
                <Media body className="col-8">
                  <span className="m-0">Total Phlebotomist</span>
                  <h3 className="mb-0">
                   
                    <CountUp className="counter" end={orderCount?.data?.phlebotomist_count}  />
                    <small> </small>
                  </h3>
                </Media>
              </Media>
            </CardBody>
          </Card>
        </Col>
        
   
    </>
  );
};

export default TopDashboardCards;
