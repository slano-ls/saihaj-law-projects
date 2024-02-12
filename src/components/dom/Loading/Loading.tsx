import { useProgress } from "@react-three/drei";
import styles from "./Loading.module.scss";
import { useStore } from "@/utils/state";
import { useState } from "react";

export function Loading() {
  const { progress } = useProgress();
  const [loaded, setLoaded] = useState(false);

  const handleEnterButtonClick = () => {
    if (!loaded) {
      useStore.setState({ loaded: true, muted: false });
      setLoaded(true);
    }
  };

  const handleDisableAudioButtonClick = () => {
    if (!loaded) {
      useStore.setState({ loaded: true });
      setLoaded(true);
    }
  };

  return (
    <div className={`${styles.loading} ${loaded ? styles.done : ""}`}>
      <div className={styles.text}>
        <h1>Saihaj Law</h1>
        <h3>Student Developer</h3>
      </div>
      <div className={styles.progress}>
        <div className={styles.buttons + (progress >= 100 ? " " + styles.loaded : "")}>
          <button onClick={handleEnterButtonClick}>Enter</button>
          <button onClick={handleDisableAudioButtonClick}>Disable Audio</button>
        </div>
        <h3 className={progress >= 100 ? styles.loaded : undefined}>Loading</h3>
      </div>
    </div>
  );
}
