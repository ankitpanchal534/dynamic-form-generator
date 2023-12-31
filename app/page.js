// This code is a React component that represents the home page of a form builder
// application. It allows users to add new form fields and view all forms.
"use client";
import styles from "./page.module.css";
import Form from "./Form";
import {
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Add, PlusOne } from "@mui/icons-material";
import FormFields from "./FormFields";
import classes from "./page.module.css";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Home() {
  // Declare a state variable to store the form fields
  const [formFields, setFormFields] = useState([]);
  const [formFields1, setFormFields1] = useState([]);
  // Declare a state variable to store the selected field type
  const [selectedType, setSelectedType] = useState("text");

  // Declare an array of field types
  let fieldTypes = [
    "text",
    "number",
    "email",
    "dropdown",
    "textarea",
    "checkbox",
    "radio",
  ];

  // Declare a state variable to store the new field
  const [newField, setNewField] = useState({
    label: "",
    type: "text",
    options: [],
    required: false,
  });

  // Create a function to add a new field
  const addField = (e) => {
    e.preventDefault();
    // Add the new field to the form fields state
    setFormFields([...formFields, newField]);
    // Reset the new field state
    setNewField({
      label: "",
      type: "text",
      options: [],
      required: false,
    });
    // Reset the selected field type state
    setSelectedType("text");
  };
  const validateJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  const onJsonChange = (e) => {
    let str = e.target.value.toString();
    setFormFields1(str);
  };
  const handleValidateJson = (e) => {
    if (validateJson(formFields1)) {
      setFormFields(JSON.parse(formFields1));
    } else {
      alert("invalid json");
    }
  };
  useEffect(() => {
    setFormFields1(formFields);
  }, [formFields]);

  return (
    <Grid container justifyContent={"center"}>
      <Container maxWidth="lg" style={{ margin: 0, padding: 0 }}>
        <Grid container alignItems={"flex-start"} gap={1}>
          <Grid item container justifyContent={"center"}>
            <Typography variant="h5" color={"Highlight"}>
              Dynamic Form Builder
            </Typography>
          </Grid>
          <Grid item container xs={12} lg={4} md={4} sm={12} p={2}>
            <Typography variant="h6">Add New Field</Typography>
            <form
              className={classes.card_css}
              onSubmit={addField}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Grid container gap={2} mt={2}>
                <Typography>Field Type</Typography>
                <Grid item container>
                  <Select
                    value={selectedType}
                    fullWidth
                    onChange={(e) => {
                      setSelectedType(e.target.value);
                      setNewField((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }));
                    }}
                  >
                    {fieldTypes.map((it) => (
                      <MenuItem key={it} value={it}>
                        {it}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item container>
                  <FormFields
                    selectedType={selectedType}
                    setNewField={setNewField}
                    newField={newField}
                  />
                </Grid>
                <Grid item container>
                  <label htmlFor="isRequired">
                    <input
                      id="isRequired"
                      type="checkbox"
                      checked={newField.required || false}
                      onChange={(e) =>
                        setNewField((prev) => ({
                          ...prev,
                          required: e.target.checked,
                        }))
                      }
                    />
                    required
                  </label>
                </Grid>

                <Grid item container justifyContent={"center"}>
                  <IconButton
                    type="submit"
                    sx={{
                      border: "1px solid lightgray",
                      background: "#ffde82",
                      color: "black",
                    }}
                  >
                    <Add fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            </form>

            <Grid item container mt={2}>
              <Link href={"/all-forms"}>
                <Button
                  variant="contained"
                  style={{ textTransform: "capitalize" }}
                  size="small"
                  color="success"
                >
                  View All Forms
                </Button>
              </Link>
            </Grid>
            <Grid item container>
              <div style={{ width: "100%", padding: "5px" }}>
                <span>JSON output</span>
                <div
                  style={{
                    width: `calc(100%-10px)`,
                    background: "white",
                    minHeight: "100px",
                    padding: "10px",
                    borderRadius: "12px",
                  }}
                >
                  <pre>
                    <code>{JSON.stringify(formFields, null, "  ")}</code>
                  </pre>
                </div>

                <Button
                  sx={{ marginTop: "10px" }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(formFields, null, "  ")
                    );
                    Swal.fire({
                      text: "Copied to clipboard",
                      icon: "success",
                    });
                  }}
                  variant="contained"
                  size="small"
                  color="secondary"
                >
                  Copy JSON Output
                </Button>
              </div>
              <div style={{ width: "100%", padding: "5px", marginTop: "10px" }}>
                <span>Import JSON</span>
                <textarea
                  style={{ width: "100%", height: "100%" }}
                  rows={10}
                  onChange={onJsonChange}
                />
                <Button
                  onClick={handleValidateJson}
                  variant="contained"
                  size="small"
                  color="secondary"
                >
                  Validate JSON
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            lg={7}
            md={7}
            sm={12}
            p={2}
            position={"sticky"}
            top={0}
            left={10}
          >
            <Form formFields={formFields} setFormFields={setFormFields} />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
