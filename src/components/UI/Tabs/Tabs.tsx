import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const LabTabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList style={{ overflow: "scroll" }} onChange={handleChange}>
            <Tab label="Характеристики" value="1" />
            <Tab label="Отзывы" value="2" />
            <Tab label="Доставка" value="3" />
            <Tab label="Наши магазины" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">Характеристики</TabPanel>
        <TabPanel value="2">Отзывы</TabPanel>
        <TabPanel value="3">Доставка</TabPanel>
        <TabPanel value="4">Наши магазины</TabPanel>
      </TabContext>
    </Box>
  );
};

export default LabTabs;
