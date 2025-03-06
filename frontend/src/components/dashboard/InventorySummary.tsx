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
      icon: <Inventory2OutlinedIcon sx={{ color: "#f97316", fontSize: 32 }} />,
      label: "Quantity in Hand",
      value: data.quantityInHand,
    },
    {
      icon: (
        <LocalShippingOutlinedIcon sx={{ color: "#8b5cf6", fontSize: 32 }} />
      ),
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
          Inventory Summary
        </Typography>
        <Grid container spacing={3}>
          {items.map((item, index) => (
            <Grid xs={6} key={index} sx={{ textAlign: "center" }}>
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
                {item.value.toLocaleString()}
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

export default InventorySummary;
