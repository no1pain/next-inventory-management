import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { SalesOverviewProps } from "./types";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

// Format number to K, M format (e.g., 10K, 1.5M)
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
};

const SalesOverview: React.FC = () => {
  const data: SalesOverviewProps = {
    sales: 832,
    revenue: 18300,
    profit: 868,
    cost: 17432,
  };

  const items = [
    {
      icon: (
        <MonetizationOnOutlinedIcon sx={{ color: "#6366f1", fontSize: 32 }} />
      ),
      label: "Sales",
      value: data.sales,
    },
    {
      icon: <TrendingUpIcon sx={{ color: "#8b5cf6", fontSize: 32 }} />,
      label: "Revenue",
      value: data.revenue,
    },
    {
      icon: (
        <AccountBalanceWalletOutlinedIcon
          sx={{ color: "#f59e0b", fontSize: 32 }}
        />
      ),
      label: "Profit",
      value: data.profit,
    },
    {
      icon: <HomeOutlinedIcon sx={{ color: "#10b981", fontSize: 32 }} />,
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
          Sales Overview
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
                ₹ {formatNumber(item.value)}
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

export default SalesOverview;
