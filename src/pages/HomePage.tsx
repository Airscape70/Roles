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
  const [value, setValue] = React.useState<string>(() => {
    return localStorage.getItem("tabValue") || "Пользователи";
  });

  React.useEffect(() => {
    localStorage.setItem("tabValue", value);
  }, [value]); 

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Пользователи" value="Пользователи" />
            <Tab label="Доступные роли" value="Роли" />
          </TabList>
        </Box>
        <TabPanel value="Пользователи"><Users /></TabPanel>
        <TabPanel value="Роли"><Roles/></TabPanel>
      </TabContext>
    </Container>
  );
}
