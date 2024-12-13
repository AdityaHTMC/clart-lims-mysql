/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
    Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconButton, Pagination, Stack, TextField } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";

const ReportTemplate = () => {
  const navigate = useNavigate();

  const { getReportTemplateList, reportTemplateList } = useMasterContext();

  useEffect(() => {
    getReportTemplateList();
  }, []);

  const handleDownload = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <CommonBreadcrumb title="Report Template" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Row>
                      {reportTemplateList.data?.map((template) => (
                        <Col
                          lg="4"
                          md="6"
                          sm="12"
                          key={template.id}
                          className="mb-4"
                        >
                          <Card className="shadow border-0">
                            <CardImg
                              top
                              src={template.preview}
                              alt={template.title}
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                            <CardBody>
                              <CardTitle tag="h5" className="text-primary">
                                {template.title}
                              </CardTitle>
                              <CardText>
                                <strong>Template ID:</strong>{" "}
                                {template.template_id}
                              </CardText>
                              <CardText>
                                <strong>Created At:</strong>{" "}
                                {new Date(
                                  template.created_at
                                ).toLocaleDateString()}
                              </CardText>
                              <Button
                                color="primary"
                                onClick={() => handleDownload(template.preview, template.title)}
                              >
                                Download Template
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReportTemplate;
