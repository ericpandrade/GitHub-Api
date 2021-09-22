import styles from "../styles/BodyProfile.module.scss";
import { ProfileBox } from "../components/ProfileBox";

export function Home() {
  return (
    <div className={styles.containerBody}>
      <ProfileBox />
    </div>
  );
}
