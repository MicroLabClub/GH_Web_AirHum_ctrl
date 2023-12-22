import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from "examples/Footer";

import user from "../../assets/images/user.jpg"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import Tables from "layouts/tables";
import Icon from "@mui/material/Icon";
import MDAvatar from "components/MDAvatar";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import { Link } from "react-router-dom";


const Users = () => {
  const [users, setUsers] = useState([])
  const [edit, setEdit] = useState({ state: false, id: null })
  const [toggleForm, setToggleForm] = useState(false)
  const [update, forceUpdate] = useReducer(x => x + 1, 0);
  const [errors, setErrors] = useState({
    zoom: false,
    centerLat: false,
    centerLng: false,
    centnameerLng: false,
  });

  useEffect(() => {
    getUsers();
  }, [update]);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/api/users/${id}`);
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

  const rows = users.map((item => {
    return {
      name: <Project image={user} name={item.name} />,
      phone: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.phone}
        </MDTypography>
      ),
      email: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {item.email}
      </MDTypography>
      ),
      role: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {item.role}
      </MDTypography>
      ),
      description: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {item.description}
      </MDTypography>
      ),
      edit: <Link to={`/UpdateUser/${item.user_id}`}> <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      Edit
    </MDTypography></Link>,
      delete: <Box onClick={() => deleteUser(item.user_id)}><DeleteIcon fontSize="medium" sx={{ cursor: "pointer" }} /></Box>
    }
  }))

  console.log(users);

  const columns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Phone", accessor: "phone", align: "left" },
    { Header: "Email", accessor: "email", align: "center" },
    { Header: "Role", accessor: "role", align: "center" },
    { Header: "Description", accessor: "description", align: "center" },
    { Header: "Edit", accessor: "edit", align: "center" },
    { Header: "Delete", accessor: "delete", align: "center" },
  ]

  async function getUsers() {
    try {
      const response = await axios.get('http://localhost:3001/api/users/');
      setUsers(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{position: "relative", height: "100vh"}}>
      <DashboardLayout>
        <MDBox mb={2} />
        <Tables rowsData={rows} name={{name: "Users", nameBtn: "New User", route: "/CreateUser"}} columns={columns} func={setToggleForm}/>
        {toggleForm && <CreateUser setState={setToggleForm} forceUpdate={forceUpdate}/>}
        </DashboardLayout>
    </Box>
  );
};

export default Users;
