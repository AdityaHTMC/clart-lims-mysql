/* eslint-disable no-unused-vars */
// TopProducts.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Rating,
  IconButton,
} from "@mui/material";
import Button from '@mui/material/Button';
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid2";
import GradeIcon from '@mui/icons-material/Grade';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
const products = {
  topRatingProducts: [
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 11, rating: 5.0 },
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 3, rating: 5.0 },
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 24, rating: 5.0 },
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 56, rating: 5.0 },
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 11, rating: 5.0 },
 
  ],
  mostFavoriteProducts: [
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 10, rating: 4.0, favorites: 4 },
    {
      name: "JAISAL HERITAGE BASMATI RICE – REGULAR",
      sold: 66,
      rating: 4.3,
      favorites: 3,
    },
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 7, rating: 2.3, favorites: 3 },
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 8, rating: 5.0, favorites: 3 },
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 6, rating: 2.4, favorites: 2 },
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 6, rating: 5.0, favorites: 2 },
    { name: "JAISAL HERITAGE BASMATI RICE – REGULAR", sold: 13, rating: 1.5, favorites: 2 },
  ],
};

const TopProducts = () => {
  return (
    <Box style={{ padding: "20px" }}>
    <Grid container justifyContent="center" spacing={2}>
      {/* Top Rating Products */}
      <Grid item xs={12} md={6} style={{ display: "flex", justifyContent: "center"  }}>
        <Card
          style={{
            width: "100%", // Ensures the card takes the full width of the Grid item
            maxWidth: "470px", // Limit the maximum width for consistent look
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Box style={{ display: "flex", alignItems: "center", gap: "8px" , marginBottom: "10px", }}>
            <AddShoppingCartOutlinedIcon/>
            <Typography
              variant="h6"
              style={{
          
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Top Selling Products
            </Typography>
            </Box>
            {products.topRatingProducts.map((product, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 5px",
                  border: "1px solid #eee",
                  borderRadius: "5px",
                  gap: "10px",
                  transition: "0.3s",
                  marginBottom: "7px",
                }}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#e0e0e0",
                    }}
                  />
                  <Box>
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Sold: {product.sold}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <GradeIcon style={{ color: "#f59f0a", fontSize: "18px" }} />
                    <span className="mt-1"> {product.rating}</span>
                  </Button>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Most Favorite Products */}
      <Grid item xs={12} md={6} style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: "100%", // Ensures the card takes the full width of the Grid item
            maxWidth: "550px", // Limit the maximum width for consistent look
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <CardContent>
          <Box style={{ display: "flex", alignItems: "center", gap: "8px" , marginBottom: "10px", }}>
            <AutoAwesomeIcon/>
            <Typography
              variant="h6"
              style={{
          
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
               Most Favorite Products
            </Typography>
            </Box>
            {products.mostFavoriteProducts.map((product, index) => (
              <Box
                key={index}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 9px",
                    border: "1px solid #eee",
                    borderRadius: "5px",
                    gap: "10px",
                    transition: "0.3s",
                    marginBottom: "7px",
                }}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#e0e0e0",
                    }}
                  />
                  <Box>
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Sold: {product.sold}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <IconButton aria-label="favorites">
                    <FavoriteIcon color="error" />
                    <Typography variant="body2" style={{ marginLeft: "5px" }}>
                      {product.favorites}
                    </Typography>
                  </IconButton>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
  );
};

export default TopProducts;
