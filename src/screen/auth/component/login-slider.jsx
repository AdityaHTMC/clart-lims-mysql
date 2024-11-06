/* eslint-disable no-unused-vars */

import Slider from "react-slick";
import { Card, Col, Media } from "reactstrap";
import companyLogo from '../../../assets/small-logo.jpg'

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
          <Media height={78} width={150} alt="" src={companyLogo} className="Img-fluid" />
        </div>
        <Slider className="single-item" {...settings}>
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div>
                <h3>Welcome to CLART LIMS</h3>
                <p>Centre for Laboratory Animal Research and Training (CLART) under West Bengal Livestock Development Corporation Ltd.</p>
              </div>
            </div>
          ))}
        </Slider>
      </Card>
    </Col>
  );
};

export default LoginSlider;
