import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton/Skeleton";

type Props = {
  userListLength: Array<string>;
};

const SidebarSkeleton = ({ userListLength }: Props) => {
  return userListLength.map(() => {
    return (
      <div key={crypto.randomUUID()}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemAvatar>
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            </ListItemAvatar>
            <Skeleton
              animation="wave"
              variant="text"
              width={150}
              sx={{ fontSize: "1.5rem" }}
            />
          </ListItemButton>
        </ListItem>
        <Divider
          sx={{
            backgroundColor: "black",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        />
      </div>
    );
  });
};

export default SidebarSkeleton;
