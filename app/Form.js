// This code is a React component that renders a form. It imports necessary
// dependencies from React and Material-UI. The form has fields that can be
// dynamically added and removed. The form values are stored in the component's
// state. The component also handles the submission of the form and saving the form
// data to local storage.
"use client";

//import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Snackbar, Typography } from "@mui/material";
import Field from "./Field";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Form = ({ formFields, setFormFields, hideCreate }) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({});
  let [allForms, setAllForms] = useState([]);
  let [showSnack, setShowSnack] = useState(false);

  const handleSnackbar = (status) => {
    setShowSnack(status);
  };
  const handleCreateForm = (e) => {
    e.preventDefault();

    if (allForms?.length > 0) {
      localStorage.setItem(
        "all_forms",
        JSON.stringify([...allForms, formFields])
      );
    } else {
      localStorage.setItem("all_forms", JSON.stringify([formFields]));
    }

    setFormValues({});
    setFormFields([]);
    alert("Form Created !");
    router.push("/view-form/" + ((allForms?.length || 0) + 1));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form values", formValues);
    handleSnackbar(true);
    // router.push('/successful-submission')
  };

  const removeField = (index, target_field) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
    delete formValues[target_field];
    setFormValues(formValues);
  };
  const handleChangeInput = (e) => {
    console.log("eee", e.target.value);
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    let saved_forms = JSON.parse(localStorage.getItem("all_forms")) || [];
    setAllForms(saved_forms);
    setShowSnack(false);
  }, []);
  return (
    <>
      <form
        onSubmit={hideCreate ? handleSubmit : handleCreateForm}
        style={{
          width: "100%",
          // display: showSnack ? "none" : "block",
        }}
      >
        <Card
          style={{
            width: "100%",
            padding: "10px",
            boxShadow: "0px 2px 6px lightgray",
          }}
        >
          <Typography variant="h4" gutterBottom>
            New Form
          </Typography>
        </Card>
        {formFields.map((field, index) => (
          <Card
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              boxShadow: "0px 2px 6px lightgray",
            }}
          >
            <Field
              key={index}
              field={field}
              onChange={handleChangeInput}
              hideRemove={hideCreate}
              onRemove={() => removeField(index, field.label)}
            />
          </Card>
        ))}
        <Card
          style={{
            width: "97%",
            padding: "20px",
            marginTop: "15px",
            boxShadow: "0px 2px 6px lightgray",
          }}
        >
          {hideCreate ? (
            <Button
              type="submit"
              variant="contained"
              disabled={formFields.length < 1}
              color="primary"
            >
              Submit
            </Button>
          ) : (
            <Button
              sx={{
                ml: 2,
              }}
              onClick={handleCreateForm}
              variant="contained"
              disabled={formFields.length < 1}
              color="primary"
            >
              Create Form
            </Button>
          )}
        </Card>
      </form>

      {/* <Snackbar
        open={showSnack}
        onClose={() => handleSnackbar(false)}
        autoHideDuration={6000}
      > */}
      {showSnack ? (
        <Alert variant="filled" severity="success" sx={{ marginTop: "10px" }}>
          Your Detail has been submitted Successfully !
          <br />
          <Link href={"/"} style={{ color: "white" }}>
            Back to Home
          </Link>
        </Alert>
      ) : null}
      {/* </Snackbar> */}
    </>
  );
};

export default Form;
