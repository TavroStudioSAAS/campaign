import React, { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";
import { track } from "./tracking";

interface PlyrYoutubePlayerProps {
  videoId: string;
  title?: string;
}

export default function PlyrYoutubePlayer({
  videoId,
  title = "Free Odia AI Workshop",
}: PlyrYoutubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let playerInstance: { destroy: () => void } | null = null;
    let mounted = true;

    import("plyr").then(({ default: Plyr }) => {
      if (!mounted || !containerRef.current) return;
      const plyr = new Plyr(containerRef.current, {
        ratio: "16:9",
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "settings",
          "pip",
          "fullscreen",
        ],
        youtube: {
          noCookie: true,
          rel: 0,
          modestbranding: 1,
        },
      });
      plyr.on("play", () => {
        track("youtube_workshop_play", { video_id: videoId, video_title: title });
      });
      playerInstance = plyr;
    }).catch(() => {});

    return () => {
      mounted = false;
      playerInstance?.destroy();
    };
  }, [videoId, title]);

  return (
    <div className="plyr-brand-wrap overflow-hidden rounded-[1.4rem] bg-black shadow-2xl">
      <div
        ref={containerRef}
        data-plyr-provider="youtube"
        data-plyr-embed-id={videoId}
        aria-label={title}
      />
    </div>
  );
}
