import React, { createContext, useEffect, useState } from "react";
import { db, auth } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useHistory } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState("INIT");
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged(async (fbUser) => {
      if (fbUser == null) {
        return history.push("/");
      }
      const docRef = doc(db, "users", fbUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let docData = docSnap.data();
        setUser({
          ...fbUser,
          userDetails: { uid: docSnap.id, ...docData },
        });
      } else {
        // doc.data() will be undefined in this case
        setUser(fbUser);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
