import { useEffect, useState } from "react";

import { useProfileContext } from "../context/ProfileContext";
import api from "../services/api";
import styles from "../styles/components/RepoBox.module.scss";

interface reposData {
  name: string;
  description: string;
}

const RepoBox = () => {
  const { profile, setProfile } = useProfileContext();
  const [repos, setRepos] = useState<reposData[]>([]);

  useEffect(() => {
    const localStorageUserProfile = localStorage.getItem("@profileBox/profile");

    setProfile(localStorageUserProfile || "");
  }, [setProfile]);

  useEffect(() => {
    async function handleGitRepos() {
      const { data } = await api.get("users/" + profile + "/repos");

      setRepos(data);
    }

    handleGitRepos();
  }, [profile]);

  return (
    <div className={styles.RepoContainer}>
      <h1>
        Repositórios GitHub do <span>{profile}</span>.<br></br>
        {repos.length === 0 ? (
          <span className={styles.span}>
            Essa pessoa não possui um repositório!
          </span>
        ) : (
          ""
        )}
      </h1>
      <div className={styles.BoxRepos}>
        <div>
          {repos.map((repos) => {
            return (
              <div className={styles.Repos}>
                <div className={styles.RepoName}>{repos.name}</div>
                <div className={styles.RepoDescriptions}>
                  {!repos.description
                    ? "O repositório não possui descrição"
                    : repos.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RepoBox;
