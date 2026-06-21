import { useState } from "react";
import "./Envelope.css";

export default function Envelope({ onOpen }) {
  const [phase, setPhase] = useState("idle"); // idle | opening | open

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => {
      setPhase("open");
      setTimeout(() => onOpen(), 800);
    }, 1800);
  };

  if (phase === "open") return null;

  return (
    <div className="envelope-overlay">
      <div className="envelope-bg-pattern" />
      <div className="env-title">
        <div className="env-om">ॐ</div>
        <p className="env-subtitle">You have received a</p>
        <h1 className="env-heading">Wedding Invitation</h1>
        <p className="env-names">R.Manoj Kumar & T.Rosini</p>
      </div>

      <div className={`envelope-wrap ${phase === "opening" ? "opening" : ""}`} onClick={handleOpen}>
        <div className="envelope-body">
          {/* Back flap */}
          <div className="env-back" />
          {/* Left & right triangles */}
          <div className="env-left" />
          <div className="env-right" />
          {/* Bottom triangle */}
          <div className="env-bottom" />
          {/* Top flap */}
          <div className="env-flap" />
          {/* Letter inside */}
          <div className="env-letter">
            <div className="env-letter-inner">
              <span className="env-letter-om">🕉️</span>
              <p className="env-letter-text">R.Manoj Kumar<br />&<br />T.Rosini</p>
              <span className="env-letter-flower">🌸</span>
            </div>
          </div>
          {/* Wax seal */}
          <div className="env-seal">
            <span>M❤R</span>
          </div>
        </div>
        {phase === "idle" && (
          <button className="env-open-btn">
            <span className="env-btn-shimmer" />
            ✉️ Open Invitation
          </button>
        )}
        {phase === "opening" && (
          <p className="env-opening-text">Opening... 🌸</p>
        )}
      </div>

      <div className="env-flowers-bottom">🌺 🪷 🌸 🌼 🪷 🌺</div>
    </div>
  );
}
