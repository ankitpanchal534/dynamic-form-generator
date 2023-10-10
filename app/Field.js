"use client";
import React from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Delete, Remove } from "@mui/icons-material";

const Field = ({ field, onRemove, onChange, hideRemove }) => {
  const { label, type, options, required } = field;

  let inputElement;

  switch (type) {
    case "text":
      inputElement = (
        <TextField
          onChange={onChange}
          required={required}
          sx={{ width: "90%" }}
          label={label}
          name={label}
        />
      );
      break;
    case "number":
      inputElement = (
        <TextField
          onChange={onChange}
          required={required}
          sx={{ width: "90%" }}
          label={label}
          name={label}
          type="number"
        />
      );
      break;
    case "email":
      inputElement = (
        <TextField
          onChange={onChange}
          required={required}
          sx={{ width: "90%" }}
          label={label}
          name={label}
          type="email"
        />
      );
      break;
    case "textarea":
      inputElement = (
        <TextField
          onChange={onChange}
          required={required}
          sx={{ width: "90%" }}
          label={label}
          name={label}
          multiline
          minRows={3}
        />
      );
      break;
    case "dropdown":
      inputElement = (
        <FormControl sx={{ width: "90%" }}>
          <InputLabel>{label}</InputLabel>
          <Select onChange={onChange} name={label}>
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    case "checkbox":
      inputElement = (
        <label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" />
            <span>{label}</span>
          </div>
        </label>
      );
      break;
    case "radio":
      inputElement = (
        <FormControl component="fieldset">
          <Typography sx={{ textTransform: "capitalize" }}>{label}</Typography>
          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "10px",
              // flexDirection: "column",
            }}
          >
            {options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={option}
                  name={label}
                  onChange={onChange}
                />
                {option}
              </label>
            ))}
          </div>
        </FormControl>
      );
      break;
    default:
      inputElement = (
        <TextField
          onChange={onChange}
          required={required}
          sx={{ width: "90%" }}
          label={label}
          name={label}
        />
      );
  }

  return (
    <Grid
      container
      style={{ marginTop: "10px" }}
      alignItems={"start"}
      alignContent={"flex-start"}
    >
      <Grid item container xs={11} md={11} sm={10} lg={11}>
        {inputElement}
      </Grid>
      {hideRemove ? null : (
        <Grid item container xs={1} md={1} sm={2} lg={1}>
          <IconButton
            color="error"
            onClick={onRemove}
            title="Delete This Section"
          >
            <Delete />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default Field;
