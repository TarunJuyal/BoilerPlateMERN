import React from "react";
import { withRouter } from "react-router-dom";
import { FaCode } from "react-icons/fa";

function LandingPage() {
  return (
    <>
      <div className="app">
        <FaCode style={{ fontSize: "4rem" }} />
      </div>
    </>
  );
}

export default withRouter(LandingPage);
