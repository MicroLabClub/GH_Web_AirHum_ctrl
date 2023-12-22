import { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/user-profile/Header";

import { Box } from "@mui/material";
import { StyledButton } from "./styles";

const CreateMap = ({id, setState, forceUpdate}) => {
    const [newMap, setNewMap] = useState({
        zoom: "",
        centerLat: "",
        centerLng: "",
        name: "",
      });
  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    newPassError: false,
    confirmPassError: false,
  });

  const [map, setMap] = useState({})


    const changeHandler = (e) => {
      setNewMap({
        ...newMap,
        [e.target.name]: e.target.value,
      });
    };

  const submitHandler = (e) => {
      e.preventDefault()
      const d = new Date();
      const month = d.getMonth()
      const year = d.getFullYear()
      const date = d.getDate()
      const newDate = `${year}/${month}/${date}`
      try {
        console.log("it's ok");
          axios.post('http://localhost:3001/api/maps/', {...newMap, date: newDate,});
        } catch (error) {
          console.error(error);
        }

        setState(false)
        forceUpdate()
  }


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
                    value={newMap.name}
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
                  zoom
                </MDTypography>
                <MDBox mb={1} width="100%">
                  <MDInput
                    type="number"
                    fullWidth
                    name="zoom"
                    placeholder="zoom"
                    value={newMap.zoom}
                    onChange={changeHandler}
                    error={errors.emailError}
                  />
                  {errors.emailError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The zoom must be valid
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
                    centerLat
                  </MDTypography>
                  <MDBox mb={2} width="100%">
                    <MDInput
                      type="number"
                      fullWidth
                      name="centerLat"
                      placeholder="centerLat"
                      value={newMap.centerLat}
                      onChange={changeHandler}
                    />
                    {errors.newPassError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The centerLat must be valid
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
                    centerLng
                  </MDTypography>
                  <MDBox mb={1} width="100%">
                    <MDInput
                      type="number"
                      fullWidth
                      name="centerLng"
                      placeholder="centerLng"
                      value={newMap.centerLng}
                      onChange={changeHandler}
                    />
                    {errors.confirmPassError && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        The centerLng must be valid
                      </MDTypography>
                    )}
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox mt={4} display="flex" justifyContent="end">
                <StyledButton variant="gradient" color="info" type="submit">
                  Create Map
                </StyledButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Header>
      </DashboardLayout>
    </Box>

  );
};

export default CreateMap;
