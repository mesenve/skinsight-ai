"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";
import { useReducedMotion } from "framer-motion";

type Props = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay" | "preload" | "children"> & {
  src: string;
  poster: string;
  immediate?: boolean;
  playbackRate?: number;
};

/** Keep the poster visible and prime lower-page videos before they enter view. */
export function ProgressiveVideo({ src, poster, immediate = false, playbackRate = 1, ...props }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(immediate);
  const [inView, setInView] = useState(immediate);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const warm = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRequested(true); warm.disconnect(); }
    }, { rootMargin: "900px 0px" });
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    warm.observe(video);
    visibility.observe(video);
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      warm.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.defaultPlaybackRate = playbackRate;
    video.playbackRate = playbackRate;
    if (requested && inView && pageVisible && !reducedMotion) void video.play().catch(() => {});
    else video.pause();
  }, [requested, inView, pageVisible, reducedMotion, playbackRate]);

  return <video {...props} ref={ref} poster={poster}
    src={requested && !reducedMotion ? src : undefined}
    preload={requested && !reducedMotion ? "auto" : "none"}
    autoPlay={immediate && !reducedMotion}
    loop muted playsInline
    onLoadedMetadata={(event) => {
      event.currentTarget.defaultPlaybackRate = playbackRate;
      event.currentTarget.playbackRate = playbackRate;
      props.onLoadedMetadata?.(event);
    }} />;
}
