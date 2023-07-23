import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuizIcon from "@mui/icons-material/Quiz";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { auth } from "@/firebase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { logout } from "@/features/signin";
import { redirect } from "next/navigation";
import { useAtom } from "jotai";
import { navbaropen } from "@/jotai";
import DrawerItems from "./DrawerItems";

const drawerWidth = 175;
const navHeight = 65;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#A7C957",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,

  background: "#6A994E",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#6A994E",
  height: navHeight,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    backgroundColor: "#6A994E",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavbarDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useAtom(navbaropen);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar
            onClick={() => window.location.reload()}
            onDragStart={(e) => e.preventDefault()}
            src="/HadapLogo.png"
            sx={{
              m: 1,
              backgroundColor: "transparent",
              height: 48,
              width: 48,
              cursor: "pointer",
            }}
          />
          <Typography
            onClick={() => window.location.reload()}
            onDragStart={(e) => e.preventDefault()}
            sx={{ color: "#22223b", cursor: "pointer" }}
            variant="h6"
            noWrap
            component="div"
          >
            StudyBuddy
          </Typography>

          <Avatar
            src={auth.currentUser?.photoURL || ""}
            sx={{
              ml: "auto",
              mr: "10px",
              backgroundColor: "transparent",
              height: 48,
              width: 48,
              cursor: "pointer",
            }}
            onClick={handleMenuOpen}
            onDragStart={(e) => e.preventDefault()}
          />

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          <DrawerItems redirectpage="" text="Dashboard">
            <DashboardIcon />
          </DrawerItems>

          <DrawerItems redirectpage="quizzes" text="Quizzes">
            <QuizIcon />
          </DrawerItems>

          <DrawerItems redirectpage="chat" text="Chat">
            <ChatIcon />
          </DrawerItems>
          <DrawerItems redirectpage="create" text="Create">
            <AddIcon />
          </DrawerItems>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
