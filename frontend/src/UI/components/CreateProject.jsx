import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function CreateProjectPage({
  onClose,
  token,
  OnAddProject,
}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [capital, setCapital] = useState("");
  const [maxInvestPercent, setMaxInvestPercent] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const newProject = {
        title,
        description,
        capital: Number(capital),
        maxInvestPercent: Number(maxInvestPercent),
      };

      const response = await axios.post(
        "http://localhost:8080/api/projects",
        newProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      OnAddProject(response.data.project);

      onClose();

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        background: "#111522",
        color: "white",
        border: "1px solid #252b3a",
      }}
    >

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Create Project
      </Typography>

      <Typography
        sx={{
          color: "#b8b8c8",
          mb: 3,
        }}
      >
        Fill in the details of your project.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
      >

        <TextField
          fullWidth
          label="Title"
          sx={inputStyle}
          margin="normal"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <TextField
          fullWidth
          multiline
          rows={5}
          label="Description"
          sx={inputStyle}
          margin="normal"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <TextField
          fullWidth
          label="Target Capital (MAD)"
          sx={inputStyle}
          margin="normal"
          value={capital}
          onChange={(e) =>
            setCapital(e.target.value)
          }
        />

        <TextField
          fullWidth
          label="Max Percentage per Investor (%)"
          sx={inputStyle}
          margin="normal"
          value={maxInvestPercent}
          onChange={(e) =>
            setMaxInvestPercent(e.target.value)
          }
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
          }}
        >

          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#1b2030",
              py: 1.5,
              "&:hover": {
                bgcolor: "#252b3a",
              },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#7b2ff7",
              py: 1.5,
              "&:hover": {
                bgcolor: "#6a22e8",
              },
            }}
          >
            Save Project
          </Button>

        </Box>

      </Box>

    </Paper>
  );
}

const inputStyle = {
  "& .MuiInputBase-root": {
    color: "white",
    backgroundColor: "#111522",
    borderRadius: 2,
  },

  "& .MuiInputLabel-root": {
    color: "white",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2b3142",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#7b2ff7",
  },

  "& .Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#7b2ff7",
    },
};

export default CreateProjectPage;