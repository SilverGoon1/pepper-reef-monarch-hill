import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/customers")({
  component: () => <Navigate to="/admin/center" search={{ tab: "customers" }} />,
});
