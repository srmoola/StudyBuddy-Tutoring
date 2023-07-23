import { auth } from "@/firebase";
import { Box } from "@mui/material";
import React from "react";
import Typewriter from "typewriter-effect";

const TypingName = () => {
  return (
    <Box className="w-full h-40 mt-5 text-6xl flex justify-center items-center">
      <Box className="bg-white p-3 shadow-2xl rounded-lg text-text">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "Hello " +
                  auth.currentUser?.displayName +
                  ", check out your updates today"
              )
              .pauseFor(1000)
              .start();
          }}
        />
      </Box>
    </Box>
  );
};

export default TypingName;
