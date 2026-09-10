/** Run `fn` immediately and on an interval, skipping ticks while the tab is hidden. */
export function onVisibleInterval(ms: number, fn: () => void) {
  if (typeof window === "undefined") return () => {};
  let timer = 0;
  const tick = () => {
    if (document.hidden) return;
    fn();
  };
  fn();
  timer = window.setInterval(tick, ms);
  const onVis = () => {
    if (!document.hidden) fn();
  };
  document.addEventListener("visibilitychange", onVis);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", onVis);
  };
}
