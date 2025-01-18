import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className="container">
        <img src={"./goodlord-logo-white.webp"} width={150} height={"auto"} />
      </div>
    </div>
  );
}
