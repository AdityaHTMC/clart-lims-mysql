/* eslint-disable no-unused-vars */
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
  Spinner,
  Table,
} from "reactstrap";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useAuthContext } from "../helper/AuthProvider";

const PermissionManagement = () => {
  const {
    getPermissionList,
    permissionList,
    CreatePermission,
    getMenuList,
    allMenuList,
  } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [permissionDetail, setPermissionDetail] = useState(null);
  const [title, setTitle] = useState("");
  const [menuId, setMenuId] = useState("");
  const [actions, setActions] = useState([]);
  const availableActions = ["Add", "Edit", "List", "View"];

  useEffect(() => {
    setTitle(permissionDetail?.title || "");
  }, [permissionDetail]);

  useEffect(() => {
    getMenuList();
  }, []);

  const handleActionChange = (action) => {
    setActions(
      (prev) =>
        prev.includes(action)
          ? prev.filter((a) => a !== action) // Remove action if unchecked
          : [...prev, action] // Add action if checked
    );
  };

  useEffect(() => {
    if (permissionList?.data.length === 0 && permissionList.loading === true) {
      getPermissionList();
    }
  }, [permissionList.data]);

  console.log(permissionList, "permissionList");

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      permission: title,
      menuId,
      actions,
    };
    CreatePermission(dataToSend)
    setIsOpen(false);
  };

  return (
    <>
      <CommonBreadcrumb title="Permission Management" parent="Home" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Unit Management" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button
                    color="primary"
                    onClick={() => {
                      setIsOpen(true);
                      setIsEditing(false);
                      setPermissionDetail(null);
                    }}
                  >
                    Add Permission
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div className="px-sm-3">
                  <Table responsive hover borderless align="center">
                    <thead className="border-bottom border-top py-4">
                      <tr>
                        <th>Title</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!permissionList.loading &&
                        permissionList?.data?.map((item, i) => (
                          <tr key={i}>
                            <td>
                              <Badge>{item?.permission}</Badge>
                            </td>
                            <td className="d-flex gap-2 align-items-center">
                              <Badge
                                color="danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setIsEditing(true);
                                  setPermissionDetail(item);
                                  setIsOpen(true);
                                }}
                              >
                                <FaEdit style={{ fontSize: 14 }} />
                              </Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  {!permissionList.loading &&
                    permissionList?.data?.length === 0 && (
                      <p
                        className="text-muted text-center my-4"
                        style={{ fontSize: 14 }}
                      >
                        No Data found
                      </p>
                    )}
                  {permissionList.loading && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Spinner color="secondary" className="my-4" />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        isOpen={isOpen}
        toggle={setIsOpen}
        style={{ maxWidth: "600px", minHeight: "600px" }}
      >
        <ModalHeader toggle={() => setIsOpen(false)}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            {isEditing ? `Edit ${permissionDetail?.ref}` : "Add New Permission"}
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="recipient-name" className="col-form-label">
                Permission Name :
              </Label>
              <Input
                type="text"
                required
                min={3}
                placeholder="Enter permission name"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                disabled={isProcessing}
              />
            </FormGroup>

            {/* Dropdown for Menu List */}
            <FormGroup>
              <Label htmlFor="menuId">Select Menu :</Label>
              <Input
                type="select"
                onChange={(e) => setMenuId(e.target.value)}
                value={menuId}
                disabled={isProcessing}
              >
                <option value="">-- Select Menu --</option>
                {allMenuList?.data?.map((menu) => (
                  <option key={menu._id} value={menu._id}>
                    {menu.title}
                  </option>
                ))}
              </Input>
            </FormGroup>

            {/* Checkboxes for Actions */}
            <FormGroup>
          <Label>Actions:</Label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', paddingTop: '10px' }}>
            {availableActions.map((action) => (
              <div key={action} style={{ display: 'flex', alignItems: 'center', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '5px', width: '120px', justifyContent: 'center' }}>
                <Input
                  type="checkbox"
                  id={action}
                  checked={actions.includes(action)}
                  onChange={() => handleActionChange(action)}
                  disabled={isProcessing}
                  style={{ marginRight: '8px' }}
                />
                <Label htmlFor={action} style={{ marginBottom: '0' }}>
                  {action} {/* Capitalize */}
                </Label>
              </div>
            ))}
          </div>
        </FormGroup>

            <ModalFooter className="px-0">
              <Button
                size="sm"
                type="submit"
                color="primary"
                disabled={isProcessing}
              >
                Save
              </Button>
              <Button
                size="sm"
                type="button"
                color="secondary"
                onClick={() => setIsOpen(false)}
                disabled={isProcessing}
              >
                Close
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PermissionManagement;
