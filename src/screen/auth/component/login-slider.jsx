/* eslint-disable no-unused-vars */

import Slider from "react-slick";
import { Card, Col, Media } from "reactstrap";
import companyLogo from '../../../assets/WBLDCL_LOGO.png'

const LoginSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
  };
  return (
    <Col md="5" className="p-0 card-left">
      <Card className="bg-primary">
        <div className="svg-icon">
          <Media style={{height:'100%'}} alt="" src={companyLogo} className="Img-fluid" />
        </div>
            <div>
              <div>
                <h3>Welcome to CLART</h3>
                <p>Centre for Laboratory Animal Research and Training (CLART) under West Bengal Livestock Development Corporation Ltd.</p>
              </div>
            </div>
      </Card>
    </Col>
  );
};

export default LoginSlider;
