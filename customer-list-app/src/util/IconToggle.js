import React from "react";
import { IconButton, Switch, Box } from "@mui/material";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import NightlightIcon from "@mui/icons-material/Nightlight";

const IconToggle = ({ checked, onChange, ...props }) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton {...props}>
        {checked ? <NightlightIcon /> : <BrightnessMediumIcon />}
      </IconButton>
      <Switch checked={checked} onChange={onChange} />
    </Box>
  );
};

export default IconToggle;
