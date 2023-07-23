"use client";
import ChatScreen from "@/components/ChatScreen";
import NavbarDrawer from "@/components/NavbarDrawer";
import { auth } from "@/firebase";
import { navbaropen } from "@/jotai";
import { Box, Container } from "@mui/material";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Chat = () => {
  const [open] = useAtom(navbaropen);

  const mainBoxStyle = {
    transition: "0.5s ease",
    position: "absolute",
    top: 65,
    left: open ? 175 : 65,
    right: 0, // Set right to 0 to make the Box stop at the right wall of the window
    backgroundColor: "#231F20",
    height: "100%",
  };

  useEffect(() => {
    if (!auth.currentUser) {
      redirect("/");
    }
  }, []);

  return (
    <Container className="overflow-x-hidden">
      <NavbarDrawer />
      <Box sx={mainBoxStyle}>
        <ChatScreen />
      </Box>
    </Container>
  );
};

export default Chat;
