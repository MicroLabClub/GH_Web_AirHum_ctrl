import { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/user-profile/Header";

import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateUser = ({ setState, forceUpdate}) => {
    const [user, setUser] = useState({
        name: "",
        phone: "",
        email: "",
        role: "",
        description: "",
      });


  const id = useParams()
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    phoneError: false,
    roleError: false,
    descriptionError: false,
  });

  async function getUser() {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${id.id}`);
      setUser(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(()=> {
    getUser()
  },[])

    const changeHandler = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    };

  const submitHandler = (e) => {
      e.preventDefault()
      try {
          axios.put('http://localhost:3001/api/users/', {...user, id:id.id});
        } catch (error) {
          console.error(error);
        }
  }

  const navigate = useNavigate()

  const goBackHandler = () => {
    navigate(-1)
  };


  return (
    <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70%"}}>
      <DashboardLayout>
        <Header name="NewMap">
          <MDBox
            component="form"
            role="form"
            onSubmit={submitHandler}
            display="flex"
            flexDirection="column"
          >
            <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                mr={2}
              >
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  Name
                </MDTypography>
                <MDBox mb={2} width="100%">
                  <MDInput
                    type="name"
                    fullWidth
                    name="name"
                    value={user.name}
                    placeholder="name"
                    onChange={changeHandler}
                  />
                  {errors.nameError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The name can not be null
                    </MDTypography>
                  )}

                </MDBox>
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                ml={2}
              >
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  Phone
                </MDTypography>
                <MDBox mb={1} width="100%">
                  <MDInput
                    type="number"
                    fullWidth
                    name="phone"
                    placeholder="phone"
                    value={user.phone}
                    onChange={changeHandler}
                    error={errors.phoneError}
                  />
                  {errors.phoneError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The phone must be valid
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
            </MDBox>

            <MDBox display="flex" flexDirection="column" mb={3}>
              <MDBox display="flex" flexDirection="row">
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  width="100%"
                  mr={2}
                >
                  <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  Email
                  </MDTypography>
                  <MDBox mb={2} width="100%">
                    <MDInput
                      type="text"
                      fullWidth
                      name="email"
                      placeholder="email"
                      value={user.email}
                      onChange={changeHandler}
                    />
                    {errors.emailError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The email must be valid
                      </MDTypography>
                    )}
                  </MDBox>
                </MDBox>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  width="100%"
                  ml={2}
                >
                  <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                    Role
                  </MDTypography>
                  <MDBox mb={1} width="100%">
                    <MDInput
                      type="text"
                      fullWidth
                      name="role"
                      placeholder="role"
                      value={user.role}
                      onChange={changeHandler}
                    />
                    {errors.roleError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The role must be valid
                      </MDTypography>
                    )}
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="column" mb={3}>
              <MDBox display="flex" flexDirection="row">
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  width="100%"
                  mr={2}
                >
                  <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                    Description
                  </MDTypography>
                  <MDBox mb={2} width="100%">
                    <MDInput
                      type="text"
                      fullWidth
                      name="description"
                      placeholder="description"
                      value={user.description}
                      onChange={changeHandler}
                    />
                    {errors.descriptionError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The description must be valid
                      </MDTypography>
                    )}
                  </MDBox>
                </MDBox>

              </MDBox>
              <MDBox mt={4} display="flex" justifyContent="end">
                <Button onClick={()=> goBackHandler()} variant="contained" style={{color: "white"}} type="submit">
                Update User
                </Button>
              </MDBox>
            </MDBox>
          </MDBox>
        </Header>
      </DashboardLayout>
    </Box>

  );
};

export default UpdateUser;
