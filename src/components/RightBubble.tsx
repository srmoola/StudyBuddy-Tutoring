import Box from "@mui/material/Box";

type Props = {
  text: string;
};

const RightBubble = ({ text }: Props) => {
  return (
    <Box sx={{ backgroundColor: "#1982FC" }} className="bubble right">
      {text}
    </Box>
  );
};

export default RightBubble;
