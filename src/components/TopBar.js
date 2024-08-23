import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/material";
import React from "react";

export default function TopBar() {
  return (
    <div className="bg-white shadow px-8 py-3 flex items-center">
      <span>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            color="inherit"
            href="#"
            sx={{ fontSize: "14px" }}
          >
            Home
          </Link>
          <Link
            underline="hover"
            sx={{ color: "#191996", fontSize: "14px" }}
            href="#"
          >
            Dashboard
          </Link>
        </Breadcrumbs>
      </span>
    </div>
  );
}
