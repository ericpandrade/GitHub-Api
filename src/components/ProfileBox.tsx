import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "../styles/components/ProfileBox.module.scss";

import "../assets/icomoon/style.css";
import { Link } from "react-router-dom";
import { useProfileContext } from "../context/ProfileContext";
interface ApiData {
  name: string;
  avatar_url: string;
  id: number;
  error: string;
}

export function ProfileBox() {
  const { profile, setProfile } = useProfileContext();

  const [gitHubUser, setGitHubUser] = useState({} as ApiData);

  useEffect(() => {
    const localStorageUserProfile = localStorage.getItem("@profileBox/profile");
    const localStorageUserData = localStorage.getItem("@profileBox/gitHubUser");

    setGitHubUser(JSON.parse(localStorageUserData || "{}"));
    setProfile(localStorageUserProfile || "");
  }, [setProfile, setGitHubUser]);

  /* Take the API data and put it into a state */
  async function searchGitHubUser() {
    try {
      const { data } = await api.get(profile);

      localStorage.setItem("@profileBox/profile", profile);
      localStorage.setItem("@profileBox/gitHubUser", JSON.stringify(data));

      setGitHubUser(data);
    } catch {
      window.alert("Coloque um usuário existente, por favor!");
    }
  }

  function imagePath() {
    if (gitHubUser.avatar_url === undefined) {
      return "profile.svg";
    } else {
      return `https://avatars.githubusercontent.com/u/${gitHubUser.id}?v=4`;
    }
  }

  function textPath() {
    if (gitHubUser.name === undefined) {
      return "Search GitHub Profile.";
    } else if (gitHubUser.name === null) {
      return "Essa pessoa não possui um nome.";
    } else {
      return gitHubUser.name;
    }
  }

  return (
    <div className={styles.profileBox}>
      <div className={styles.imageBox}>
        <p>{textPath()}</p>
        <img src={imagePath()} alt="Profile" loading="lazy" />
      </div>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={profile}
          onChange={(event) => setProfile(event.target.value)}
          placeholder="Digite o seu profile do GitHub"
        />
        <button onClick={searchGitHubUser}>Pesquisar</button>
      </div>
      <div className={styles.repoBox}>
        <div>
          <nav>
            <Link to={"/repos"}>
              <button>
                <i className="icon-content_paste" />
                <span> Repositórios </span>
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
