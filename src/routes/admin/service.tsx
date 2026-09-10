import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/service")({
  component: () => <Navigate to="/admin/center" search={{ tab: "messages" }} />,
});
