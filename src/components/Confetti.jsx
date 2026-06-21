import { useEffect, useRef } from "react";

export default function Confetti({ active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#C9922A","#8B0000","#E8C87A","#F5E6C0","#FF6B6B","#FFD700","#FF69B4","#98FB98"];
    const emojis = ["🌸","🌺","🪷","🌼","✨","💛","❤️","🎊"];

    // Create burst of particles
    for (let i = 0; i < 120; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 1,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: Math.random() > 0.5 ? emojis[Math.floor(Math.random() * emojis.length)] : null,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 5,
        opacity: 1,
        life: 1,
      });
    }

    // Firework bursts
    const fireworks = [];
    for (let f = 0; f < 5; f++) {
      setTimeout(() => {
        const fx = 100 + Math.random() * (canvas.width - 200);
        const fy = 80 + Math.random() * (canvas.height * 0.4);
        for (let i = 0; i < 40; i++) {
          const angle = (i / 40) * Math.PI * 2;
          const speed = 3 + Math.random() * 5;
          particles.current.push({
            x: fx, y: fy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            emoji: null,
            rotation: 0, rotSpeed: 0,
            opacity: 1, life: 1,
            firework: true,
          });
        }
      }, f * 500);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => p.life > 0);
      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        p.life -= p.firework ? 0.018 : 0.008;
        p.opacity = p.life;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.emoji) {
          ctx.font = `${p.size * 2}px serif`;
          ctx.fillText(p.emoji, -p.size, p.size);
        } else {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        }
        ctx.restore();
      });

      if (particles.current.length > 0) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  if (!active) return null;
  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 500,
      pointerEvents: "none", width: "100%", height: "100%"
    }}/>
  );
}
