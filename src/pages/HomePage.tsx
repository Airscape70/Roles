import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Container } from "@mui/material";
import Users from "../components/Users";
import Roles from "../components/Roles";

export default function HomePage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Пользователи" value="1" />
            <Tab label="Доступные роли" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><Users /></TabPanel>
        <TabPanel value="2"><Roles/></TabPanel>
      </TabContext>
    </Container>
  );
}
