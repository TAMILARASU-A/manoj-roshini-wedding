import { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { db } from "../lib/firebase";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function WishesWall() {
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(
            q,
            (snapshot) => {
                setWishes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
                setLoading(false);
            },
            (err) => {
                console.error("Firestore error:", err);
                setLoading(false);
            }
        );
        return () => unsub();
    }, []);

    const formatTime = (ts) => {
        if (!ts) return "";
        try {
            const d = ts.toDate ? ts.toDate() : new Date(ts);
            return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
        } catch (e) {
            return '';
        }
    };

    const handleSubmit = async () => {
        if (!name.trim() || !msg.trim()) return;
        setSending(true);
        setError("");
        try {
            await addDoc(collection(db, "wishes"), {
                name: name.trim(),
                msg: msg.trim(),
                createdAt: serverTimestamp(),
            });

            if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
                try {
                    await emailjs.send(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ID,
                        { from_name: name.trim(), message: msg.trim() },
                        EMAILJS_PUBLIC_KEY
                    );
                } catch (e) {
                    console.error("EmailJS error:", e);
                    // don't fail the whole flow if email fails; show a console error
                }
            }

            setName(""); setMsg(""); setSent(true);
            setTimeout(() => setSent(false), 3000);
        } catch (err) {
            console.error("Submit error:", err);
            // show a helpful message when possible
            const msgText = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
            setError(msgText || "Couldn't send your blessing. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="wishes" className="section wishes-section">
            <div className="section-inner">
                <div className="section-eyebrow">❤️ Blessings</div>
                <h2 className="section-title">Wishes & Blessings</h2>
                <p className="section-sub">Share your love for the couple</p>
                <div className="floral-divider"><span className="floral-line" /><span className="floral-lotus">🪷</span><span className="floral-line" /></div>

                <div className="wish-form">
                    <input className="wish-input" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} maxLength={40} disabled={sending} />
                    <textarea className="wish-input wish-textarea" placeholder="Your blessing or message..." value={msg} onChange={e => setMsg(e.target.value)} maxLength={200} rows={3} disabled={sending} />
                    {error && <p className="wish-error">{error}</p>}
                    <button className="wish-btn" onClick={handleSubmit} disabled={sending}>
                        {sending ? "Sending..." : sent ? "✓ Blessing Sent!" : "Send Blessing 🙏"}
                    </button>
                </div>

                <div className="wishes-grid">
                    {loading && <p className="wishes-loading">Loading blessings...</p>}
                    {!loading && wishes.length === 0 && <p className="wishes-loading">Be the first to send your blessing! 💛</p>}
                    {wishes.map((w) => (
                        <div className="wish-card" key={w.id}>
                            <p className="wish-msg">"{w.msg}"</p>
                            <p className="wish-name">— {w.name}</p>
                            {w.createdAt && <p className="wish-time">{formatTime(w.createdAt)}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
