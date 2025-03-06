import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import SalesOverview from "./SalesOverview";
import InventorySummary from "./InventorySummary";
import PurchaseOverview from "./PurchaseOverview";
import ProductSummary from "./ProductSummary";
import { Box } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {/* Left Column - 60% */}
      <Box sx={{ flex: "60%" }}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <SalesOverview />
          </Grid>
          <Grid xs={12}>
            <PurchaseOverview />
          </Grid>
        </Grid>
      </Box>

      {/* Right Column - 40% */}
      <Box sx={{ flex: "40%" }}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <InventorySummary />
          </Grid>
          <Grid xs={12}>
            <ProductSummary />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
