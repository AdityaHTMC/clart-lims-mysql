/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useCommonContext } from "../helper/CommonProvider";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CommonBreadcrumb from "../component/common/bread-crumb";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useParams } from "react-router-dom";

const EditFeatured = () => {
    const {id} = useParams()
  const { getAllProducts, allProductList,prouctDetails,getprouctDetails,editfeaturedSection } = useCommonContext();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exsitingProducts, setExitingProducts] = useState([])

  console.log(allProductList, "allProductList");


  useEffect(() => {
    if (prouctDetails) {
      // Populate input fields with existing data
      setTitle(prouctDetails?.data?.title || "");
      setDescription(prouctDetails?.data?.description || "");
      setExitingProducts(prouctDetails?.data?.products || []);
    }
  }, [prouctDetails]);

  useEffect(() => {
    getAllProducts();
    getprouctDetails(id)
  }, [id]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Combine selectedProducts and exsitingProducts
    const allSelectedProductIds = [
      ...exsitingProducts.map(product => product._id),
      ...selectedProducts.map(product => product._id)
    ];

    const dataToSend = {
        id: id,
        title : title,
        description : description,
        products: allSelectedProductIds,
      };

    editfeaturedSection(dataToSend)

    console.log("All Selected Product IDs: ", allSelectedProductIds);
  };

    // Handle removal of an existing product
    const handleRemoveExistingProduct = (productId) => {
        setExitingProducts(exsitingProducts.filter(product => product._id !== productId));
      };

  return (
    <div>
      <CommonBreadcrumb title="Edit Section" />
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <form onSubmit={handleEditSubmit}>
                  <FormGroup>
                    <Label for="title">Featured Title </Label>
                    <Input
                      id="title"
                      type="text"
                      value={title} // Pre-populate with existing itemName
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormGroup>

                  {/* Description */}
                  <FormGroup>
                    <Label for="description">Featured Description</Label>
                    <Input
                      id="description"
                      type="textarea"
                      value={description} // Pre-populate with existing description
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormGroup>


                      {/* Display Existing Products */}
                      <FormGroup>
                    <Label>Existing Products</Label>
                    <div>
                      {exsitingProducts.map((product) => (
                        <Chip
                          key={product._id}
                          label={product.itemName}
                          onDelete={() => handleRemoveExistingProduct(product._id)}
                          style={{ margin: '5px' }}
                        />
                      ))}
                    </div>
                  </FormGroup>
                  
                  <FormGroup>
                  <Label for="New">Add New Products</Label>
                  <Autocomplete
                    sx={{ m: 1, width: 500 }}
                    multiple
                    options={allProductList.data || []}
                    getOptionLabel={(option) => option?.itemName || ""}
                    value={selectedProducts}
                    onChange={(event, newValue) =>
                      setSelectedProducts(newValue)
                    }
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select Products"
                        placeholder="Choose multiple products"
                      />
                    )}
                  />
                  </FormGroup>
                  <Button type="submit" color="primary">
                    Edit Section
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditFeatured;
