/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useCategoryContext } from "../helper/CategoryProvider";
import { useEffect, useState } from "react";
import { FaTrashAlt } from 'react-icons/fa';
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
  } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";

const ProductEdit = () => {
  const { id } = useParams();
  const { getproductDetails,prouctDetails,editproductDetails } = useCategoryContext()

//   console.log(prouctDetails, 'product details')

 // States to store editable fields
 const [itemName, setitemName] = useState("");
 const [description, setDescription] = useState("");
 const [price, setPrice] = useState(0);
 const [stock, setStock] = useState(0);
 const [images, setImages] = useState([]);
 const [markSell , setMarkSell] = useState(false);
 const [newImages, setNewImages] = useState([]); // New images array for upload
 const [newImagePreviews, setNewImagePreviews] = useState([]); // For previewing new images

 useEffect(() => {
   if (id) {
     getproductDetails(id);
   }
 }, [id]);

 useEffect(() => {
   if (prouctDetails) {
     // Populate input fields with existing data
     setitemName(prouctDetails.itemName || "");
     setDescription(prouctDetails.description || "");
     setPrice(prouctDetails.price || 0);
     setStock(prouctDetails.stock || 0);
     setMarkSell(prouctDetails.mark_as_sell);
     setImages(prouctDetails.images || []);
   }
 }, [prouctDetails]);

 const handleInputChange = (event) => {
  const { checked, name } = event.target;
  if (name === "mark_as_sell") {
    setMarkSell(checked);
  }
};

 // Handle image removal for existing images
 const handleRemoveImage = (index) => {
   const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
   setImages(updatedImages);
 };

 // Handle image removal for new images
 const handleRemoveNewImage = (index) => {
   const updatedNewImages = newImages.filter((_, imgIndex) => imgIndex !== index);
   const updatedPreviews = newImagePreviews.filter((_, imgIndex) => imgIndex !== index);
   setNewImages(updatedNewImages);
   setNewImagePreviews(updatedPreviews);
 };

 // Handle new image upload with preview
 const handleNewImageUpload = (e) => {
   const selectedFiles = Array.from(e.target.files);
   const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
   setNewImages([...newImages, ...selectedFiles]);
   setNewImagePreviews([...newImagePreviews, ...previewUrls]);
 };

 // Submit handler for form submission
 const handleSubmit = async (e) => {
    e.preventDefault();

    // Create formData
    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("mark_as_sell", markSell);
    // Add new image files
    newImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      // Call the API to update product
      await editproductDetails(id, formData);

      // You can also reset the form or navigate to another page here if needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    getproductDetails(id);
  }, [id]);

  return (
    <>
      <CommonBreadcrumb itemName="Edit Product" parent="Physical" />
      <Container>
        <Form onSubmit={handleSubmit}>
          {/* itemName */}
          <FormGroup>
            <Label for="itemName">Product itemName</Label>
            <Input
              id="itemName"
              type="text"
              value={itemName} // Pre-populate with existing itemName
              onChange={(e) => setitemName(e.target.value)}
            />
          </FormGroup>

          {/* Description */}
          <FormGroup>
            <Label for="description">Product Description</Label>
            <Input
              id="description"
              type="textarea"
              value={description} // Pre-populate with existing description
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>

          {/* Price */}
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price} // Pre-populate with existing price
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>

          {/* Stock */}
          <FormGroup>
            <Label for="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock} // Pre-populate with existing stock
              onChange={(e) => setStock(e.target.value)}
            />
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="mark_as_sell"
                checked={markSell}
                onChange={handleInputChange}
              />
              Mark As Sell
            </Label>
          </FormGroup>

          {/* Existing Images */}
          <FormGroup>
            <Label>Existing Images</Label>
            <Row>
              {images.map((image, index) => (
                <Col key={index} sm="2">
                  <div
                    className="image-wrapper"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={image}
                      alt={`Product Image ${index}`}
                      style={{
                        width: "100px",
                        height: "auto",
                        marginBottom: "10px",
                      }} // Adjust size here
                    />
                    <FaTrashAlt
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: "absolute",
                        top: "90%",
                        right: "65%",
                        cursor: "pointer",
                        color: "red",
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </FormGroup>

          {/* New Images with Preview */}
          <FormGroup>
            <Label for="newImages">Add New Images</Label>
            <Input
              id="newImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImageUpload}
            />
            <FormText color="muted">You can upload multiple images.</FormText>
          </FormGroup>

          {/* New Images Preview */}
          {newImagePreviews.length > 0 && (
            <FormGroup>
              <Label>New Image Previews</Label>
              <Row>
                {newImagePreviews.map((preview, index) => (
                  <Col key={index} sm="2">
                    <div
                      className="image-wrapper"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={preview}
                        alt={`New Image ${index}`}
                        style={{
                          width: "100px",
                          height: "auto",
                          marginBottom: "10px",
                        }}
                      />
                      <FaTrashAlt
                        onClick={() => handleRemoveNewImage(index)}
                        style={{
                          position: "absolute",
                          top: "90%",
                          right: "65%",
                          cursor: "pointer",
                          color: "red",
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </FormGroup>
          )}

          <Button color="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ProductEdit;
