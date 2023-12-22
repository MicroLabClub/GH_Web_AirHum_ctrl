import styled from "@emotion/styled";
import { TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import MDBox from "components/MDBox";

export const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "rgb(75 70 159 / 16%)"
    },
    "&:last-child td, &:last-child th": {
      border: 0
    },
  }));

  export const StyledButton = styled(Button)(() => ({
    backgroundColor: "white",
    color: "#7b809a",
    fontSize: "15px",
    textTransform: "none",
    "&:hover": {
      color: "black"
    },
    "&:focus:not(:hover)": {
      backgroundColor: "rgba(0, 0, 0, 0.87)",
    },
  }));

  export  const FormMap = styled(MDBox)(() => ({
    width: "1000px",
    position: "absolute",
    padding: "50px 30px",
    top: "50%",
    left: "50%",
    backgroundColor: "rgba(33 42 47)",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px"
  }));

export const FormInput = styled(TextField)(() => ({
    width: "100%",
    backgroundColor: "white",
    borderRadius: "7px",
    "&:focus": {
      border: "1px solid yellow"
    }
  }));