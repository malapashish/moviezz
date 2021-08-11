import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const PaginationComponent = ({
  handlePaginationChange,
  numOfPages = 50,
  boundaryCount = 2,
}) => {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <div className="pagination-div">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          page={parseInt(sessionStorage.getItem("pagination")) || 1}
          defaultPage={parseInt(sessionStorage.getItem("pagination")) || 1}
          color="primary"
          onChange={handlePaginationChange}
          boundaryCount={boundaryCount}
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
};

export default PaginationComponent;
