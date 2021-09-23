import { useEffect } from "react";
import { useProfileContext } from "../context/ProfileContext";
import styles from "../styles/components/RepoBox.module.scss";

const RepoBox = () => {
  const { profile, setProfile } = useProfileContext();

  useEffect(() => {
    const localStorageUserProfile = localStorage.getItem("@profileBox/profile");

    setProfile(localStorageUserProfile || "");
  }, [setProfile]);

  return (
    <div>
      <div className={styles.RepoBoxContainer}>
        <header>
          <h1>Repositórios GitHub do {profile}.</h1>
        </header>

        <div className={styles.IntroductionContainer}></div>
      </div>
    </div>
  );
};

export default RepoBox;
