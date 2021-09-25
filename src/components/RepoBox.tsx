/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import api from "../services/api";
import styles from "../styles/components/RepoBox.module.scss";

interface reposData {
  name: string;
  description: string;
}

const RepoBox = () => {
  const [repos, setRepos] = useState<reposData[]>([]);
  const [loading, setLoading] = useState(false);

  const localStorageData = localStorage.getItem("@profileBox/profile");

  const history = useHistory();

  useEffect(() => {
    async function HandleGitRepos() {
      setLoading(true);
      try {
        const { data } = await api.get("users/" + localStorageData + "/repos");

        if (localStorageData !== null) {
          setRepos(data);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }

    HandleGitRepos();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (localStorageData === null) {
    history.push("/");

    window.alert("This person does not have a repository.");
  }

  return (
    <div className={styles.RepoContainer}>
      <h1>
        Github Repositories{" "}
        <span>
          {!localStorageData
            ? "This person does not have a name."
            : localStorageData}
        </span>
        .<br></br>
        {repos.length === 0 ? (
          <span className={styles.span}>
            This person does not have a repository!
          </span>
        ) : (
          ""
        )}
      </h1>
      <div className={styles.BoxRepos}>
        <div>
          {repos.map((repos) => {
            return (
              <div className={styles.Repos} key={repos.name}>
                <div className={styles.RepoName}>{repos.name}</div>
                <div className={styles.RepoDescriptions}>
                  {!repos.description
                    ? "The repository has no description"
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
