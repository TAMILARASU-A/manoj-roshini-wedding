import "./ActionButtons.css";

export default function ActionButtons() {
  const shareWhatsApp = () => {
    const message = `🌸 You're Invited! 🌸

Manoj & Roshini
are getting married!

🪔 Reception — 24 Oct 2026
🌸 Muhurtham — 25 Oct 2026

📍 Sri Annanmar Swamy Temple
Thirumana Mandapam
Thoravalur, Tamil Nadu

Join us for this beautiful celebration
of love and togetherness 💛

View our wedding invite 💌
👇
${window.location.href}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  const addToCalendar = () => {
    const events = [
      {
        title: "R.Manoj Kumar & T.Rosini - Reception",
        start: "20261024T180000",
        end: "20261024T230000",
        details: "Reception at Sri Annanmar Swamy Temple Thirumana Mandapam, Thoravalur, Tamil Nadu 638103",
      },
      {
        title: "R.Manoj Kumar & T.Rosini - Muhurtham",
        start: "20261025T070000",
        end: "20261025T120000",
        details: "Wedding Muhurtham at Sri Annanmar Swamy Temple Thirumana Mandapam, Thoravalur, Tamil Nadu 638103",
      },
    ];
    events.forEach(e => {
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.title)}&dates=${e.start}/${e.end}&details=${encodeURIComponent(e.details)}&location=${encodeURIComponent("Sri Annanmar Swamy Temple Thirumana Mandapam, Thoravalur, Tamil Nadu 638103")}`;
      window.open(url, "_blank");
    });
  };

  return (
    <div className="action-buttons-bar">
      <button className="action-btn whatsapp-btn" onClick={shareWhatsApp}>
        <span className="action-btn-icon">💬</span>
        <span>Share on WhatsApp</span>
      </button>
      <button className="action-btn calendar-btn" onClick={addToCalendar}>
        <span className="action-btn-icon">🗓️</span>
        <span>Add to Calendar</span>
      </button>
    </div>
  );
}
