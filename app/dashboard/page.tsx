import DashboardLoginClient from "./DashboardLoginClient";

export const metadata = {
  title: "Business Dashboard | SouthportGuide",
  description: "Manage your business listing on SouthportGuide.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardLoginClient />;
}
