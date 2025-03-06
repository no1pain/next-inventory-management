import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { SalesOverviewProps } from "./types";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const SalesOverview: React.FC = () => {
  const data: SalesOverviewProps = {
    sales: 832,
    revenue: 18300,
    profit: 868,
    cost: 17432,
  };

  const items = [
    {
      icon: <MonetizationOnOutlinedIcon sx={{ color: "#6366f1" }} />,
      label: "Sales",
      value: data.sales,
    },
    {
      icon: <TrendingUpIcon sx={{ color: "#8b5cf6" }} />,
      label: "Revenue",
      value: data.revenue,
    },
    {
      icon: <AccountBalanceWalletOutlinedIcon sx={{ color: "#f59e0b" }} />,
      label: "Profit",
      value: data.profit,
    },
    {
      icon: <HomeOutlinedIcon sx={{ color: "#10b981" }} />,
      label: "Cost",
      value: data.cost,
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
          Sales Overview
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
                ₹ {item.value.toLocaleString()}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SalesOverview;
