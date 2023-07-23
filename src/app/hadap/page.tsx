"use client";
import NavbarDrawer from "@/components/NavbarDrawer";
import TypingName from "@/components/TypingName";
import { auth, firestore } from "@/firebase";
import { lessonList, navbaropen, quizList } from "@/jotai";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import { query, orderBy, onSnapshot, collection } from "firebase/firestore";
import Titles from "@/components/Titles";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SidebarSkeleton from "@/components/SidebarSkeleton";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sun",
    Lessons: 3,
    Quizzes: 2,
    amt: 2400,
  },
  {
    name: "Mon",
    Lessons: 6,
    Quizzes: 4,
    amt: 2210,
  },
  {
    name: "Tue",
    Lessons: 3,
    Quizzes: 3,
    amt: 2290,
  },
  {
    name: "Thurs",
    Lessons: 4,
    Quizzes: 1,
    amt: 2000,
  },
  {
    name: "Fri",
    Lessons: 5,
    Quizzes: 3,
    amt: 2181,
  },
  {
    name: "Sat",
    Lessons: 5,
    Quizzes: 2,
    amt: 2100,
  },
];

const lessonListRef = collection(firestore, "Lessons");
const quizListRef = collection(firestore, "Quizzes");
const userListRef = collection(firestore, "Users");

const Hadap = () => {
  const [open] = useAtom(navbaropen);
  const [messageList, setmessageList] = useAtom(lessonList);
  const [quizzesList, setquizzesList] = useAtom(quizList);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoaded, setisLoaded] = useState(false);

  const handleListItemClick = (lesson: any) => {
    setSelectedLesson(lesson);
  };

  const boxScrollStyle = {
    overflowY: "scroll",
    scrollbarWidth: "thin", // Set the width of the scrollbar
    "&::-webkit-scrollbar": {
      width: "8px", // Set the width of the scrollbar for webkit browsers
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#6a994e", // Set the color of the scrollbar thumb
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#547b3b", // Set the color of the scrollbar thumb on hover
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#231F20", // Set the color of the scrollbar track
    },
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

  useEffect(() => {
    const q = query(quizListRef, orderBy("timestamp"));
    const getMessages = onSnapshot(q, (user: { docs: any[] }) => {
      let updatedUsers: any[] = [];
      user.docs.forEach((doc: { data: () => any; id: any }) => {
        updatedUsers.push({ ...doc.data(), id: doc.id });
      });
      setquizzesList(updatedUsers);
    });

    return () => getMessages(); // Cleanup the listener when component unmounts
  }, []);

  useEffect(() => {
    const q = query(userListRef, orderBy("timestamp", "desc"));
    const getUsers = onSnapshot(q, (user) => {
      let updatedUsers: any[] = [];
      user.docs.forEach((doc) => {
        updatedUsers.push({ ...doc.data(), id: doc.id });
      });
      setUsers(updatedUsers);
    });

    setTimeout(() => {
      setisLoaded(true);
    }, 2000);

    return () => getUsers(); // Cleanup the listener when component unmounts
  }, []);

  const mainBoxStyle = {
    transition: "0.5s ease",
    position: "absolute",
    top: 65,
    left: open ? 175 : 65,
    right: 0, // Set right to 0 to make the Box stop at the right wall of the window
    backgroundColor: "#231F20",
    height: "fit-content",
  };

  useEffect(() => {
    if (!auth.currentUser) {
      redirect("/");
    }
  }, []);

  return (
    <>
      <Container className="overflow-x-hidden">
        <NavbarDrawer />
        <Box sx={mainBoxStyle}>
          <Container className="mt-5">
            <Grid className="mb-10" container spacing={2}>
              <Grid item xs={12}>
                <TypingName />
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className="bg-white h-96 rounded-lg" sx={boxScrollStyle}>
                  <Titles title="Lessons for You" />

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
                              color: "white",
                            }}
                            onClick={() => handleListItemClick(lesson)}
                          >
                            <ListItemButton>
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                }}
                              >
                                <PlayLessonIcon sx={{ color: "white" }} />
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
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className="bg-white h-96 rounded-lg" sx={boxScrollStyle}>
                  <Titles title="Quizzes for You" />
                  <List>
                    {quizzesList.map(
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
                              color: "white",
                            }}
                            onClick={() => handleListItemClick(lesson)}
                          >
                            <ListItemButton>
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                }}
                              >
                                <AssignmentIcon sx={{ color: "white" }} />
                              </ListItemIcon>
                              <ListItemText
                                className="ml-2"
                                primary={
                                  lesson.title +
                                  " Quiz by " +
                                  lesson.displayName
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      }
                    )}
                  </List>
                </Box>
              </Grid>
              <Grid item md={4} xs={12}>
                <Box className="bg-white h-96 rounded-lg" sx={boxScrollStyle}>
                  <Titles title="Tutors Available" />
                  <List
                    dense
                    sx={{
                      width: "100%",
                      marginTop: "0px",
                    }}
                  >
                    {!isLoaded ? (
                      <SidebarSkeleton userListLength={users} />
                    ) : (
                      users.map((value) => {
                        return (
                          <Box key={value.id}>
                            <ListItem disablePadding>
                              <ListItemAvatar sx={{ ml: 1.5 }}>
                                <Avatar
                                  alt={`Avatar n°${value + 1}`}
                                  src={value.photoUrl}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                className="text-text"
                                primary={value.name}
                              ></ListItemText>
                            </ListItem>
                            <Divider
                              sx={{
                                marginTop: "5px",
                                marginBottom: "5px",
                              }}
                            />
                          </Box>
                        );
                      })
                    )}
                  </List>
                </Box>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box className="bg-white h-100 rounded-lg">
                  <Titles title="Progress" />
                  <ResponsiveContainer width="90%" aspect={2}>
                    <BarChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <ReferenceLine y={6} stroke="red" strokeDasharray="4 4" />
                      <Bar dataKey="Lessons" stackId="a" fill="#8884d8" />
                      <Bar dataKey="Quizzes" stackId="a" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          </Container>
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

export default Hadap;
