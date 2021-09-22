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
  const [imagePath, setImagePath] = useState("");
  const [state, setState] = useState(true);

  /* Change the image according to the user */
  useEffect(() => {
    function changeImagePath() {
      if (!state) {
        setImagePath(
          `https://avatars.githubusercontent.com/u/${gitHubUser.id}?v=4}`
        );
      } else {
        setImagePath("profile.svg");
      }
    }

    changeImagePath();
  }, [state, gitHubUser.id]);

  /* Take the API data and put it into a state */
  async function searchGitHubUser() {
    try {
      const { data } = await api.get(profile);
      setGitHubUser(data);
      setState(false);
    } catch {
      window.alert("Coloque um usuário existente, por favor.");
    }
  }

  return (
    <div className={styles.profileBox}>
      <div className={styles.imageBox}>
        <p>{state ? "Search GitHub" : gitHubUser.name}</p>
        <img src={imagePath} alt="Profile" loading="lazy" />
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
