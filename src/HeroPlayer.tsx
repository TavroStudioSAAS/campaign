import React, { useRef, useState } from "react";
import { NeutralVideoSkin, Video as PlayerVideo, VideoPlayer } from "@videojs/react/video";
import { Volume2 } from "lucide-react";
import { track } from "./tracking";

export default function HeroPlayer({ video, poster }: { video: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const playWithSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.volume = 1;
    v.play().catch(() => {});
    setMuted(false);
    track("video_play_with_sound", { video_title: "FREE Odia AI Bootcamp intro" });
  };
  return (
    <>
      <VideoPlayer poster={poster}>
        <NeutralVideoSkin className="bootcamp-player block aspect-video w-full">
          <PlayerVideo ref={videoRef} src={video} autoPlay muted loop playsInline preload="metadata" controlsList="nodownload" aria-label="FREE Odia AI Bootcamp intro video" />
        </NeutralVideoSkin>
      </VideoPlayer>
      {muted && (
        <button type="button" onClick={playWithSound} className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/95 px-5 py-3 text-[13px] font-extrabold text-[#0f1424] shadow-xl transition hover:scale-105">
          <Volume2 size={18} className="text-[var(--orange)]" /> Watch with sound
        </button>
      )}
    </>
  );
}
