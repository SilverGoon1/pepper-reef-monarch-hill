import { useEffect, useRef, useState } from "react";
import { Eraser, Paintbrush, Trash2 } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { MAP_CENTER, cellRect, googleMapsSearchUrl, paintAround } from "@/lib/geo";
import { checkDeliveryAddress } from "@/lib/shop-server";

type Mode = "paint" | "erase";

export function ZoneMap({
  cells,
  onChange,
}: {
  cells: string[];
  onChange: (next: string[]) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const cellsRef = useRef(new Set(cells));
  const modeRef = useRef<Mode>("paint");
  const drawing = useRef(false);
  const [mode, setMode] = useState<Mode>("paint");
  const [brush, setBrush] = useState(1);
  const [query, setQuery] = useState("");
  const [lookup, setLookup] = useState("");
  const brushRef = useRef(1);

  useEffect(() => {
    cellsRef.current = new Set(cells);
    const layer = layerRef.current;
    if (layer && mapRef.current) {
      void import("leaflet").then((mod) => drawCells(mod, layer, cellsRef.current, tomatoColor()));
    }
  }, [cells]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect(() => {
    brushRef.current = brush;
  }, [brush]);

  useEffect(() => {
    if (!host.current || mapRef.current) return;
    let dead = false;
    void import("leaflet").then((L) => {
      if (dead || !host.current) return;
      const map = L.map(host.current, { zoomControl: true }).setView(MAP_CENTER, 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 18,
      }).addTo(map);
      const layer = L.layerGroup().addTo(map);
      mapRef.current = map;
      layerRef.current = layer;
      drawCells(L, layer, cellsRef.current, tomatoColor());

      const apply = (lat: number, lng: number) => {
        const keys = paintAround(lat, lng, brushRef.current);
        const set = cellsRef.current;
        let changed = false;
        for (const k of keys) {
          if (modeRef.current === "paint") {
            if (!set.has(k)) {
              set.add(k);
              changed = true;
            }
          } else if (set.delete(k)) changed = true;
        }
        if (changed) {
          drawCells(L, layer, set, tomatoColor());
          onChange([...set]);
        }
      };

      map.on("mousedown", (e) => {
        drawing.current = true;
        map.dragging.disable();
        apply(e.latlng.lat, e.latlng.lng);
      });
      map.on("click", (e) => {
        apply(e.latlng.lat, e.latlng.lng);
      });
      map.on("mousemove", (e) => {
        if (!drawing.current) return;
        apply(e.latlng.lat, e.latlng.lng);
      });
      const stop = () => {
        drawing.current = false;
        map.dragging.enable();
      };
      map.on("mouseup", stop);
      map.on("mouseout", stop);
    });
    return () => {
      dead = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once
  }, []);

  async function lookupAddress() {
    setLookup("Looking up…");
    try {
      const r = await checkDeliveryAddress({ data: { query } });
      if (!r.found) {
        setLookup("No match. Try a street name in Egg Harbor Township.");
        return;
      }
      setLookup(
        r.deliverable
          ? `Inside the painted zone — ${r.label}`
          : `Outside the painted zone — ${r.label}`,
      );
      if (r.lat != null && r.lng != null) {
        mapRef.current?.setView([r.lat, r.lng], 16);
      }
    } catch (e) {
      setLookup(e instanceof Error ? e.message : "Lookup failed");
    }
  }

  return (
    <div className="zone-wrap">
      <div className="zone-tools">
        <div className="seg" role="group" aria-label="Paint mode">
          <button type="button" data-on={mode === "paint"} onClick={() => setMode("paint")}>
            <Paintbrush size={14} />
            Paint
          </button>
          <button type="button" data-on={mode === "erase"} onClick={() => setMode("erase")}>
            <Eraser size={14} />
            Erase
          </button>
        </div>
        <div className="seg" role="group" aria-label="Brush size">
          {[0, 1, 2].map((n) => (
            <button key={n} type="button" data-on={brush === n} onClick={() => setBrush(n)}>
              {n === 0 ? "Fine" : n === 1 ? "Medium" : "Wide"}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="ed-btn ed-btn-quiet"
          onClick={() => {
            cellsRef.current = new Set();
            if (layerRef.current) layerRef.current.clearLayers();
            onChange([]);
          }}
        >
          <Trash2 size={14} />
          Clear
        </button>
        <span className="zone-count">{cells.length} blocks covered</span>
      </div>
      <div ref={host} className="zone-map" role="application" aria-label="Delivery zone map" />
      <form
        className="zone-lookup"
        onSubmit={(e) => {
          e.preventDefault();
          void lookupAddress();
        }}
      >
        <input
          className="ed-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Check a street in Egg Harbor Township"
        />
        <button type="submit" className="ed-btn">
          Check
        </button>
        <a className="ed-btn ed-btn-quiet" href={googleMapsSearchUrl(query || "Egg Harbor Township NJ")} target="_blank" rel="noreferrer">
          Google Maps
        </a>
      </form>
      {lookup ? <p className="zone-lookup-msg">{lookup}</p> : null}
      <p className="ed-sub">
        Drag to paint streets you deliver. Checkout only accepts addresses inside the red blocks. Open
        Google Maps to confirm a street, then paint it here.
      </p>
    </div>
  );
}

function tomatoColor() {
  if (typeof window === "undefined") return "currentColor";
  const v = getComputedStyle(document.documentElement).getPropertyValue("--color-tomato").trim();
  return v || "currentColor";
}

function drawCells(
  L: typeof import("leaflet"),
  layer: import("leaflet").LayerGroup,
  cells: Set<string>,
  color: string,
) {
  layer.clearLayers();
  for (const key of cells) {
    const r = cellRect(key);
    L.rectangle(
      [
        [r.south, r.west],
        [r.north, r.east],
      ],
      {
        color,
        weight: 1,
        fillColor: color,
        fillOpacity: 0.35,
      },
    ).addTo(layer);
  }
}
