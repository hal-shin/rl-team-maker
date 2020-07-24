import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import DefaultContainer from "./DefaultContainer";
import { useStyles } from "./OverviewStyles";

export default function Overview({ match: { params } }) {
  const classes = useStyles();
  const { tournamentId } = params;
  const {
    event: { _id, title, image, description }
  } = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tournamentId === _id) {
      setIsLoading(false);
    }
  }, [tournamentId, _id]);

  const renderContents = () => {
    if (isLoading) {
      return <Typography variant="body1">Loading...</Typography>;
    } else {
      return (
        <>
          <div className={classes.header}>
            <Typography variant="h4" className={classes.contentHeader}>
              {title}
            </Typography>
            {/*<Button variant="contained" color="primary">*/}
            {/*  Register*/}
            {/*</Button>*/}
          </div>
          <div>
            <img src={image} alt="" className={classes.coverImage} />
          </div>
          <div>
            <Typography variant="h5">Description</Typography>
            <Typography variant="body1">{description}</Typography>
          </div>
        </>
      );
    }
  };

  return <DefaultContainer>{renderContents()}</DefaultContainer>;
}
