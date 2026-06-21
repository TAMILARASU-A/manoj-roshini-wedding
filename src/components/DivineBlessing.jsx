export default function DivineBlessing() {
    return (
        <section id="blessing" className="section blessing-section">
            <div className="section-inner">
                <div className="section-eyebrow">🙏 Divine Blessings</div>
                <h2 className="section-title">Murugan Thunai</h2>
                <div className="floral-divider"><span className="floral-line" /><span className="floral-lotus">🦚</span><span className="floral-line" /></div>

                <div className="blessing-card">
                    <div className="blessing-photo-wrap">
                        <img
                            src="/images/murugan.jpg"
                            alt="Lord Murugan"
                            data-tried=""
                            onError={(e) => {
                                const img = e.currentTarget;
                                try {
                                    const candidates = ['/images/murugar.jpeg', '/images/murugar.jpg', '/images/murugan.jpeg', '/images/Murugar.jpeg', '/images/Murugan.jpg'];
                                    const tried = (img.getAttribute('data-tried') || '').split('|').filter(Boolean);
                                    const next = candidates.find(c => !tried.includes(c));
                                    if (next) {
                                        tried.push(next);
                                        img.setAttribute('data-tried', tried.join('|'));
                                        img.src = next;
                                        return;
                                    }
                                } catch (err) {
                                    console.error('DivineBlessing image onError:', err);
                                }
                                img.style.display = 'none';
                                const fallback = img.parentNode && img.parentNode.querySelector('.blessing-photo-fallback');
                                if (fallback) fallback.style.display = 'flex';
                            }}
                        />
                        <span className="blessing-photo-fallback">🛕</span>
                    </div>

                    <p className="blessing-quote-tamil">
                        "ஆறுமுகம் அருளிடும் அனுதினமும்"
                    </p>
                    <p className="blessing-quote-en">
                        "Lord Murugan, bless our married life with prosperity,<br />
                        and protect us always with your grace."
                    </p>
                </div>
            </div>
        </section>
    );
}
