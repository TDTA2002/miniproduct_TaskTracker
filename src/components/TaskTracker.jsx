import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddTask from './AddTask';

export default function SignIn() {
  const [tasks, setTasks] = useState([]);
  const [times, setTimes] = useState("");
  const [task, setTask] = useState("");
  const [showTextField, setShowTextField] = useState(true);
  const [reminder, setReminder] = useState(false);

  const handleAddTask = async (event) => {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      task: task,
      addDayDate: times,
      reminder: reminder,
    };

    try {
      const response = await axios.post("http://localhost:3000/tasks", newTask);
      setTasks([...tasks, response.data]);
      setTask("");
      setTimes("");
      setReminder(false);
    } catch (error) {
      console.log("loi", error);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/tasks")
      .then(response => setTasks(response.data));
  }, []);

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:3000/tasks/${taskId}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== taskId));
      });
  };

  const handleToggleTextField = () => {
    setShowTextField(!showTextField);
    setTask("");
    setTimes("");
    setReminder(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "230px" }}>
          <Typography component="h1" variant="h5">
            Task Tracker
          </Typography>
          <Button
            type="button"
            variant="contained"
            style={{ background: showTextField ? "red" : "green" }}
            onClick={handleToggleTextField}
          >
            {showTextField ? "Close" : "Add"}
          </Button>
        </div>

        {showTextField && (
          <Box component="form" onSubmit={handleAddTask} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Task"
              label="Task"
              name="Task"
              autoComplete="Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Day & Time"
              label="Day & Time"
              type="Day & Time"
              id="Day & Time"
              autoComplete="current-Day & Time"
              value={times}
              onChange={(e) => setTimes(e.target.value)}
            />
            <div style={{ display: "flex", gap: "200px", marginTop: "20px" }}>
              Set Reminder
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    style={{ marginTop: "-10px" }}
                    onChange={(e) => setReminder(e.target.checked)}
                  />
                }
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: "black" }}
              disabled={!task || !times}
            >
              Save Task
            </Button>
          </Box>
        )}

        <AddTask tasks={tasks} handleDeleteTask={handleDeleteTask} />
      </Box>
    </Container>
  );
}
