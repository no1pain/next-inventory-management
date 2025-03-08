import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ProductSummaryProps } from "./types";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

const ProductSummary: React.FC = () => {
  const data: ProductSummaryProps = {
    supplierCount: 31,
    categoryCount: 21,
  };

  const items = [
    {
      icon: <PeopleOutlineIcon sx={{ color: "#3b82f6", fontSize: 32 }} />,
      label: "Number of Suppliers",
      value: data.supplierCount,
    },
    {
      icon: <CategoryOutlinedIcon sx={{ color: "#8b5cf6", fontSize: 32 }} />,
      label: "Number of Categories",
      value: data.categoryCount,
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
          Product Summary
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

export default ProductSummary;
