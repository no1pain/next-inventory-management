import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { PurchaseOverviewProps } from "./types";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";

const PurchaseOverview: React.FC = () => {
  const data: PurchaseOverviewProps = {
    purchaseCount: 82,
    cost: 13573,
    cancelCount: 5,
    returnAmount: 17432,
  };

  const items = [
    {
      icon: <ShoppingBagOutlinedIcon sx={{ color: "#3b82f6" }} />,
      label: "Purchase",
      value: data.purchaseCount,
    },
    {
      icon: <HomeOutlinedIcon sx={{ color: "#10b981" }} />,
      label: "Cost",
      value: `₹${data.cost}`,
    },
    {
      icon: <CancelOutlinedIcon sx={{ color: "#6366f1" }} />,
      label: "Cancel",
      value: data.cancelCount,
    },
    {
      icon: <AssignmentReturnOutlinedIcon sx={{ color: "#f97316" }} />,
      label: "Return",
      value: `₹${data.returnAmount}`,
    },
  ];

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "10px",
        bgcolor: "white",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.25rem",
            fontWeight: 500,
            color: "text.primary",
            mb: 3,
          }}
        >
          Purchase Overview
        </Typography>
        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Grid xs={3} key={index}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {item.icon}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 400,
                  mb: 1,
                }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  color: "text.primary",
                }}
              >
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PurchaseOverview;
