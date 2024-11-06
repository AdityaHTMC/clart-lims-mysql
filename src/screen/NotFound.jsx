/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    ArcElement,
    BarController,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
  } from "chart.js";
  import CommonBreadcrumb from "../component/common/bread-crumb";
  import {
    Badge,
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
  } from "reactstrap";
  import { useEffect, useState } from "react";
  import { useCategoryContext } from "../helper/CategoryProvider";
  import { useLocation, useNavigate } from "react-router-dom";
  import { AiOutlineDelete } from "react-icons/ai";
  import { FaEdit, FaTrashAlt } from "react-icons/fa";
  import { HexColorPicker } from "react-colorful";
  // Register the necessary Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    BarElement,
    ArcElement,
    Filler,
    RadialLinearScale
  );
  
  import { Spinner } from "reactstrap";
  import { useCommonContext } from "../helper/CommonProvider";

  
  const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/').filter(Boolean); // ["featured-section"]
    const featuredSection = path[path.length - 1]; // "featured-section"
    
    console.log(featuredSection); // Outputs: "featured-section"
  
    const { getFeturedSection,sectionList} = useCommonContext();
  

  
  
    return (
      <>
        <CommonBreadcrumb title={featuredSection} parent="Physical" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                    {/* <Button color="primary"onClick={onOpenModal}>
                      Add Vendor
                    </Button> */}
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <div className="promo-code-list">
                      {featuredSection} Page Coming Soon
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
  
  export default NotFound;
  