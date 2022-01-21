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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
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
  const [Error, setError] = useState("");
  const [hasAccount, sethasAccount] = useState(false);
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };
  const clearError = () => {
    setError("");
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

        //-------------------------------------------------------
      })
      .catch((err) => {
        setOpen(true);
        console.log(err.message);
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-not-found":
          case "auth/wrong-password":
            setError("Invalid Login. Check Password and email");
            break;
          case "auth/user-disabled":
          case "user-disabled":
            setError("Disabled user");
            break;
          case "auth/internal-error":
            setError("Invalid Login. Check Password and email");
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

  const handleForgetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("email sent");
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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
              onKeyDown={(e)=> (e.code === "Enter" ? handleLogin() : null)}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
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
              <Link href="#" onClick={handleForgetPassword}>
                Forget Password ?
              </Link>
            </Typography>
            {/* =========================================================================== */}
            <Collapse in={open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {Error}
              </Alert>
            </Collapse>
            {/* =========================================================================== */}
          </Paper>
        </Grid>
      </div>
    </section>
  );
};

export default HomePage;
