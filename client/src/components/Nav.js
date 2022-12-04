// All conditional rendering for the drawer sidebar in Body
import React from "react";

// Navigation will be the navbar that appears on each page

function Nav({ currentPage, handlePageChange }) {

  return (
    <div className="navbar">
      <div className="links">
        <a
          href="#conversations"
          onClick={() => handlePageChange("Conversations")}
          // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === "Conversations" ? "navbar a" : "navbar"}
        >
          
        </a>

        <a
          href="#contacts"
          onClick={() => handlePageChange("Contacts")}
          // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === "Contacts" ? "navbar a" : "navbar"}
        >
          
        </a>

      </div>
    </div>
  );
}

export default Nav;