import React from "react";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Button } from "@material-ui/core";

const YouTubeButton = ({ video_id, text, linkAvailability }) => {
  if (linkAvailability) {
    return (
      <Button
        variant="contained"
        startIcon={<YouTubeIcon />}
        color="secondary"
        target="__blank"
        href={`https://www.youtube.com/watch?v=${video_id}`}
      >
        {text}
      </Button>
    );
  } else {
    return "";
  }
};

export default YouTubeButton;
