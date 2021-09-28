import React, { createContext, useEffect, useState } from "react";
import { db, auth } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState("INIT");

  useEffect(() => {
    auth.onAuthStateChanged(async (fbUser) => {
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
