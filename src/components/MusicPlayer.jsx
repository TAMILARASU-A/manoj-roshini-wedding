import { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";

// Tracks list (display names only)
const TRACKS = [
  { name: "Munbe Vaa ❤️", src: null },
  { name: "Kurai Ondrum Illai", src: null },
  { name: "Nithyasree Classical", src: null },
];

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [expanded, setExpanded] = useState(false);
  const [available, setAvailable] = useState(false);
  const [srcFile, setSrcFile] = useState(null);
  const [musicError, setMusicError] = useState("");
  const audioRef = useRef(null);

  const toggle = async () => {
    if (!audioRef.current || !available) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        setMusicError("");
        // ensure element is loaded
        try { audioRef.current.load(); } catch (_) { }
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (err) {
      // play() may fail due to browser autoplay policies or missing file
      console.warn("Audio play failed:", err);
      setMusicError(err?.message || "Playback failed");
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    // Check if /music.mp3 exists in public folder
    let mounted = true;
    (async () => {
      try {
        const candidates = ['/music.mp3', '/music.m4a', '/music.ogg', '/music.wav'];
        let found = null;
        for (const c of candidates) {
          try {
            const r = await fetch(c, { method: 'HEAD' });
            if (r.ok) { found = c; break; }
          } catch (_) { /* ignore */ }
        }
        if (!mounted) return;
        if (found) {
          setAvailable(true);
          setSrcFile(found);
          if (audioRef.current) {
            audioRef.current.crossOrigin = 'anonymous';
            audioRef.current.src = found;
            audioRef.current.preload = 'auto';
            audioRef.current.oncanplay = () => { /* ready to play */ };
            try { audioRef.current.load(); } catch (_) { }
          }
        } else {
          setAvailable(false);
          setSrcFile(null);
        }
      } catch (e) {
        if (mounted) setAvailable(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className={`music-player ${expanded ? "expanded" : ""}`}>
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <button className="music-toggle-btn" onClick={() => setExpanded(e => !e)} title="Music Player">
        <span className={`music-icon ${playing ? "spinning" : ""}`}>🎵</span>
      </button>
      {expanded && (
        <div className="music-panel">
          <p className="music-title">🎶 Wedding Music</p>
          <p className="music-track">{TRACKS[trackIdx].name}</p>
          <button className="music-play-btn" onClick={toggle} disabled={!available}>
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
          <div className="music-volume">
            <span>🔈</span>
            <input type="range" min="0" max="1" step="0.05" value={volume}
              onChange={e => setVolume(+e.target.value)} className="volume-slider" />
            <span>🔊</span>
          </div>
          {!available ? (
            <p className="music-note">No music file found. Add a `music.*` file to the project's `public` folder.</p>
          ) : null}
          {musicError && <p className="music-error">{musicError}</p>}
        </div>
      )}
    </div>
  );
}
