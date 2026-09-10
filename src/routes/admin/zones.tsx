import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/zones")({
  component: () => <Navigate to="/admin/menu" search={{ tab: "delivery" }} />,
});
