/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Spinner,
} from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useCommonContext } from "../helper/CommonProvider";

const EditDeliveryBoy = () => {
  const { id } = useParams();
  const { DeliveryBoyDetail, boyDetails, DeliveryBoyUpdate } =
    useCommonContext();

  //   console.log(prouctDetails, 'product details')

  // States to store editable fields
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setmobile] = useState("");
  const [images, setImages] = useState([]);
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [states, setstates] = useState("");
  const [pinCode, setpinCode] = useState("");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [newImages, setNewImages] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id) {
      DeliveryBoyDetail(id);
    }
  }, [id]);

  console.log(boyDetails, "boyDetails");

  useEffect(() => {
    if (boyDetails) {
      // Populate input fields with existing data
      setname(boyDetails?.data?.name || "");
      setUsername(boyDetails?.data?.username || "");
      setemail(boyDetails?.data?.email || "");
      setmobile(boyDetails?.data?.mobile || "");
      setstate(boyDetails?.data?.state || "");
      setaddress1(boyDetails?.data?.address_line_1 || "");
      setaddress2(boyDetails?.data?.address_line_2 || "");
      setcity(boyDetails?.data?.city || "");
      setpinCode(boyDetails?.data?.pin_code || "");
      setImages(boyDetails?.data?.image || []);
    }
  }, [boyDetails]);

  const handleInputChange = (event) => {
    const { checked, name } = event.target;
  };

  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImages(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const removeImage = () => {
    setNewImages(null);
    setPreview(null);
  };

  // Submit handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create formData
    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("pin_code", pinCode);
    formData.append("address_line_1", address1);
    formData.append("address_line_2", address2);
    if (newImages) {
      formData.append("image", newImages);
    }

    try {
      // Call the API to update product
      await DeliveryBoyUpdate(id, formData);

      // You can also reset the form or navigate to another page here if needed
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <CommonBreadcrumb title="Edit Delivery Boy"  />
      {boyDetails.loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner color="secondary" className="my-4" />
        </div>
      ) : (
        <Container>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </FormGroup>
              </div>

              <div className="col-md-6">
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label for="email">email</Label>
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="mobile">mobile</Label>
                  <Input
                    id="mobile"
                    type="text"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label for="state">state</Label>
                  <Input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="state">state</Label>
                  <Input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                  />
                </FormGroup>
              </div>

              <div className="col-md-6">
                <FormGroup>
                  <Label for="city">city</Label>
                  <Input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="pin_code">Pin Code</Label>
                  <Input
                    id="pin_code"
                    type="text"
                    value={pinCode}
                    onChange={(e) => setpinCode(e.target.value)}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label for="pin_code">Address Line 1</Label>
                  <Input
                    id="address_line_1"
                    type="text"
                    value={address1}
                    onChange={(e) => setpinCode(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label for="pin_code">Address Line 2</Label>
                  <Input
                    id="address_line_2"
                    type="text"
                    value={address2}
                    onChange={(e) => setaddress2(e.target.value)}
                  />
                </FormGroup>
              </div>

              <div className="col-md-6">
                <FormGroup>
                  <Label
                    htmlFor="image"
                    className="col-form-label font-weight-bold"
                  >
                    Edit Profile Image:
                  </Label>
                  <Input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleSingleImageChange}
                    accept="image/*"
                    style={{ borderRadius: "5px", padding: "5px" }}
                  />
                </FormGroup>
              </div>
            </div>

            <div>
              {preview && (
                <div
                  style={{
                    position: "relative",
                    margin: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "10px",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    title="Remove Image"
                  >
                    <FaTrash style={{ color: "red", fontSize: "18px" }} />
                  </button>
                </div>
              )}
            </div>

            <Button color="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
};

export default EditDeliveryBoy;
