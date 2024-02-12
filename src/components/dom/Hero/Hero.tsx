import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1>Saihaj Law</h1>
        <h3>Student Developer</h3>
      </div>
    </div>
  );
}
