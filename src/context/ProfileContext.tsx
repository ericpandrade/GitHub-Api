import { createContext, ReactNode, useContext, useState } from "react";

type ProfileContextType = {
  profile: string;
  setProfile: (profile: string) => void;
};

interface ProfileContextProps {
  children: ReactNode;
}

const ProfileContext = createContext({} as ProfileContextType);

const ProfileContextProvider = ({ children }: ProfileContextProps) => {
  const [profile, setProfile] = useState("");

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  const context = useContext(ProfileContext);

  return context;
};

export { ProfileContextProvider, useProfileContext };
