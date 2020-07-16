import React, { useContext, useState } from "react";
import {
  makeStyles,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../contexts";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    height: "calc(100vh - 48px)"
  },
  paper: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(3)
  },
  contentHeader: {
    marginBottom: theme.spacing(3)
  },
  form: {
    maxWidth: "700px"
  }
}));

const getDateAndTime = () => {
  const today = new Date();
  const date = today.toLocaleDateString().split("/");
  const time = today.toLocaleTimeString().split(/[ :]/);
  let output = `${date[2]}-${Number(date[0]) < 10 ? `0${date[0]}` : date[0]}-${
    Number(date[1]) < 10 ? `0${date[1]}` : date[1]
  }T`;
  if (time[3] === "PM" && Number(time[0]) < 12) {
    time[0] = (Number(time[0]) + 12).toString();
  }
  output += `${Number(time[0]) < 10 ? `0${time[0]}` : time[0]}:${time[1]}`;

  return output;
};

const initialData = {
  title: "",
  startDate: getDateAndTime(),
  endDate: getDateAndTime(),
  description: ""
};

export default function NewEvent() {
  const classes = useStyles();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useContext(UserContext);
  const [data, setData] = useState(initialData);

  const createEvent = async () => {
    console.log("Create event triggered");
    const accessToken = await getAccessTokenSilently();

    const resp = await fetch("/tournament/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ formData: data, user })
    });

    console.log("Form response:", resp);

    const respData = await resp.json();

    if (resp.status >= 200 && resp.status <= 299) {
      console.log("Event created successfully");
      history.push("/");
    } else {
      console.log("Event creation failed:", respData.message);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    createEvent();
  };

  const handleReset = () => {
    setData(initialData);
  };

  const handleChange = event => {
    setData({ ...data, [event.target.id]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Paper variant="outlined" className={classes.paper}>
          <Typography variant="h4" className={classes.contentHeader}>
            New Event
          </Typography>
          <Typography variant="body1">
            You can create a new tournament here. Please input the following
            fields.
          </Typography>
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className={classes.form}
          >
            <Grid container justify="flex-start" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  label="Event Name"
                  value={data.title}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="startDate"
                  label="Event Start Date"
                  type="datetime-local"
                  value={data.startDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="endDate"
                  label="Event End Date"
                  type="datetime-local"
                  value={data.endDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label="Description"
                  value={data.description}
                  onChange={handleChange}
                  multiline
                  fullWidth
                  rowsMax={6}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 8 }}
                >
                  Submit
                </Button>
                <Button onClick={handleReset} color="secondary">
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
