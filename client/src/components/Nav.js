// All conditional rendering for the drawer sidebar in Body
import React from "react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";

function Nav({ currentPage, handlePageChange }) {
  return (
    <div className="navbar">
      <div className="links">
        <a
          href="#conversations"
          onClick={() => handlePageChange("Conversations")}
          className={currentPage === "Conversations" ? "navbar a" : "navbar"}
        >
          <Conversations />
        </a>

        <a
          href="#contacts"
          onClick={() => handlePageChange("Contacts")}
          className={currentPage === "Contacts" ? "navbar a" : "navbar"}
        >
          <Contacts />
        </a>
      </div>
    </div>
  );
}

export default Nav;
