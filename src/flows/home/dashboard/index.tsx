import { lazy, memo, Suspense } from "react";
import DashboardShimmer from "./components/DashboardShimmer";

const DashboardContent = lazy(() => import("./components/DashboardContent"));

function Dashboard() {
  return (
    <Suspense fallback={<DashboardShimmer />}>
      <DashboardContent key="dashboard" />
    </Suspense>
  );
}

export default memo(Dashboard);
