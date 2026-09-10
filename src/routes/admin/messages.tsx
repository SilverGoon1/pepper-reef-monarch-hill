import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/messages")({
  component: () => <Navigate to="/admin/center" search={{ tab: "messages" }} />,
});
