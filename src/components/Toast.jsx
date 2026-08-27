import { useEffect } from "react";

// Auto-dismissing feedback toast. Parent controls the message via
// state; this component just handles the timeout and rendering.
function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;
  return <div className="toast">{message}</div>;
}

export default Toast;
