import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";

type Props = {
  title: string;
};

const Titles = ({ title }: Props) => {
  return (
    <List>
      <ListItem
        disablePadding
        sx={{
          color: "white",
        }}
      >
        <ListItemButton>
          <ListItemText>
            <Typography variant="h4">{title}</Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default Titles;
