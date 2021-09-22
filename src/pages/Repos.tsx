import RepoBox from "../components/RepoBox";
import styles from "../styles/BodyProfile.module.scss";

const Repos = () => {
  return (
    <div className={styles.containerBody}>
      <RepoBox />
    </div>
  );
};

export default Repos;
