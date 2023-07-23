import { navbaropen } from "@/jotai";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { MouseEventHandler } from "react";
import Link from "next/link";

type Props = {
  text: string;
  children: React.ReactNode; // Prop to accept the children elements
  redirectpage: string;
};

const DrawerItems = ({ text, children, redirectpage }: Props) => {
  const [open] = useAtom(navbaropen);

  return (
    <Tooltip placement="right-end" title={!open ? text : ""}>
      <Link href={"/" + redirectpage}>
        <ListItem key={text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {children} {/* Render the children elements here */}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Link>
    </Tooltip>
  );
};

export default DrawerItems;
