import { createFileRoute } from "@tanstack/react-router";
import { PATCHES } from "@/data/patches";

export const Route = createFileRoute("/admin/patches")({ component: AdminPatches });

function AdminPatches() {
  return (
    <div className="patches-page">
      <header className="page-card">
        <p className="shop-brand-kicker">Admin</p>
        <h1>Patches</h1>
        <p className="ed-sub">What landed in the shop, newest first. This is the running log of features we added.</p>
      </header>
      <ol className="patch-list">
        {PATCHES.map((patch) => (
          <li key={patch.id} className="page-card patch-card">
            <p className="shop-brand-kicker">{patch.date}</p>
            <h2>{patch.title}</h2>
            <ul>
              {patch.added.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
