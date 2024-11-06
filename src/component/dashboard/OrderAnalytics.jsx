/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import {
  AccessTime,
  ShoppingBag,
  Sync,
  LocalShipping,
  ClearAll,
  Check,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import { useDashboardContext } from "../../helper/DashboardProvider";
import { Spinner } from "reactstrap";

const OrderAnalytics = () => {
  const data = [
    { icon: ClearAll },
    { icon: AccessTime },
    { icon: Sync },
    { icon: ShoppingBag },
    { icon: Sync },
    { icon: Check },
    { icon: Check },
    { icon: Check },
    { icon: Check },

  ];
  const { getAllOrderStatus, orderStatus } = useDashboardContext();

  useEffect(() => {
    getAllOrderStatus();
  }, []);

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: "10px", fontWeight: "bold" }}
      >
        Order Analytics
      </Typography>

      <Grid container spacing={2}>
        {!orderStatus.loading && orderStatus?.data?.map((item, i) => {
          const Icon = data[i]?.icon;
          return (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <Link to="#" style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#f0f3f5",
                    padding: "15px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease", // Smoother transition
                    transform: "scale(1)", // Normal scale
                    "&:hover": {
                      backgroundColor: "#e2e6ea",
                      transform: "scale(1.05)", // Scale up by 5%
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow
                    },
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Icon />
                    <Typography> {item?.title} </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      marginLeft: "15px",
                      boxShadow: "0 0 0 0.4rem #e2e8f0",
                      borderRadius: "50%",
                      width: "39px",
                      height: "39px",
                      background: "#f1f5f9",
                      color: "#000",
                      fontSize: "16px",
                      display: "flex",
                      padding: "4px 8px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item?.total}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          );
        })}
        {orderStatus.loading && (
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
      </Grid>
    </Box>
  );
};

export default OrderAnalytics;
