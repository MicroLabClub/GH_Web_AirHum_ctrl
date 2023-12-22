/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import axios from "axios";
import Icon from "@mui/material/Icon";
import { useState, useEffect } from "react"
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";


// Images
import map from "assets/images/map.png";
import DeleteIcon from '@mui/icons-material/Delete';
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import MDButton from "components/MDButton";
import { Image } from "@mui/icons-material";

export default function data() {
  const [maps, setMaps] = useState([])
  useEffect(() => {
    getMaps();
  }, []);

  async function getMaps() {
    try {
      const response = await axios.get('http://localhost:3001/api/maps/' );
      setMaps(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const something = maps.map((item => {
    return {
      project: <Project image={map} name={item.name} />,
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.date}
        </MDTypography>
      ),
      status: (
        <MDButton>Edit</MDButton>
      ),
      completion: <DeleteIcon fontSize="medium" sx={{cursor: "pointer"}}/>,
      action: (
        <MDTypography component="a" href="#" color="text">
          <Icon>more_vert</Icon>
        </MDTypography>
      ),
    }

  }))


  return {
    columns: [
      { Header: "Name", accessor: "project", width: "30%", align: "left" },
      { Header: "Date", accessor: "budget", align: "left" },
      { Header: "Edit", accessor: "status", align: "center" },
      { Header: "Delete", accessor: "completion", align: "center" },
    ],

    rows: [
      ...something
    ],
  };
}
