import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
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
      icon: <PeopleOutlineIcon sx={{ color: "#3b82f6" }} />,
      label: "Number of Suppliers",
      value: data.supplierCount,
    },
    {
      icon: <CategoryOutlinedIcon sx={{ color: "#8b5cf6" }} />,
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
          Product Summary
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
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductSummary;
