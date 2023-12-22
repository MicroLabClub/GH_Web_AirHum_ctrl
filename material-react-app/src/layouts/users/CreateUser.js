import { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/user-profile/Header";
import Button from "@mui/material/Button";

import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateUser = ({ setState, forceUpdate}) => {
    const [newUser, setNewUser] = useState({
        name: "",
        phone: "",
        email: "",
        role: "",
        description: "",
      });
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    phoneError: false,
    roleError: false,
    descriptionError: false,
  });

    const changeHandler = (e) => {
      setNewUser({
        ...newUser,
        [e.target.name]: e.target.value,
      });
    };

  const submitHandler = (e) => {
      e.preventDefault()
      try {
          axios.post('http://localhost:3001/api/users/', {...newUser});
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
                    value={newUser.name}
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
                    value={newUser.phone}
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
                      value={newUser.email}
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
                      value={newUser.role}
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
                      value={newUser.description}
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
                Create User
                </Button>
              </MDBox>
            </MDBox>
          </MDBox>
        </Header>
      </DashboardLayout>
    </Box>

  );
};

export default CreateUser;
