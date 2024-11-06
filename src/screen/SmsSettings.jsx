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
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
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
import { FaSave, FaTimes } from "react-icons/fa";
import { useCommonContext } from "../helper/CommonProvider";

const SmsSettings = () => {
  const navigate = useNavigate();
  const { getSmsSetting, smsData, SmsUpdateSetting } = useCommonContext();

  const [editStates, setEditStates] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getSmsSetting();
  }, []);

  useEffect(() => {
    if (smsData && smsData.data && smsData.data.length > 0) {
      const initialFormData = {};
      const initialEditStates = {};
      smsData.data.forEach((item) => {
        initialFormData[item._id] = {
          auth_key: item.auth_key,
          sender: item.sender,
          provider_name: item.provider_name,
        };
        initialEditStates[item._id] = false; // Initially, no card is in edit mode
      });
      setFormData(initialFormData);
      setEditStates(initialEditStates);
    }
  }, [smsData]);

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [name]: value,
      },
    }));
  };

  const handleEditToggle = (id) => {
    setEditStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  const handleUpdate = (id) => {
    SmsUpdateSetting({ id: id, ...formData[id] })
      .then(() => {
        handleEditToggle(id); // Exit editing mode for this card
        getSmsSetting(); // Refresh the settings after update
      })
      .catch((error) => {
        console.error("Error updating SMS settings:", error);
      });
  };

  const handleCancelEdit = (id) => {
    setEditStates((prevStates) => ({
      ...prevStates,
      [id]: false,
    }));
    // Reset form data to the original values
    const originalData = smsData.data.find((item) => item._id === id);
    setFormData((prevData) => ({
      ...prevData,
      [id]: {
        auth_key: originalData.auth_key,
        sender: originalData.sender,
        provider_name: originalData.provider_name,
      },
    }));
  };

  return (
    <>
      <CommonBreadcrumb title="SMS Setting" parent="Physical" />
      <Container fluid>
        <Row>
          {smsData && smsData.data && smsData.data.length > 0 ? (
            smsData.data.map((item) => (
              <Col sm="12" md="6" lg="6" key={item._id} className="mb-4">
                <Card>
                  <CardBody>
                    <div className="mb-3">
                      <label htmlFor={`auth_key_${item._id}`} className="form-label">Auth Key:</label>
                      <Input
                        type="text"
                        id={`auth_key_${item._id}`}
                        name="auth_key"
                        value={formData[item._id]?.auth_key || ""}
                        onChange={(e) => handleInputChange(e, item._id)}
                        readOnly={!editStates[item._id]}
                        className={`form-control ${editStates[item._id] ? 'border-primary' : ''}`}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`sender_${item._id}`} className="form-label">Sender:</label>
                      <Input
                        type="text"
                        id={`sender_${item._id}`}
                        name="sender"
                        value={formData[item._id]?.sender || ""}
                        onChange={(e) => handleInputChange(e, item._id)}
                        readOnly={!editStates[item._id]}
                        className={`form-control ${editStates[item._id] ? 'border-primary' : ''}`}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`provider_name_${item._id}`} className="form-label">Provider Name:</label>
                      <Input
                        type="text"
                        id={`provider_name_${item._id}`}
                        name="provider_name"
                        value={formData[item._id]?.provider_name || ""}
                        onChange={(e) => handleInputChange(e, item._id)}
                        readOnly={!editStates[item._id]}
                        className={`form-control ${editStates[item._id] ? 'border-primary' : ''}`}
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      {!editStates[item._id] ? (
                        <Button
                          color="primary"
                          onClick={() => handleEditToggle(item._id)}
                        >
                          <FaEdit /> Edit
                        </Button>
                      ) : (
                        <>
                          <Button color="danger" onClick={() => handleCancelEdit(item._id)}>
                            Cancel
                          </Button>
                          <Button color="success" onClick={() => handleUpdate(item._id)}>
                            Update
                          </Button>
                        </>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p>No SMS data available.</p>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SmsSettings;
