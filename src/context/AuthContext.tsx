import React from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/lib/firebase-config";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<{ userInfo: User | null }>({
  userInfo: null,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<null | User>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo: user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
