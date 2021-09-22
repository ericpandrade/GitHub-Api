import { useProfileContext } from "../context/ProfileContext";
import styles from "../styles/components/RepoBox.module.scss";

const RepoBox = () => {
  const { profile } = useProfileContext();
  return (
    <div>
      <div className={styles.RepoBoxContainer}>
        <h1>Olá, {profile}!</h1>
      </div>
    </div>
  );
};

export default RepoBox;
