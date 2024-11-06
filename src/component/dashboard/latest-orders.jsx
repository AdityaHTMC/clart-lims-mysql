/* eslint-disable no-unused-vars */

import { Button, Card, CardBody, Col, Spinner, Table } from "reactstrap";
import CommonCardHeader from "../common/card-header";
import { useDashboardContext } from "../../helper/DashboardProvider";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LatestOrders = () => {
  const { getDashboardOrderList, dashboardOrderList } = useDashboardContext();

  // useEffect(() => {
  //   getDashboardOrderList();
  // }, []);

  return (
    <Col xl="6 xl-100">
      <Card>
        <CommonCardHeader title="Latest Orders" />
        <CardBody>
          <div className="user-status table-responsive latest-order-table">
            <Table borderless>
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Order Total</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardOrderList.loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <Spinner color="secondary" className="my-4" />
                    </td>
                  </tr>
                ) : dashboardOrderList?.data?.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Orders found
                    </td>
                  </tr>
                ) : (
                  dashboardOrderList?.data?.slice(0, 5)?.map((order, index) => (
                    <tr key={index}>
                      <td>{order.order_id}</td>
                      <td className="digits">₹{order.final_amount}</td>
                      <td className="font-secondary">{order.user_name}</td>
                      <td className="font-danger">{order.payment_mode}</td>
                      <td className="digits">{order.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>

            <Link to="/all-orders">
              <Button color="primary">View All Orders</Button>{" "}
            </Link>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LatestOrders;
