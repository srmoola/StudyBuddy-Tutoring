"use client";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GoogleButton from "react-google-button";
import { Divider } from "@mui/material";
import { signInWithGoogle, signInDisplayName } from "@/features/signin";
import Loading from "@/components/Loading";
import { redirect } from "next/navigation";
import { auth } from "@/firebase";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Created by "}
      <Link
        color="inherit"
        target="_blank"
        href="https://skylinewebstudio.com/"
      >
        Skyline Web Studio
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Home() {
  const [displayname, setdisplayname] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [falseRender, setfalseRender] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setfalseRender(!falseRender), 2000);
  }, []);

  if (auth.currentUser) {
    redirect("/hadap");
  }

  const signInGoogle = () => {
    signInWithGoogle();
  };

  const handleSignIn = async () => {
    if (displayname.length < 1) {
      alert("Please Enter a Display Name");
      return;
    }

    setIsLoading(true);

    try {
      await signInDisplayName(displayname);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!falseRender ? (
        <Loading />
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(/sidepic.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src="/HadapLogo.png"
                sx={{
                  m: 1,
                  backgroundColor: "transparent",
                  height: 96,
                  width: 96,
                }}
              />
              <Typography component="h1" variant="h5">
                StudyBuddy Sign In
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="displayname"
                  label="Display Name"
                  name="displayname"
                  autoComplete="off"
                  onChange={(e) => setdisplayname(e.target.value)}
                  autoFocus
                />

                <Button
                  variant="contained"
                  fullWidth
                  style={{ backgroundColor: "#7c9d24" }}
                  sx={{
                    mt: 3,
                    mb: 2,
                    color: "black",

                    "&:hover": {
                      color: "white",
                    },
                  }}
                  onClick={handleSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Start Learning"}{" "}
                </Button>

                <Divider sx={{ marginTop: "20px" }}>OR</Divider>
                <GoogleButton
                  style={{
                    marginTop: "40px",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#7c9d24",
                  }}
                  onClick={signInGoogle}
                />
                <Copyright sx={{ mt: { xl: 8, md: 10 } }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
