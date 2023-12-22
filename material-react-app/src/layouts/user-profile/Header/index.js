import PropTypes from "prop-types";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

function Header({ children }) {

  return (
    <MDBox position="relative" mb={5}>
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 0,
          py: 0,
          px: 2,
          boxShadow: "-2px 4px 4px -2px rgba(0,0,0,0.75);"

        }}
      >
        {children}
      </Card>
    </MDBox>
  );
}

Header.defaultProps = {
  children: "",
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
