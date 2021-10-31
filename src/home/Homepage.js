import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Link from "@mui/material/Link";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../firebase/Firebase";

//-----------------------------------------------------------------------------------
import { doc, getDoc } from "firebase/firestore";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
//-----------------------------------------------------------------------------------

const HomePage = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordlError] = useState("");
  const [hasAccount, sethasAccount] = useState(false);

  const history = useHistory();

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };
  const clearError = () => {
    setEmailError("");
    setPasswordlError("");
  };

  const handleLogin = () => {
    clearError();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //----------------------------------------------------------------
        const user = userCredential.user;
        console.log(user.uid);
        getDoc(doc(db, "users", user.uid)).then((doc) => {
          switch (doc.data().type) {
            case "student":
              history.push("/student-view");
              break;
            case "teacher":
              history.push("/dashboard");
              break;
            case "admin":
              history.push("/add-user");
              break;
            default:
              history.push("/");
              break;
          }
        });
        //----------------------------------------------------------------

        //history.push("/student");

        // ...
        //--------------------------------------------------------
        // db.collection("users")
        //   .doc(user.uid)
        //   .getDoc()
        //   .then((doc) => {
        //     console.log(doc.data().type);
        //     switch (doc.data().type) {
        //       case "student":
        //         history.push("/student");
        //         break;
        //       case "Teacher":
        //         history.push("/dashboard");
        //         break;
        //       case "ADMIN":
        //         history.push("/admin");
        //         break;
        //       default:
        //         history.push("/");
        //         break;
        //     }
        //   });

        //console.log("doc data" + getDoc(doc(db, "users", "user.uid")).data());

        //-------------------------------------------------------
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wring-password":
            setPasswordlError(err.message);
            break;
          default:
            history.push("/");
            break;
        }
      });
  };

  const authListner = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        clearInput();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListner();
  }, []);

  const paperStyle = {
    padding: 20,
    height: "65vh",
    width: 400,
    margin: "50px auto",
    position: "relative",
    overflow: "hidden",
  };
  const avatarStyle = {
    backgroundColor: "rgb(217 7 113)",
  };
  const marginStyle = {
    margin: "12px 0",
  };

  return (
    <section id="hero">
      <div className="container">
        <Grid>
          {/* box with a shadow */}
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlined />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <TextField
              label="Email"
              placeholder="Enter Email"
              type="email"
              fullWidth
              required
              style={marginStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextField
              label="Password"
              placeholder="Enter Password"
              type="password"
              fullWidth
              required
              style={marginStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <p>{passwordError} </p>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              style={marginStyle}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Typography style={marginStyle}>
              <Link href="#">Forget Password ?</Link>
            </Typography>
          </Paper>
        </Grid>
      </div>
    </section>
  );
};

export default HomePage;
