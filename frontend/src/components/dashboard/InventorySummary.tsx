import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { InventorySummaryProps } from "./types";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const InventorySummary: React.FC = () => {
  const data: InventorySummaryProps = {
    quantityInHand: 868,
    toBeReceived: 200,
  };

  const items = [
    {
      icon: <Inventory2OutlinedIcon sx={{ color: "#f97316" }} />,
      label: "Quantity in Hand",
      value: data.quantityInHand,
    },
    {
      icon: <LocalShippingOutlinedIcon sx={{ color: "#8b5cf6" }} />,
      label: "To be received",
      value: data.toBeReceived,
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
          Inventory Summary
        </Typography>
        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Grid xs={6} key={index}>
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
                {item.value.toLocaleString()}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InventorySummary;
