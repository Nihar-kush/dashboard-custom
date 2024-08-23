import React from "react";
import { BtnGrey } from "../MuiCustomComponents";
import { Add } from "@mui/icons-material";

export default function CtaBar({ openAddWidgetModal }) {
  return (
    <div className="flex items-center justify-between px-10 mt-6">
      <span className="font-semibold">CNAPP Dashboard</span>
      <span>
        <BtnGrey variant="outlined" onClick={openAddWidgetModal} fullWidth>
          <Add className="mr-2" />
          Add Widget
        </BtnGrey>
      </span>
    </div>
  );
}
