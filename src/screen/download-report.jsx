import { Badge, Button, Card, CardBody, Col, Container, Label, Row, Table } from "reactstrap";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { FaFileDownload } from "react-icons/fa";
import { useOrderContext } from "../helper/OrderProvider";
import CommonBreadcrumb from "../component/common/bread-crumb";

export const DownloadReport = () => {
    const { id } = useParams()
    const { getOrderTestList, orderDetail } = useOrderContext()

    useEffect(() => {
        if (id) {
            getOrderTestList(id)
        }
    }, [id])

    return (
        <>
            <CommonBreadcrumb title="Report Download" parent="All orders" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <div className="mb-3">
                                    <div className="d-flex gap-3 align-items-center mb-2">
                                        <p className="mb-0" style={{ fontWeight: 600 }}>#{orderDetail?.data?.order_id}</p>
                                        <span>{orderDetail?.data?.pet_details?.species}, {orderDetail?.data?.pet_details?.breed} ({orderDetail?.data?.pet_details?.sex})</span>
                                    </div>
                                    <Label style={{ fontWeight: 600 }}>Customer</Label>
                                    <div className="d-flex align-items-center gap-3">
                                        <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={orderDetail?.data?.customer_image || `/assets/images/profile.png`} alt="header-user" />
                                        <div>
                                            <h5 className="mb-0">{orderDetail?.data?.customer_name}</h5>
                                            <p>{orderDetail?.data?.customer_phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <Table responsive borderless>
                                    <thead>
                                        <tr>
                                            <th>Test Name</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetail.data?.tests?.map((test, i) => (
                                            <tr key={i}>
                                                <td>{test.test_name}</td>
                                                <td><Badge>{test?.report_status}</Badge></td>
                                                <td>
                                                    {test?.report_status === 'Completed' && (
                                                        <div className="circelBtnBx">
                                                            <Button
                                                                className="btn"
                                                                color="link"
                                                            >
                                                                <a href={test.report} target="_blank" download>
                                                                    <FaFileDownload />
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}

                                        {orderDetail.data?.package_details?.map((pk, i) => (
                                            <Fragment key={i}>
                                                <tr>
                                                    <th>{pk?.package_name} - {pk?.price} :</th>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                {pk?.tests?.map((test, j) => (
                                                    <tr key={i}>
                                                        <td>{test.test_name}</td>
                                                        <td><Badge>{test?.report_status}</Badge></td>
                                                        <td>
                                                            {test?.report_status === 'Completed' && (
                                                                <div className="circelBtnBx">
                                                                    <Button
                                                                        className="btn"
                                                                        color="link"
                                                                    >
                                                                        <a href={test.report} target="_blank" download>
                                                                            <FaFileDownload />
                                                                        </a>
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </Fragment>

                                        ))}
                                    </tbody>
                                </Table>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}