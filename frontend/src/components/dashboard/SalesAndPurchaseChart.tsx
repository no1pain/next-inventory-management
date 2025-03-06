import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

// Sample data
const data = [
  { month: "Jan", Purchase: 55000, Sales: 48000 },
  { month: "Feb", Purchase: 57000, Sales: 47000 },
  { month: "Mar", Purchase: 44000, Sales: 52000 },
  { month: "Apr", Purchase: 36000, Sales: 43000 },
  { month: "May", Purchase: 43000, Sales: 45000 },
  { month: "Jun", Purchase: 28000, Sales: 41000 },
  { month: "Jul", Purchase: 55000, Sales: 48000 },
  { month: "Aug", Purchase: 44000, Sales: 42000 },
  { month: "Sep", Purchase: 44000, Sales: 43000 },
  { month: "Oct", Purchase: 36000, Sales: 43000 },
];

// Calculate the maximum value for scaling
const maxValue = Math.max(
  ...data.map((item) => Math.max(item.Purchase, item.Sales))
);

export default function SalesAndPurchaseChart() {
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Sales & Purchase
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "grey.50",
              px: 2,
              py: 0.5,
              borderRadius: "6px",
            }}
          >
            <CalendarTodayOutlinedIcon
              sx={{ fontSize: 20, color: "text.secondary" }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Weekly
            </Typography>
          </Box>
        </Box>

        {/* Simple chart implementation without recharts */}
        <Box sx={{ height: 350, width: "100%", mt: 2 }}>
          <Box
            sx={{ display: "flex", height: "300px", alignItems: "flex-end" }}
          >
            {data.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  height: "100%",
                  justifyContent: "flex-end",
                  px: 0.5,
                }}
              >
                {/* Purchase bar */}
                <Box
                  sx={{
                    width: "40%",
                    height: `${(item.Purchase / maxValue) * 100}%`,
                    bgcolor: "#93c5fd",
                    borderRadius: "4px 4px 0 0",
                    mr: 0.5,
                  }}
                />

                {/* Sales bar */}
                <Box
                  sx={{
                    width: "40%",
                    height: `${(item.Sales / maxValue) * 100}%`,
                    bgcolor: "#86efac",
                    borderRadius: "4px 4px 0 0",
                    ml: 0.5,
                  }}
                />

                {/* Month label */}
                <Typography
                  variant="caption"
                  sx={{ mt: 1, fontSize: "0.7rem", color: "#6b7280" }}
                >
                  {item.month}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Legend */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: "#93c5fd",
                  mr: 1,
                  borderRadius: 1,
                }}
              />
              <Typography variant="caption" sx={{ color: "#6b7280" }}>
                Purchase
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: "#86efac",
                  mr: 1,
                  borderRadius: 1,
                }}
              />
              <Typography variant="caption" sx={{ color: "#6b7280" }}>
                Sales
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
