import { createFileRoute } from "@tanstack/react-router";
import { AdminFinancialsPage } from "@/routes/admin/settings";

export const Route = createFileRoute("/admin/financials")({
  component: AdminFinancialsPage,
});
