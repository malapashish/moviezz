import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const Paginatio = ({ setPage, numOfPages = 20 }) => {
  const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
    sessionStorage.setItem("pagination", page);
    console.log("From pagination component", page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      <ThemeProvider theme={darkTheme}>
         <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}  
          color="primary"
          hideNextButton
          hidePrevButton
        /> 
      </ThemeProvider>
    </div>
  );
};

export default Paginatio;
