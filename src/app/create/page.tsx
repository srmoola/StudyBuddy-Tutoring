"use client";
import NavbarDrawer from "@/components/NavbarDrawer";
import { lessonList, navbaropen } from "@/jotai";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import LoadingDialog from "@/components/LoadingDialog";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import ListIcon from "@mui/icons-material/List";
import { redirect } from "next/navigation";

const lessonListRef = collection(firestore, "Lessons");

const Create = () => {
  const [open] = useAtom(navbaropen);
  const [usermessage, setusermessage] = useState<string>("");
  const [chatGptResponse, setChatGptResponse] = useState<string | null>(null);
  const [dialogopen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageList, setmessageList] = useAtom(lessonList);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      redirect("/");
    }
  }, []);

  const handleListItemClick = (lesson: any) => {
    setSelectedLesson(lesson);
  };

  const handleClose = () => {
    setOpen(false);
    setChatGptResponse(null);
  };

  useEffect(() => {
    const q = query(lessonListRef, orderBy("timestamp"));
    const getMessages = onSnapshot(q, (user: { docs: any[] }) => {
      let updatedUsers: any[] = [];
      user.docs.forEach((doc: { data: () => any; id: any }) => {
        updatedUsers.push({ ...doc.data(), id: doc.id });
      });
      setmessageList(updatedUsers);
    });

    return () => getMessages(); // Cleanup the listener when component unmounts
  }, []);

  const [messages, setMessages] = useState<any>([
    {
      message: "",
      sentTime: "just now",
      sender: "Hadap Tutoring",
    },
  ]);

  const handleSend = async (message: any) => {
    setLoading(true);

    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.

    const chatgptlesson = await processMessageToChatGPT(newMessages);

    setChatGptResponse(chatgptlesson);
    setOpen(true);
    setLoading(false);

    await addDoc(lessonListRef, {
      userEmail: auth.currentUser?.email,
      displayName: auth.currentUser?.displayName,
      title: usermessage,
      lesson: chatgptlesson,
      timestamp: serverTimestamp(),
    });
  };

  async function processMessageToChatGPT(chatMessages: any[]) {
    const systemMessage = {
      role: "system",
      content:
        "Ignore all previous instructions. You are a tutor that helps teach students who are planning on learning specific subjects. This of course reflects the way you respond to the user by ALWAYS using a typical teacher / tutor style response. The user will send a specific subject or topic they want to learn and you will teach and help the user understand the subject to the fullest. Create a unit based curriculum for them based off the provided subject and NEVER respond with the curriculum. Start off by teaching the user all the lessons in the first unit. Go in depth and don't just list objectives. Actually teach the content of the lesson like a teacher would to a student. NEVER list the topics that need to be covered, you will need to actually teach them in depth to the user. You have a lot of experience in creating curriculum and teaching lessons to kids. This can be across a wide variety of subjects. You help kids understand the subjects they need guidance in. The subject I want you to cover is " +
        usermessage,
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_OPENAI,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    const data = await response.json();

    return data.choices[0].message.content;
  }

  const mainBoxStyle = {
    transition: "0.5s ease",
    position: "absolute",
    top: 65,
    left: open ? 175 : 65,
    right: 0, // Set right to 0 to make the Box stop at the right wall of the window
    backgroundColor: "#FFFBFE",
    height: "100%",
    display: "grid",
    placeItems: "center",
  };

  return (
    <>
      <Container className="overflow-x-hidden">
        <NavbarDrawer />
        <Box sx={mainBoxStyle}>
          <Box sx={{ maxWidth: "75%" }}>
            <Grid container spacing={2}>
              <Grid item md={10} xs={12}>
                <TextField
                  variant="standard"
                  className="mt-2 mr-2"
                  id="outlined-multiline-flexible"
                  label="Learn something new today..."
                  multiline
                  fullWidth
                  color="success"
                  inputProps={{ maxLength: 200, color: "black" }}
                  InputLabelProps={{ style: { color: "black" } }}
                  sx={{ "& .MuiInputBase-input": { color: "black" } }}
                  onChange={(e) => setusermessage(e.target.value)}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Button
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#6a994e",
                    fontSize: "18px",
                  }}
                  variant="contained"
                  fullWidth
                  className="h-full mt-1"
                  onClick={() => handleSend(usermessage)}
                >
                  Create
                </Button>
              </Grid>
              <Grid className="mt-10" item md={12} xs={12}>
                <Typography variant="h3">
                  <ListIcon sx={{ width: 64, height: 64, mb: 1 }} />
                  All Lessons
                </Typography>
                <List>
                  {messageList.map(
                    (lesson: {
                      displayName: string;
                      userEmail: string;
                      title: string;
                      id: React.Key | null | undefined;
                      lesson: any;
                    }) => {
                      return (
                        <ListItem
                          key={lesson.id}
                          disablePadding
                          sx={{
                            display: "block",
                            height: "fit-content",
                            overflowY: "scroll",
                          }}
                          onClick={() => handleListItemClick(lesson)}
                        >
                          <ListItemButton>
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                              }}
                            >
                              <PlayLessonIcon />
                            </ListItemIcon>
                            <ListItemText
                              className="ml-2"
                              primary={
                                lesson.title +
                                " Lesson by " +
                                lesson.displayName
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    }
                  )}
                </List>
              </Grid>
              {chatGptResponse && (
                <Dialog
                  open={dialogopen}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{usermessage + " Lesson Preview"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-slide-description"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {chatGptResponse}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>
              )}
              <Dialog open={loading} aria-labelledby="loading-dialog-title">
                <LoadingDialog usermessage={usermessage} />
              </Dialog>
            </Grid>
          </Box>
        </Box>
      </Container>
      {selectedLesson && (
        <Dialog
          open={true} // Change this to `open={Boolean(selectedLesson)}` to conditionally open the dialog
          onClose={() => setSelectedLesson(null)}
          aria-describedby="lesson-dialog-description"
        >
          <DialogTitle>
            {selectedLesson.title + " Lesson by " + selectedLesson.displayName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="lesson-dialog-description"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {selectedLesson.lesson}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedLesson(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Create;
