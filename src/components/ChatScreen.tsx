import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextInput from "./TextInput";
import LeftBubble from "./LeftBubble";
import RightBubble from "./RightBubble";
import { auth, firestore } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

const messageDatabase = collection(firestore, "Messages");

const ChatScreen = () => {
  const [messageList, setmessageList] = useState<any>([]);
  const autoscroll = useRef<any>();
  const scrollToBottom = () => {
    autoscroll.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    if (autoscroll.current) {
      scrollToBottom();
    }
  }, [messageList]);

  useEffect(() => {
    const q = query(messageDatabase, orderBy("timestamp"));
    const getMessages = onSnapshot(q, (user: { docs: any[] }) => {
      let updatedUsers: any[] = [];
      user.docs.forEach((doc: { data: () => any; id: any }) => {
        updatedUsers.push({ ...doc.data(), id: doc.id });
      });
      setmessageList(updatedUsers);
    });

    return () => getMessages(); // Cleanup the listener when component unmounts
  }, []);

  return (
    <>
      <Container
        sx={{
          display: { xl: "flex", lg: "flex", md: "flex", xs: "flex" },
          justifyContent: "right",

          marginLeft: { xl: "390px", xs: "0px" },
          transitionProperty: "background-color, color",
          transitionDuration: "0.3s",
          transitionTimingFunction: "linear",
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            height: "100vh",
            width: "100vw",

            marginRight: { xl: "10%", xs: "0%" },

            transitionProperty: "background-color, color",
            transitionDuration: "0.3s",
            transitionTimingFunction: "linear",
          }}
        >
          <Box
            sx={{
              position: "relative",

              height: { md: "650px", xl: "825px" },
              width: "100%",
              color: "white",
              bottom: "7.5%",
              overflowY: "scroll",
              transitionProperty: "background-color, color",
              transitionDuration: "0.3s",
              transitionTimingFunction: "linear",
            }}
          >
            <Box
              sx={{
                position: "relative",
                bottom: "7.5%",

                height: "fit-content",
                width: "100%",
                color: "white",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div className="spacing"></div>
              {messageList.map(
                (message: {
                  senderemail: string;
                  text: string;
                  senderimageurl: string;
                  sender: string;
                  realtime: string;
                  id: string;
                }) =>
                  message.senderemail === auth.currentUser?.email ? (
                    <RightBubble key={message.id} text={message.text} />
                  ) : (
                    <LeftBubble
                      key={message.id}
                      text={message.text}
                      image={message.senderimageurl}
                      name={message.sender}
                      time={message.realtime}
                    />
                  )
              )}
              <TextInput />
            </Box>
            <div ref={autoscroll}></div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ChatScreen;
