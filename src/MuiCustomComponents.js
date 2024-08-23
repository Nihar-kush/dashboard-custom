import { Button, styled } from "@mui/material";

export const BtnPrimary = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  border: "1px solid",
  backgroundColor: "#14147d",
  borderColor: "#14147d",
  "&:hover": {
    backgroundColor: "#0d0d4e",
    borderColor: "#0d0d4e",
    boxShadow: "none",
  },
});

export const BtnSecondary = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  border: "1px solid",
  borderColor: "darkblue",
  color: "darkblue",
  "&:hover": {
    backgroundColor: "#d4d4ff55",
    borderColor: "#14147d",
  },
});

export const BtnGrey = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  border: "2px dotted",
  borderColor: "#d5dadf",
  backgroundColor: "#ffffff",
  color: "#7a8891",
  "&:hover": {
    backgroundColor: "#dbe3ec63",
    boxShadow: "none",
    textTransform: "none",
    border: "2px solid",
    borderColor: "#d5dadf",
    color: "#7a8891",
  },
});
