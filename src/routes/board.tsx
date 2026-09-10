import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { CategoryJump, MenuBoard, type PaperSize } from "@/components/menu-board";
import { SessionGate } from "@/components/guards";
import { useMenuStore } from "@/lib/menu-store";
import { getStorefront } from "@/lib/shop-server";

export const Route = createFileRoute("/board")({ component: BoardPage });

function BoardPage() {
  return (
    <SessionGate needAdmin>
      {() => <BoardInner />}
    </SessionGate>
  );
}

function BoardInner() {
  const [paper, setPaper] = useState<PaperSize>("tabloid");
  const [showDesc, setShowDesc] = useState(false);
  const [showMark, setShowMark] = useState(true);

  useEffect(() => {
    void useMenuStore.persist.rehydrate();
    void getStorefront().then((data) => {
      setShowMark(data.settings.showMark);
      useMenuStore.getState().replaceAll({
        restaurant: data.restaurant,
        footer: data.footer,
        categories: data.categories.map((c) => ({
          ...c,
          items: c.items.map((it, i) => ({
            ...it,
            id: it.id ?? `${c.id}-${i}`,
          })),
        })),
      });
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.paper = paper;
    return () => {
      delete document.documentElement.dataset.paper;
    };
  }, [paper]);

  return (
    <div className="studio-shell">
      <header className="studio-toolbar no-print">
        <div className="toolbar-title">South End Pizza III · Wall Menu</div>
        <div className="toolbar-actions">
          <Link to="/" className="btn-ghost">
            Customer menu
          </Link>
          <button type="button" className="btn-print" onClick={() => window.print()}>
            <Printer size={16} strokeWidth={2.2} />
            Print / Save PDF
          </button>
        </div>
        <div className="toolbar-row">
          <div className="seg" role="group" aria-label="Paper size">
            {(
              [
                ["letter", "Letter"],
                ["tabloid", "Tabloid 11×17"],
                ["poster", "Poster 18×24"],
              ] as const
            ).map(([id, label]) => (
              <button key={id} type="button" data-on={paper === id} onClick={() => setPaper(id)}>
                {label}
              </button>
            ))}
          </div>
          <div className="seg" role="group" aria-label="Descriptions">
            <button type="button" data-on={showDesc} onClick={() => setShowDesc(true)}>
              Full
            </button>
            <button type="button" data-on={!showDesc} onClick={() => setShowDesc(false)}>
              Compact
            </button>
          </div>
        </div>
        <p className="toolbar-hint">
          Print this board and post it on the wall. Turn on background graphics so the cream paper and red
          headers come through.
        </p>
        <CategoryJump />
      </header>
      <main className="preview-wrap">
        <MenuBoard paper={paper} showDesc={showDesc} showMark={showMark} />
      </main>
    </div>
  );
}
