import { useStore } from "@/utils/state";
import { PositionalAudio } from "@react-three/drei";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PositionalAudio as PositionalAudioType } from "three";

type Props = JSX.IntrinsicElements["positionalAudio"] & { startTime?: number };

export function AmbientSound(props: Props) {
  const ref = useRef<PositionalAudioType>();
  const muted = useStore(s => s.muted);
  const loaded = useStore(s => s.loaded);
  const { startTime, ...restProps } = props;

  const [inFocus, setInFocus] = useState<boolean>(true);

  useEffect(() => {
    const handler = () => {
      setInFocus(!document.hidden);
    };

    document.addEventListener("visibilitychange", handler);

    return () => {
      document.removeEventListener("visibilitychange", handler);
    };
  }, []);

  useLayoutEffect(() => {
    if (loaded && ref.current && !ref.current.isPlaying) {
      // Set volume to 0.25 when loaded
      ref.current.setVolume(0.25);
      // Start playback from startTime or 0 if not provided
      ref.current.play(startTime ?? 0);
    }
  }, [loaded, startTime]);

  useEffect(() => {
    if (!ref.current || !ref.current.isPlaying) return;
    const gain = ref.current.gain.gain;
    const currentTime = ref.current.context.currentTime;

    if (!muted && inFocus) {
      // Ramp up volume to 0.25 over 2 seconds
      gain.setValueAtTime(gain.value, currentTime);
      gain.linearRampToValueAtTime(0.25, currentTime + 2);
    } else {
      // Ramp down volume to 0 over 2 seconds
      gain.setValueAtTime(gain.value, currentTime);
      gain.linearRampToValueAtTime(0, currentTime + 2);
    }
  }, [muted, inFocus, ref.current?.isPlaying]);

  return <PositionalAudio ref={ref} url="/audio/palace(S).mp3" loop={false} {...restProps} />;
}
