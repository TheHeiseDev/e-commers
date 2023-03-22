import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

interface ISwitchLabels {
  onChecked: boolean | undefined;
  onChange: () => void;
}
export default function SwitchLabels({ onChecked, onChange }: ISwitchLabels) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={onChecked} onClick={onChange} />}
        label={onChecked ? "Да": "Нет"}
      />
    </FormGroup>
  );
}
