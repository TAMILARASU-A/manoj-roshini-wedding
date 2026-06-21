import "./FloralFrame.css";

export default function FloralFrame({ children }) {
  return (
    <div className="floral-frame">
      <div className="ff-corner ff-tl">🌺</div>
      <div className="ff-corner ff-tr">🌺</div>
      <div className="ff-corner ff-bl">🌸</div>
      <div className="ff-corner ff-br">🌸</div>
      <div className="ff-top">
        {Array.from({length:7}).map((_,i)=>(
          <span key={i} className="ff-top-flower" style={{animationDelay:`${i*0.15}s`}}>
            {i%2===0?"🌼":"🪷"}
          </span>
        ))}
      </div>
      <div className="ff-bottom">
        {Array.from({length:7}).map((_,i)=>(
          <span key={i} className="ff-bottom-flower" style={{animationDelay:`${i*0.15}s`}}>
            {i%2===0?"🪷":"🌼"}
          </span>
        ))}
      </div>
      <div className="ff-left">
        {Array.from({length:5}).map((_,i)=>(
          <span key={i} className="ff-side-flower" style={{animationDelay:`${i*0.2}s`}}>🌺</span>
        ))}
      </div>
      <div className="ff-right">
        {Array.from({length:5}).map((_,i)=>(
          <span key={i} className="ff-side-flower" style={{animationDelay:`${i*0.2}s`}}>🌸</span>
        ))}
      </div>
      <div className="ff-content">{children}</div>
    </div>
  );
}
