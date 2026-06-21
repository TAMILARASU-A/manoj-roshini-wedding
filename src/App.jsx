import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Diya from "./components/Diya";
import MusicPlayer from "./components/MusicPlayer";
import FloralFrame from "./components/FloralFrame";
import DivineBlessing from "./components/DivineBlessing";
// StoryTimeline removed per request
import Rituals from "./components/Rituals";
import ActionButtons from "./components/ActionButtons";
import WishesWall from "./components/WishesWall";

const KolamBorder = () => (
  <svg viewBox="0 0 400 40" preserveAspectRatio="none" style={{ width: '100%', height: '40px', display: 'block' }}>
    <defs>
      <pattern id="kolam" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="2" fill="#C9922A" opacity="0.8" />
        <circle cx="0" cy="0" r="2" fill="#C9922A" opacity="0.8" />
        <circle cx="40" cy="0" r="2" fill="#C9922A" opacity="0.8" />
        <circle cx="0" cy="40" r="2" fill="#C9922A" opacity="0.8" />
        <circle cx="40" cy="40" r="2" fill="#C9922A" opacity="0.8" />
        <line x1="0" y1="0" x2="40" y2="40" stroke="#C9922A" strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="0" x2="0" y2="40" stroke="#C9922A" strokeWidth="0.5" opacity="0.3" />
        <circle cx="20" cy="0" r="1.2" fill="#8B0000" opacity="0.6" />
        <circle cx="0" cy="20" r="1.2" fill="#8B0000" opacity="0.6" />
        <circle cx="40" cy="20" r="1.2" fill="#8B0000" opacity="0.6" />
        <circle cx="20" cy="40" r="1.2" fill="#8B0000" opacity="0.6" />
      </pattern>
    </defs>
    <rect width="400" height="40" fill="url(#kolam)" />
  </svg>
);

const FloralDivider = () => (
  <div className="floral-divider">
    <span className="floral-line" />
    <span className="floral-lotus">🪷</span>
    <span className="floral-line" />
  </div>
);

