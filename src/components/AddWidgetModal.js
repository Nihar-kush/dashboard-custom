import React, { useEffect, useState } from "react";
import { Modal, Box, IconButton, Tabs, Tab, InputBase } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";
import { BtnPrimary, BtnSecondary } from "../MuiCustomComponents";
import { Delete, Search } from "@mui/icons-material";

export default function AddWidgetModal({
  open,
  onClose,
  categories,
  setCategories,
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [localCategories, setLocalCategories] = useState([]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSearchQuery("");
  };

  const handleCheckboxChange = (widgetId) => {
    const dummyCategories = [...localCategories];
    dummyCategories[selectedTab].widgets = localCategories[
      selectedTab
    ].widgets.map((widget) =>
      widget.id === widgetId ? { ...widget, inUse: !widget.inUse } : widget
    );
    setLocalCategories(dummyCategories);
  };

  const handleAddWidget = () => {
    const localCategory = localCategories[selectedTab];
    if (widgetName && widgetText) {
      const updatedCategories = localCategories.map((category) => {
        if (category.id === localCategory.id) {
          return {
            ...category,
            widgets: [
              ...category.widgets,
              {
                id: uuidv4(),
                name: widgetName,
                text: widgetText,
                inUse: true,
              },
            ],
          };
        }
        return category;
      });

      setLocalCategories(updatedCategories);
      setWidgetName("");
      setWidgetText("");
    }
  };

  const removeWidgetHandler = (categoryId, widgetId) => {
    const updatedCategories = localCategories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter((widget) => widget.id !== widgetId),
        };
      }
      return category;
    });

    setLocalCategories(updatedCategories);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const onCancel = () => {
    setLocalCategories([]);
    setSearchQuery("");
    onClose();
  };

  const onConfirm = () => {
    setCategories(localCategories);
    localStorage.setItem("categories", JSON.stringify(localCategories));
    setSearchQuery("");
    onClose();
  };

  // Filter widgets based on search query or show all if no query
  const filteredWidgets = searchQuery
    ? localCategories[selectedTab]?.widgets.filter((widget) =>
        widget.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : localCategories[selectedTab]?.widgets;

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-widget-modal">
      <Box className="absolute top-0 right-0 h-full w-1/3 bg-white shadow-xl">
        <Box className="bg-customBlue text-white flex justify-between items-center px-2">
          <span className="ml-2">Add Widget</span>
          <IconButton onClick={onClose}>
            <CloseIcon className="text-white" />
          </IconButton>
        </Box>
        <div className="p-4 w-full">
          <p className="text-sm text-gray-600">
            Please click "Confirm" to save changes and update the dashboard with
            the selected widgets.
          </p>
        </div>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "darkblue",
            },
            "& .MuiTab-root": {
              color: "darkblue",
            },
            "& .Mui-selected": {
              color: "darkblue !important",
            },
          }}
        >
          {categories.map((category, index) => (
            <Tab label={category.name.slice(0, 5)} key={`tab-${index}`} />
          ))}
        </Tabs>
        <Box className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" for="wname">
              Widget Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              id="wname"
              type="text"
              placeholder="WidgetName"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" for="wtext">
              Widget Text
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none"
              id="wtext"
              type="text"
              placeholder="WidgetText"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
            />
          </div>
          <BtnPrimary fullWidth variant="contained" onClick={handleAddWidget}>
            Add Widget
          </BtnPrimary>
        </Box>
        <Box className="mt-2 p-4 h-[250px] ">
          <div className="flex items-center px-2 ring-1 ring-slate-200 rounded bg-[#F0F5FA] text-sm">
            <Search fontSize="small" className="mr-2 text-slate-400" />
            <InputBase
              sx={{
                flex: 1,
                "& input::placeholder": {
                  fontSize: "0.75rem",
                },
              }}
              placeholder="Search widgets..."
              inputProps={{ "aria-label": "search widgets" }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="overflow-y-scroll mt-4 h-[80%]">
            {filteredWidgets?.map((widget) => (
              <div
                className="flex items-center justify-between mb-4 p-2 shadow rounded"
                key={`widget-${widget.id}`}
              >
                <span className="flex items-center w-[90%] truncate">
                  <input
                    id="check"
                    type="checkbox"
                    checked={widget.inUse ? true : false}
                    onChange={() => handleCheckboxChange(widget.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label
                    for="check"
                    className="ms-2 w-[80%] text-sm font-medium truncate"
                  >
                    {widget.name}
                  </label>
                </span>
                <Delete
                  className="cursor-pointer hover:animate-pulse"
                  onClick={() =>
                    removeWidgetHandler(
                      localCategories[selectedTab].id,
                      widget.id
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Box>
        <Box className="flex justify-end p-4 absolute bottom-0 right-0">
          <BtnSecondary variant="outlined" onClick={onCancel} sx={{ mr: 2 }}>
            Cancel
          </BtnSecondary>
          <BtnPrimary variant="contained" onClick={onConfirm}>
            Confirm
          </BtnPrimary>
        </Box>
      </Box>
    </Modal>
  );
}
