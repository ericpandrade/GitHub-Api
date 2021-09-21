import styles from "../styles/BodyProfile.module.scss";
import { ProfileBox } from "./ProfileBox";

export function BodyProfile() {
  return (
    <div className={styles.containerBody}>
      <ProfileBox />
    </div>
  );
}
