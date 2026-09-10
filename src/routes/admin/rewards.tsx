import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/rewards")({
  component: () => <Navigate to="/admin/center" search={{ tab: "rewards" }} />,
});
