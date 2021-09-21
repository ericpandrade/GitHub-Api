import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "../styles/components/ProfileBox.module.scss";

interface ApiDataProps {
  data?: string[];
  name?: string;
  avatar_url?: string;
  id?: number;
}

export function ProfileBox() {
  const [profile, setProfile] = useState("");
  const [gitHubUser, setGitHubUser] = useState({} as ApiDataProps);
  const [imagePath, setImagePath] = useState("");
  const [state, setState] = useState(true);

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

  async function searchGitHubUser() {
    const { data } = await api.get(profile);
    setGitHubUser(data);
    setState(false);
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
    </div>
  );
}
