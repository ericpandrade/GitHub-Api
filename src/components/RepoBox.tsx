import { useProfileContext } from "../context/ProfileContext";
import styles from "../styles/components/RepoBox.module.scss";

const RepoBox = () => {
  const { profile } = useProfileContext();
  return (
    <div>
      <div className={styles.RepoBoxContainer}>
        <div className={styles.IntroductionContainer}>
          <p>{profile}</p>
        </div>
      </div>
    </div>
  );
};

export default RepoBox;
