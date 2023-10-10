import { Grid, TextField, Typography } from "@mui/material";
import React, { use, useEffect, useState } from "react";

export default function FormFields({ selectedType, setNewField, newField }) {
  // set the initial value of optionsLength to 2
  const [optionsLength, setOptionsLength] = useState(2);

  // handle the input of the new field
  const handleInput = (e) => {
    // set the new field with the new value
    setNewField((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handle the change of the options
  const handleChangeOption = (e, id) => {
    // set the options to the new value
    let options = newField.options;
    options[id] = e.target.value;
    // set the new field with the new options
    setNewField((prev) => ({
      ...prev,
      options: options,
    }));
  };

  return (
    <>
      <Grid container>
        <Grid item container>
          <TextField
            type={"text"}
            name="label"
            fullWidth
            required
            value={newField.label}
            placeholder="Enter Input Field Name"
            label={newField.label || ""}
            onChange={handleInput}
          />
        </Grid>
        {selectedType != "radio" && selectedType != "dropdown" ? null : (
          <>
            <Grid item container pt={2} pb={2}>
              <Typography>How many options: </Typography>

              <select
                value={optionsLength}
                onChange={(e) => {
                  // set the optionsLength to the new value
                  setOptionsLength(e.target.value);
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Grid>

            <Grid item xs={12} lg={6} md={6} sm={12} container gap={2}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                .slice(0, optionsLength)
                ?.map((op, index) => (
                  <TextField
                    type={"text"}
                    key={index}
                    name={"option"}
                    required
                    //   value={newField.options[index + 1]}
                    placeholder={`Enter option ${index + 1}`}
                    //   label={newField.label || ""}
                    onChange={(e) => handleChangeOption(e, index)}
                  />
                ))}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
