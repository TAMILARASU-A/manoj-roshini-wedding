import { useState, useEffect } from "react";
import "./Loader.css";

const PHRASES = [
  "Lighting the lamps…",
  "Adorning the mandapam…",
  "Gathering the blessings…",
  "Welcoming you with love…",
];

export default function Loader({ onDone }) {
  const [idx, setIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setIdx(i => (i + 1 < PHRASES.length ? i + 1 : i));
    }, 650);
    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 700);
    }, 2600);
    return () => { clearInterval(phraseTimer); clearTimeout(exitTimer); };
  }, [onDone]);

  return (
    <div className={`loader-screen ${exiting ? "loader-exit" : ""}`}>
      <div className="loader-kolam-glow" />
      <div className="loader-content">
        <span className="loader-om">ॐ</span>
        <h1 className="loader-names">R.Manoj Kumar <span>&amp;</span> T.Rosini</h1>
        <div className="loader-divider"><span className="loader-line" /><span className="loader-lotus">🪷</span><span className="loader-line" /></div>
        <p className="loader-phrase" key={idx}>{PHRASES[idx]}</p>
      </div>
    </div>
  );
}
