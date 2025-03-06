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
      icon: <ShoppingBagOutlinedIcon sx={{ color: "#3b82f6", fontSize: 32 }} />,
      label: "Purchase",
      value: data.purchaseCount,
    },
    {
      icon: <HomeOutlinedIcon sx={{ color: "#10b981", fontSize: 32 }} />,
      label: "Cost",
      value: `₹${data.cost}`,
    },
    {
      icon: <CancelOutlinedIcon sx={{ color: "#6366f1", fontSize: 32 }} />,
      label: "Cancel",
      value: data.cancelCount,
    },
    {
      icon: (
        <AssignmentReturnOutlinedIcon sx={{ color: "#f97316", fontSize: 32 }} />
      ),
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
      <CardContent sx={{ height: "100%", p: 2.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.1rem",
            fontWeight: 500,
            color: "text.primary",
            mb: 2.5,
            ml: 5,
          }}
        >
          Purchase Overview
        </Typography>
        <Grid container spacing={3}>
          {items.map((item, index) => (
            <Grid xs={3} key={index} sx={{ textAlign: "center" }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 1.5 }}>
                {item.icon}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.25rem",
                  color: "text.primary",
                  mb: 0.5,
                  textAlign: "center",
                }}
              >
                {item.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                {item.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PurchaseOverview;