function Countdown({ target }) {
  const [time, setTime] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 });
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    calc(); const t = setInterval(calc, 1000); return () => clearInterval(t);
  }, [target]);
  return (
    <div className="countdown-grid">
      {[["Days", time.d], ["Hours", time.h], ["Minutes", time.m], ["Seconds", time.s]].map(([label, val]) => (
        <div className="countdown-box" key={label}>
          <span className="countdown-num">{String(val ?? 0).padStart(2, "0")}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function MurugarBadge() {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    let mounted = true;
    const candidates = ['/images/HomeMurugar.jpg', '/images/HomeMurugar.jpeg', '/images/Murugar.jpeg', '/images/murugar.jpeg', '/images/Murugar.jpg', '/images/murugar.jpg', '/images/murugan.jpeg', '/images/murugan.jpg'];
    (async () => {
      for (const c of candidates) {
        if (!mounted) return;
        const ok = await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = c;
        });
        if (ok) {
          if (!mounted) return;
          setUrl(c);
          break;
        }
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (!url) return <div className="hero-murugar" aria-hidden />;
  return <div className="hero-murugar" aria-hidden style={{ backgroundImage: `url('${url}')` }} />;
}

// WishesWall component moved to ./components/WishesWall — imported above

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [petals, setPetals] = useState([]);

  useEffect(() => { const s = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", s); return () => window.removeEventListener("scroll", s); }, []);
  useEffect(() => { setPetals(Array.from({ length: 18 }, (_, i) => ({ id: i, left: Math.random() * 100, delay: Math.random() * 8, dur: 6 + Math.random() * 6, size: 10 + Math.random() * 14, emoji: ["🌸", "🌺", "🌼", "🪷", "✨"][Math.floor(Math.random() * 5)] }))); }, []);
  useEffect(() => { document.body.style.overflow = loading ? "hidden" : "auto"; }, [loading]);

  const handleLoaderDone = () => { setLoading(false); };
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const navLinks = [{ id: "hero", label: "Home" }, { id: "couple", label: "Couple" }, { id: "rituals", label: "Rituals" }, { id: "invitation", label: "Invitation" }, { id: "events", label: "Events" }, { id: "gallery", label: "Gallery" }, { id: "venue", label: "Venue" }, { id: "wishes", label: "Wishes" }];

  const addEventToCalendar = (title, start, end, details) => {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent("Sri Annanmar Swamy Temple Thirumana Mandapam, Thoravalur, Tamil Nadu 638103")}`;
    window.open(url, "_blank");
  };

  return (
    <div className="app">
      {loading && <Loader onDone={handleLoaderDone} />}

      {/* Falling petals */}
      <div className="petals-container" aria-hidden>
        {petals.map(p => (
          <span key={p.id} className="petal" style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, fontSize: `${p.size}px` }}>{p.emoji}</span>
        ))}
      </div>

      <MusicPlayer />

      {/* Nav */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="nav-brand" onClick={() => scrollTo("hero")}>M ❤ R</div>
        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {navLinks.map(l => <button key={l.id} className="nav-link" onClick={() => scrollTo(l.id)}>{l.label}</button>)}
        </div>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu"><span /><span /><span /></button>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-bg-pattern" />
        <MurugarBadge />
        <div className="hero-diyas">
          <Diya size={50} /><Diya size={70} /><Diya size={50} />
        </div>
        <KolamBorder />
        <div className="hero-content">
          <div className="hero-om">ॐ</div>
          <p className="hero-blessing">శుభ వివాహం • Shubh Vivah</p>
          <p className="hero-invite-text">You are cordially invited to the wedding of</p>
          <div className="hero-names">
            <span className="hero-name groom">R.Manoj Kumar <span className="hero-name-tamil">(மனோஜ் குமார்)</span></span>
            <span className="hero-ampersand">♥</span>
            <span className="hero-name bride">T.Rosini <span className="hero-name-tamil">( ரோஷினி )</span></span>
          </div>
          <div className="hero-tamil">மனோஜ் குமார் & ரோஷினி</div>
          <div className="hero-dates">
            <div className="hero-date-pill">🪔 Reception · 24 October 2026</div>
            <div className="hero-date-pill">🌸 Muhurtham · 25 October 2026</div>
          </div>
          <div className="hero-location">📍 Sri Annanmar Swamy Temple Thirumana Mandapam, Thoravalur</div>
          {/* invitation sample moved to its own section below */}
        </div>
        <KolamBorder />
      </section>

      {/* COUNTDOWN */}
      <section className="section countdown-section">
        <div className="section-inner">
          <div className="section-eyebrow">⏳ Counting Down</div>
          <h2 className="section-title">Until the Big Day</h2>
          <p className="section-sub">Muhurtham · 25 October 2026, 7:00 AM</p>
          <FloralDivider />
          <Countdown target="2026-10-25T07:00:00" />
        </div>
      </section>

      {/* DIVINE BLESSING */}
      <DivineBlessing />

      {/* COUPLE */}
      <section id="couple" className="section couple-section">
        <div className="section-inner">
          <div className="section-eyebrow">💑 The Couple</div>
          <h2 className="section-title">Together Forever</h2>
          <FloralDivider />
          <FloralFrame>
            <div className="couple-cards">
              <div className="couple-card">
                <div className="couple-photo-wrap">
                  <img src="/images/groom.jpg" alt="R.Manoj Kumar (மனோஜ் குமார்)" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <span className="couple-photo-fallback" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>🤵</span>
                </div>
                <div className="couple-card-tag">Groom</div>
                <h3 className="couple-name">R.Manoj Kumar <span className="couple-name-tamil">(மனோஜ் குமார்)</span></h3>
                <p className="couple-degree">B.Com</p>
                <p className="couple-desc">The one who stole her heart with his warmth, dedication, and endless smile.</p>
                <div className="couple-flowers">🌺 🪷 🌺</div>
              </div>
              <div className="couple-heart-center">❤️</div>
              <div className="couple-card">
                <div className="couple-photo-wrap">
                  <img src="/images/bride.jpg" alt="T.Rosini ( ரோஷினி )" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <span className="couple-photo-fallback" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>👰</span>
                </div>
                <div className="couple-card-tag">Bride</div>
                <h3 className="couple-name">T.Rosini <span className="couple-name-tamil">( ரோஷினி )</span></h3>
                <p className="couple-degree">B.Sc - Mathematics</p>
                <p className="couple-desc">The one whose grace, love, and laughter make every moment magical.</p>
                <div className="couple-flowers">🌸 🌼 🌸</div>
              </div>
            </div>
            <blockquote className="couple-quote">"Two souls, one destiny — blessed by the divine, celebrated by all."</blockquote>
          </FloralFrame>
          {/* Framed couple photo - replace /public/images/couple.jpg with your photo */}
          <div className="couple-photo-display">
            <div className="couple-photo-frame">
              <img
                src="/images/couple.jpeg"
                alt="Couple"
                className="couple-photo-img"
                onError={(e) => {
                  try {
                    const src = e.target.src || '';
                    if (src.endsWith('couple.jpeg')) e.target.src = '/images/couple.jpg';
                    else if (src.endsWith('couple.jpg')) e.target.src = '/images/couple.svg';
                    else e.target.style.display = 'none';
                  } catch (_) { e.target.style.display = 'none'; }
                }}
              />
            </div>
            <div className="couple-photo-caption">நித்தியமான அன்பு • (Nithiyamaana anbu) — Eternal love</div>
          </div>
        </div>
      </section>

      {/* STORY TIMELINE removed */}

      {/* RITUALS */}
      <Rituals />

      {/* INVITATION (individual section) */}
      <section id="invitation" className="section invitation-section">
        <div className="section-inner">
          <div className="section-eyebrow">YOU ARE CORDIALLY INVITED</div>
          <h2 className="section-title">Invitation</h2>
          <div className="invitation-divider" />
          <div className="invitation-frame">
            <img
              src="/images/invitation-sample.jpg"
              alt="Invitation"
              className="invitation-img"
              onError={(e) => {
                const src = e.target.src || '';
                if (src.endsWith('invitation-sample.jpg')) e.target.src = '/images/invitation-sample.png';
                else e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="section events-section">
        <div className="section-inner">
          <div className="section-eyebrow">📅 Schedule</div>
          <h2 className="section-title">Wedding Celebrations</h2>
          <p className="section-sub">Mark your calendar for these auspicious moments</p>
          <FloralDivider />
          <div className="events-timeline">
            <div className="event-card">
              <div className="event-icon">🪔</div>
              <div className="event-details">
                <div className="event-tag">Day 1</div>
                <h3 className="event-name">Reception</h3>
                <p className="event-date">📅 Saturday, 24 October 2026</p>
                <p className="event-time">⏰ 6:00 PM onwards</p>
                <p className="event-venue">📍 Sri Annanmar Swamy Temple Thirumana Mandapam, Thoravalur</p>
                <p className="event-note">Join us for an evening of celebration, music, and blessings as we begin this beautiful journey.</p>
                <div style={{ marginTop: 10 }}>
                  <button className="action-btn calendar-btn event-calendar-btn" onClick={() => addEventToCalendar(
                    "R.Manoj Kumar & T.Rosini - Reception",
                    "20261024T180000",
                    "20261024T230000",
                    "Reception at Sri Annanmar Swamy Temple Thirumana Mandapam, Thoravalur, Tamil Nadu 638103"
                  )}>
                    <span className="action-btn-icon">🗓️</span>
                    <span>Add to Calendar</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="event-connector"><span className="event-connector-dot" /><span className="event-connector-line" /><span className="event-connector-dot" /></div>
            <div className="event-card event-card-main">
              <div className="event-icon">🌸</div>
              <div className="event-details">
                <div className="event-tag main-tag">Main Event</div>
                <h3 className="event-name">Muhurtham</h3>
                <p className="event-date">📅 Sunday, 25 October 2026</p>
                <p className="event-time">⏰ Auspicious time: 7:00 AM</p>
                <p className="event-venue">📍 Sri Annanmar Swamy Temple, Thoravalur</p>
                <p className="event-note">The sacred union under the divine blessings of Sri Annanmar Swamy.</p>
                <div style={{ marginTop: 10 }}>
                  <button className="action-btn calendar-btn event-calendar-btn" onClick={() => addEventToCalendar(
                    "R.Manoj Kumar & T.Rosini - Muhurtham",
                    "20261025T070000",
                    "20261025T120000",
                    "Wedding Muhurtham at Sri Annanmar Swamy Temple, Thoravalur, Tamil Nadu 638103"
                  )}>
                    <span className="action-btn-icon">🗓️</span>
                    <span>Add to Calendar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section gallery-section">
        <div className="section-inner">
          <div className="section-eyebrow">📸 Gallery</div>
          <h2 className="section-title">Our Moments</h2>
          <p className="section-sub">A glimpse into our beautiful journey</p>
          <FloralDivider />
          <div className="gallery-grid">
            {[{ emoji: "💑", label: "First Meeting", desc: "Where it all began" }, { emoji: "💍", label: "Engagement", desc: "She said yes!" }, { emoji: "🌺", label: "Mehendi", desc: "Beautiful traditions" }, { emoji: "🪔", label: "Haldi", desc: "Golden blessings" }, { emoji: "👰‍♀️", label: "Bridal Look", desc: "Radiant & beautiful" }, { emoji: "🎊", label: "Wedding", desc: "Forever begins" }, { emoji: "👨‍👩‍👧", label: "Family", desc: "Cherished moments" }, { emoji: "🎉", label: "Reception", desc: "Celebration night" }].map((item, i) => (
              <div className="gallery-card" key={i}>
                <div className="gallery-emoji">{item.emoji}</div>
                <div className="gallery-overlay"><p className="gallery-label">{item.label}</p><p className="gallery-desc">{item.desc}</p></div>
              </div>
            ))}
          </div>
          <p className="gallery-note">📷 Photos will be updated after the ceremony</p>
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="section venue-section">
        <div className="section-inner">
          <div className="section-eyebrow">📍 Location</div>
          <h2 className="section-title">Venue</h2>
          <FloralDivider />
          <div className="venue-card">
            <div className="venue-icon">🛕</div>
            <h3 className="venue-name">Sri Annanmar Swamy Temple<br />Thirumana Mandapam</h3>
            <img
              src="/images/venue.png"
              alt="Venue photo"
              className="venue-photo"
              onError={(e) => {
                const src = e.target.src || '';
                if (src.includes('venue.png')) {
                  e.target.src = '/images/venue.jpg';
                } else if (src.includes('venue.jpg')) {
                  e.target.src = '/images/venue.svg';
                } else {
                  e.target.style.display = 'none';
                }
              }}
            />
            <p className="venue-address">Kunnathur-Sevur Road, Thoravalur<br />Tamil Nadu – 638103</p>
            {/* Map removed per request — only keeping Get Directions link */}
            <a className="venue-directions-btn" href="https://maps.google.com/?q=SRI+ANNANMAAR+SWAMY+TEMPLE,Kunnathur-Sevur+Road,Thoravalur,Tamil+Nadu+638103" target="_blank" rel="noopener noreferrer">🗺️ Get Directions</a>
          </div>
        </div>
      </section>

      <div id="wishes"><WishesWall /></div>

      {/* ACTION BUTTONS */}
      <ActionButtons />

      {/* FOOTER */}
      <footer className="footer">
        <KolamBorder />
        <div className="footer-content">
          <div className="footer-diyas"><Diya size={40} /><Diya size={55} /><Diya size={40} /></div>
          <div className="footer-om">🕉️</div>
          <p className="footer-names">R.Manoj Kumar & T.Rosini</p>
          <p className="footer-date">24 & 25 October 2026</p>
          <p className="footer-verse">"உயிரோடு உயிர் கலந்து வாழ்வோம்"</p>
          <p className="footer-note">With love & blessings 🌸</p>
          <div className="footer-flowers">🌺 🪷 🌸 🌼 🌺</div>
          <div className="footer-credit-divider">
            <span className="footer-credit-line" />
            <p className="footer-credit">அன்புடனும் ஆசியுடனும் — Nanban Tamilarasu 🙏</p>
            <span className="footer-credit-line" />
          </div>
        </div>
      </footer>
    </div>
  );
}
