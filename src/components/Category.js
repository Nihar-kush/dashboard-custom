import React from "react";
import { Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BtnGrey } from "../MuiCustomComponents";
import { Add } from "@mui/icons-material";

export default function Category({
  category,
  removeWidget,
  openAddWidgetModal,
}) {
  return (
    <div className="my-4 w-full p-1">
      <div className="font-semibold mb-2">{category.name}</div>
      <div className="flex flex-wrap gap-6">
        {category.widgets
          .filter((widget) => widget.inUse === true)
          .map((widget) => (
            <Card key={widget.id} className="w-[465px] h-[250px]">
              <CardContent className="flex flex-col h-full">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm w-[80%] truncate">
                    {widget.name}
                  </span>
                  <IconButton
                    onClick={() => removeWidget(category.id, widget.id)}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <div className="flex h-full p-2">
                  <span className="w-[90%] truncate">{widget.text}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        <Card className="w-[465px] h-[250px] flex items-center justify-center">
          <CardContent>
            <BtnGrey variant="outlined" onClick={openAddWidgetModal} fullWidth>
              <Add className="mr-2" />
              Add Widget
            </BtnGrey>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
