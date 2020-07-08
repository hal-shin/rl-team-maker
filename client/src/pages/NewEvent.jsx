import React, { useState } from "react";
import {
  makeStyles,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button
} from "@material-ui/core";

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
  const time = today.toLocaleTimeString();
  let output = "";

  output += date[2];
  output += "-";
  Number(date[0]) < 10 ? (output += `0${date[0]}`) : (output += date[0]);
  output += "-";
  Number(date[1]) < 10 ? (output += `0${date[1]}`) : (output += date[1]);
  output += "T";
  if (time.includes("P")) {
    Number(time.slice(0, 2)) < 12
      ? (output += Number(time.slice(0, 2)) + 12)
      : (output += time.slice(0, 2));
  } else {
    output += time.slice(0, 2);
  }
  output += ":";
  output += time.slice(3, 5);

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
  const [data, setData] = useState(initialData);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(data);
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
