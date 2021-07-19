import React, { useState, useEffect } from "react";

const Snackbar = ({ message, color, time }) => {
  const [messageToDisplay, setMessageToDisplay] = useState(message);
  const [up, setUp] = useState("Nothing");
  let timer1;
  let timer2;
  useEffect(() => {
    setMessageToDisplay(message);
    setUp("");
    clearTimeout(timer1);
    clearTimeout(timer2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  timer2 = setTimeout(() => {
    setUp(null);
  }, time);

  timer1 = setTimeout(() => {
    setMessageToDisplay(null);
  }, 450 + time);

  if (up === null) {
    return <div className={`snackbar going-down`}>{messageToDisplay}</div>;
  } else {
    return <div className={`snackbar going-up`}>{messageToDisplay}</div>;
  }
};

export default Snackbar;
