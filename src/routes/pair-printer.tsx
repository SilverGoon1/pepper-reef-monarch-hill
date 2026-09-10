import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bluetooth } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import {
  bluetoothReady,
  bytesFromPrintJob,
  notifyPrintResult,
  pairBluetoothPrinterHere,
  printEscPos,
  publishPairedPrinter,
  stashPrintJob,
  takePrintJob,
  type PrintJob,
} from "@/lib/bluetooth-printer";

export const Route = createFileRoute("/pair-printer")({ component: PairPrinterPage });

function PairPrinterPage() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    void bluetoothReady().then((ready) => {
      if (ready === "ready") setStatus("Bluetooth is on for this shop. Tap pair and pick the printer.");
      else if (ready === "adapter-off") setStatus("Turn Bluetooth on on this tablet, then tap pair.");
      else if (ready === "blocked") {
        setStatus("This window must stay on top. If the chooser does not appear, open this page in Chrome or Edge.");
      } else {
        setStatus("Use Chrome or Edge on the shop tablet to connect a Bluetooth printer.");
      }
    });

    const wantsPrint = new URLSearchParams(window.location.search).get("print") === "1";
    if (!wantsPrint) return;
    const job = takePrintJob();
    if (!job) {
      setMsg("No ticket waiting. Close this window and print again from the shop.");
      return;
    }
    void sendTicket(job);
  }, []);

  function sendTicket(job: PrintJob) {
    setPrinting(true);
    setBusy(true);
    return printEscPos(job.bluetoothId, bytesFromPrintJob(job))
      .then(() => {
        notifyPrintResult(true);
        setMsg("Ticket sent to the printer. You can close this window.");
        window.setTimeout(() => {
          try {
            window.close();
          } catch {
            // ignore
          }
        }, 700);
      })
      .catch((e) => {
        stashPrintJob(job.bluetoothId, bytesFromPrintJob(job));
        const error = e instanceof Error ? e.message : "Bluetooth print failed";
        setMsg(`${error} Pair the printer below, then the ticket will send.`);
        setPrinting(false);
      })
      .finally(() => setBusy(false));
  }

  function pair() {
    setBusy(true);
    setMsg("");
    void pairBluetoothPrinterHere()
      .then(async (paired) => {
        publishPairedPrinter(paired);
        const job = takePrintJob();
        if (job) {
          try {
            await printEscPos(paired.bluetoothId, bytesFromPrintJob(job));
            notifyPrintResult(true);
            setMsg(`Paired ${paired.bluetoothName} and sent the ticket.`);
          } catch (e) {
            notifyPrintResult(false, e instanceof Error ? e.message : "Bluetooth print failed");
            setMsg(
              `Paired ${paired.bluetoothName}, but the ticket did not send. ${
                e instanceof Error ? e.message : "Try test print from Printer setup."
              }`,
            );
            return;
          }
        } else {
          setMsg(`Paired ${paired.bluetoothName}. You can close this window.`);
        }
        window.setTimeout(() => {
          try {
            window.close();
          } catch {
            // ignore
          }
        }, 800);
      })
      .catch((e) => setMsg(e instanceof Error ? e.message : "Could not pair the printer."))
      .finally(() => setBusy(false));
  }

  return (
    <div className="shop-shell pair-shell">
      <main className="login-page">
        <div className="login-card">
          <BrandMark variant="login" />
          <p className="shop-brand-kicker">Printer pairing</p>
          <h1>{printing ? "Sending ticket" : "Connect the printer"}</h1>
          <p className="ed-sub">{status}</p>
          <button type="button" className="btn-print" onClick={pair} disabled={busy}>
            <Bluetooth size={16} strokeWidth={2.2} />
            {busy ? "Waiting for printer…" : "Pair Bluetooth printer"}
          </button>
          {msg ? <p className="ed-sub">{msg}</p> : null}
        </div>
      </main>
    </div>
  );
}
