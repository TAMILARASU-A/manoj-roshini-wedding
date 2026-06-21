import "./Diya.css";

export default function Diya({ size = 60 }) {
  return (
    <div className="diya-wrap" style={{ width: size, height: size * 1.3 }}>
      <div className="diya-flame-wrap">
        <div className="diya-flame-outer" />
        <div className="diya-flame-inner" />
        <div className="diya-flame-core" />
      </div>
      <div className="diya-wick" />
      <div className="diya-body" style={{ width: size, height: size * 0.5 }}>
        <div className="diya-glow" />
      </div>
      <div className="diya-base" style={{ width: size * 0.7 }} />
    </div>
  );
}
