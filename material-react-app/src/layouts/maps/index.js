import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from "examples/Footer";

import map from "../../assets/images/map.png"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import Tables from "layouts/tables";
import Icon from "@mui/material/Icon";
import MDAvatar from "components/MDAvatar";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import CreateMap from "./CreateMap";
import UpdateMap from "./UpdateMap";
import { Link, Route, Routes } from "react-router-dom";


const Maps = () => {

  const [maps, setMaps] = useState([])
  const [edit, setEdit] = useState({ state: false, id: null })
  const [toggleForm, setToggleForm] = useState(false)
  const [update, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    getMaps();
  }, [update]);


  const deleteMap = (id) => {
    axios.delete(`http://localhost:3001/api/maps/${id}`);
    forceUpdate()
  }

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const rows = maps.map((item => {
    return {
      project: <Project image={map} name={item.name} />,
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.date}
        </MDTypography>
      ),
      status: (
        <Button sx={{ color: "#7b809a", "&:hover": { color: "#7b809a" }, }} onClick={() => setEdit({ state: true, id: item.map_id })}>Edit</Button>
      ),
      completion: <Box onClick={() => deleteMap(item.map_id)}><DeleteIcon fontSize="medium" sx={{ cursor: "pointer" }} /></Box>,
      action: (
        <MDTypography component="a" href="#" color="text">
          <Icon>more_vert</Icon>
        </MDTypography>
      ),
    }
  }))

  const columns = [
    { Header: "Name", accessor: "project", width: "30%", align: "left" },
    { Header: "Date", accessor: "budget", align: "left" },
    { Header: "Edit", accessor: "status", align: "center" },
    { Header: "Delete", accessor: "completion", align: "center" },
  ]

  async function getMaps() {
    try {
      const response = await axios.get('http://localhost:3001/api/maps/');
      setMaps(response.data)
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      <DashboardLayout>
          <Tables rowsData={rows} name={{ name: "Maps", nameBtn: "New Map", route: "/CreateMap" }} columns={columns} func={setToggleForm} />
        <MDBox mb={2} />
      </DashboardLayout>
      {edit.state === true && <UpdateMap id={edit.id} getMaps={getMaps} setState={setEdit} forceUpdate={forceUpdate} />}
    </Box>
  );
};

export default Maps;
