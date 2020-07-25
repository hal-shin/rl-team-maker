import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import {
  makeStyles,
  Typography,
  Grid,
  TextField,
  Button
} from "@material-ui/core";

import { DialogContext } from "../contexts";
import { DefaultContainer, DraftEditor } from "../components";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
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
  endDate: getDateAndTime()
};

export default function NewEvent() {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { user } = useSelector(state => state);
  const { openMultiSnackbar } = useContext(DialogContext);
  const [data, setData] = useState(initialData);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const createEvent = async () => {
    try {
      const sendData = { ...data };
      sendData.description = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );

      const accessToken = await getAccessTokenSilently();

      const resp = await fetch("/tournament/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ formData: sendData, user })
      });

      const respData = await resp.json();

      if (resp.status >= 200 && resp.status <= 299) {
        openMultiSnackbar("Event created successfully!", "success");
        history.push("/");
      } else {
        openMultiSnackbar("Event creation failed.", "error");
        console.log("Event creation failed:", respData.message);
      }
    } catch (err) {
      console.log("Event creation failed:", err);
    }
  };

  const handleSubmit = () => {
    createEvent();
  };

  const handleReset = () => {
    setData(initialData);
  };

  const handleChange = event => {
    setData({ ...data, [event.target.id]: event.target.value });
  };

  return !isAuthenticated ? (
    <div>You must be logged in to see this page.</div>
  ) : (
    <DefaultContainer header="New Event" width="small">
      <div className={classes.centered}>
        <div className={classes.form}>
          <Typography variant="body1">
            You can create a new tournament here. Please input the following
            fields.
          </Typography>
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
              <Typography variant="h5" gutterBottom>
                Description
              </Typography>
              <DraftEditor
                editorState={editorState}
                setEditorState={setEditorState}
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
        </div>
      </div>
    </DefaultContainer>
  );
}
