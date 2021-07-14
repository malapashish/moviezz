import React from "react";

export const Spinner = ({ display }) => {
  return (
    <>
      {display ? (
        // <div className = 'spinner-parent'>
        <div className="loading loading--full-height"></div>
      ) : (
        // </div>
        ""
      )}
    </>
  );
};
