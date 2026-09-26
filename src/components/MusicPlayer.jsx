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
  const [autoplayFailed, setAutoplayFailed] = useState(false);
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

  // Attempt autoplay when a music file becomes available
  useEffect(() => {
    if (!available || !audioRef.current) return;
    const audio = audioRef.current;
    let mutedFallback = false;

    const tryMuted = async () => {
      try {
        audio.muted = true;
        audio.volume = 0.3;
        await audio.play();
        mutedFallback = true;
        setPlaying(true);
        setAutoplayFailed(false);
      } catch (err) {
        console.warn("Muted autoplay failed:", err);
        setPlaying(false);
        setAutoplayFailed(true);
      }
    };

    const tryUnmuted = async () => {
      try {
        audio.muted = false;
        audio.volume = volume;
        await audio.play();
        setPlaying(true);
        setAutoplayFailed(false);
      } catch (err) {
        console.warn("Unmuted autoplay failed, trying muted fallback:", err);
        tryMuted();
      }
    };

    tryUnmuted();

    const onFirstInteraction = async () => {
      try {
        if (audio.muted) {
          audio.muted = false;
          audio.volume = volume;
          await audio.play();
          setPlaying(true);
          setAutoplayFailed(false);
        }
      } catch (err) {
        console.warn("Unmute on interaction failed:", err);
      }
    };

    window.addEventListener("click", onFirstInteraction, { once: true });
    window.addEventListener("touchstart", onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };
  }, [available, volume]);

  // User-triggered enable function for fallback UI
  const enableAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.muted = false;
      audio.volume = volume;
      await audio.play();
      setPlaying(true);
      setAutoplayFailed(false);
    } catch (err) {
      console.warn("Enable audio failed:", err);
      setMusicError(err?.message || "Playback failed");
    }
  };

  return (
    <div className={`music-player ${expanded ? "expanded" : ""}`}>
      <audio ref={audioRef} loop autoPlay muted>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      {autoplayFailed && (
        <div className="music-fallback-banner" onClick={enableAudio} role="button" tabIndex={0}>
          ▶️ Tap to enable music
        </div>
      )}
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
