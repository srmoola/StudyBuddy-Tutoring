import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Skeleton,
} from "@mui/material";
import React from "react";

type Props = {
  usermessage: string;
};

const LoadingDialog = ({ usermessage }: Props) => {
  return (
    <>
      <DialogTitle id="loading-dialog-title">
        Hadap is Processing {usermessage} Request
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Skeleton variant="text" sx={{ width: 500, fontSize: "1rem" }} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
        </DialogContentText>
      </DialogContent>
    </>
  );
};

export default LoadingDialog;
