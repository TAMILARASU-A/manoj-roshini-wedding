import { useState } from "react";
import "./Rituals.css";

const RITUALS = [
  {
    icon: "🤝",
    title: "Nichayathartham",
    tamil: "நிச்சயதார்த்தம்",
    desc: "The groom's family visits the bride's family, exchanging plates of fruits and betel nuts. Both families mutually fix the wedding date, time, and venue — marking the formal start of the alliance."
  },
  {
    icon: "🧂",
    title: "Uppu Vaanguthal",
    tamil: "உப்பு வாங்குதல்",
    desc: "Salt is considered sacred, and on an auspicious day both families assemble with two baskets of salt. After worship, they exchange and mix the salt, carrying it on the head of an agnate lady — a mark of solemnizing the betrothal."
  },
  {
    icon: "🌼",
    title: "Patni Seer",
    tamil: "பத்னி சீர்",
    desc: "These days, it's a hilarious, messy fun-game! The bride and groom are playfully 'bathed' by their moora (cousins/relatives) using turmeric water, leftover vegetables, rice water, and anything else on hand — a chaotic, laughter-filled tradition that bonds the families together before the big day."
  },
  {
    icon: "🎋",
    title: "Muhurtha Kaal",
    tamil: "முகூர்த்த கால்",
    desc: "Three Arumaikaarars (respected community elders) erect the wedding pandal, signaling that the wedding will take place the next day — accompanied by festive traditional drum music that fills the air with celebration."
  },
  {
    icon: "🔱",
    title: "Thali Kattu",
    tamil: "தாலி கட்டு",
    desc: "The most sacred moment — the groom ties the Thali around the bride's neck with three knots, as temple bells ring and mantras are chanted, marking their sacred union forever."
  },
  {
    icon: "💍",
    title: "Mothiram Thedal",
    tamil: "முத்திரம் தேடல்",
    desc: "A playful post-wedding game where the couple searches for a ring hidden in a vessel of water or milk. The playful search is shared with family and guests — a lighthearted tradition symbolizing togetherness and laughter as the new couple begins married life."
  },
];

export default function Rituals() {
  const [open, setOpen] = useState(null);
  return (
    <section id="rituals" className="section rituals-section">
      <div className="section-inner">
        <div className="section-eyebrow">🪔 Kongu Vellalar Traditions</div>
        <h2 className="section-title">Our Rituals</h2>
        <p className="section-sub">Tap a ritual to explore its sacred meaning</p>
        <div className="floral-divider"><span className="floral-line" /><span className="floral-lotus">🪷</span><span className="floral-line" /></div>
        <div className="rituals-grid">
          {RITUALS.map((r, i) => (
            <div key={r.title} className={`ritual-card ${open === i ? "ritual-open" : ""}`} onClick={() => setOpen(open === i ? null : i)}>
              <div className="ritual-icon">{r.icon}</div>
              <h3 className="ritual-title">{r.title}</h3>
              <p className="ritual-tamil">{r.tamil}</p>
              <p className="ritual-desc">{r.desc}</p>
              <span className="ritual-toggle">{open === i ? "− Show less" : "+ Read more"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
